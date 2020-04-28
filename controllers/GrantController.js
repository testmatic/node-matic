const Grant = require("../models/Grant");
const csv = require("fast-csv");
var firstReg = true;

exports.listAllGrants = (req, res) => {
  Grant.find((err, grant) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).json(grant);
  });
};

exports.listGrantsPagination = (req, res) => {
  var pageNo = parseInt(req.query.pageNo);
  var size = parseInt(req.query.size);
  var query = {};
  if (pageNo < 0 || pageNo === 0) {
    response = {
      error: true,
      message: "invalid page number, should start with 1",
    };
    return res.json(response);
  }
  query.skip = size * (pageNo - 1);
  query.limit = size;
  /*query.sort = {
    POSTED_DATE: -1, //Orden de creación descendente
  };*/
  // Find some documents
  Grant.countDocuments({}, function (err, totalCount) {
    if (err) {
      response = { error: true, message: "Error fetching data" };
    }
    Grant.find({}, {}, query, function (err, data) {
      // Mongo command to fetch all data from collection.
      if (err) {
        response = { error: true, message: "Error fetching data" };
      } else {
        var totalPages = Math.ceil(totalCount / size);
        response = { error: false, message: data, pages: totalPages };
      }
      res.json(response);
    });
  });
};

exports.createNewGrant = (req, res) => {
  let newGrant = new Grant(req.body);
  newGrant.save((err, grant) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(201).json(grant);
  });
};

exports.readGrant = (req, res) => {
  Grant.findById(req.params.grantid, (err, grant) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).json(grant);
  });
};

exports.updateGrant = (req, res) => {
  Grant.findOneAndUpdate(
    { _id: req.params.grantid },
    req.body,
    { new: true },
    (err, grant) => {
      if (err) {
        return res.status(500).send(grant);
      }
      return res.status(200).json(grant);
    }
  );
};

exports.deleteGrant = (req, body) => {
  Grant.remove({ _id: req.params.grantid }, (err, grant) => {
    if (err) {
      return res.status(404).send(err);
    }
    return res.status(200).json({ message: "Grant successfully deleted" });
  });
};

exports.uploadUpdatedDataGrant =
  ((err, req, res, next) => {
    if (err) {
      console.error(err);
      return res.json({ success: false, error: err });
    }
    next();
  },
  (req, res, next) => {
    Grant.collection
      .drop()
      .then((ok) => {
        if (ok) {
          cvsDecode(req, res);
        } else {
          console.log("no drop");
        }
      })
      .catch((err) => {
        console.log("err: " + err);
        cvsDecode(req, res);
      });
  });

function cvsDecode(req, res) {
  csv
    .parseFile(req.file.path)
    .on("data", (data) => {
      return new Promise(async (resolve, reject) => {
        //save in db
        let obj = {
          OPPORTUNITY_NUMBER: data[0],
          OPPORTUNITY_TITLE: data[1],
          AGENCY_CODE: data[2],
          AGENCY_NAME: data[3],
          ESTIMATED_FUNDING: data[4],
          EXPECTED_NUMBER_OF_AWARDS: data[5],
          GRANTOR_CONTACT: data[6],
          AGENCY_CONTACT_PHONE: data[7],
          AGENCY_CONTACT_EMAIL: data[8],
          ESTIMATED_POST_DATE: data[9],
          ESTIMATED_APPLICATION_DUE_DATE: data[10],
          POSTED_DATE: data[11],
          CLOSE_DATE: data[12],
          LAST_UPDATED_DATE_TIME: data[13],
          VERSION: data[14],
        };
        let newGrant = new Grant(obj);
        await newGrant.save((err, grant) => {
          if (err) {
            reject(err);
          }
          resolve("ok");
        });
      });
    })
    .on("end", () => {
      return res.status(200).json({ message: "Grant CSV successfully upload" });
    })
    .on("error", (err) => {
      return res.status(500).json({ message: err });
    });
}
