const Grant = require("../models/Grant");
const csv = require("fast-csv");

exports.listAllGrants = (req, res) => {
  Grant.find((err, grant) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).json(grant);
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
              reject(err)
            }
            resolve("ok")
          });
        });
      })
      .on("end", () => {
        return res
          .status(200)
          .json({ message: "Grant CSV successfully upload" });
      });
  });
