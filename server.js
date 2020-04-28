const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const grantController = require("./controllers/GrantController");
const multer = require("multer");
const upload = multer({ dest: "tmp/" });
const API_PORT = 8080;
const app = express();

// db instance connection
require("./config/db");

app.use(cors());
const router = express.Router();

// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API ENDPOINTS

router.get('/',(req, res) => { res.status(200).send("API")});
router.get('/grants', grantController.listAllGrants)
router.post('/grants', grantController.createNewGrant);
router.get('/grants/:grantid', grantController.readGrant)
router.put('/grants/:grantid', grantController.updateGrant)
router.delete('/grants/:grantid', grantController.deleteGrant);
router.post('/uploadGrants', upload.single("file"), grantController.uploadUpdatedDataGrant);

// append /api for our http requests
app.use('/api', router);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
