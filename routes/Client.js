const express = require("express");
const router = express.Router();
var ClientController = require("../controller/ClientController");
var ClientController = require("../controller/ClientController");
const optimizelyClientInstance = require('../optimizely.js');

router.get("/get",ClientController.getClients);
router.post("/add",ClientController.addClient);
router.put("/update/:id", ClientController.updateClient);
router.delete("/remove/:id", ClientController.removeClient);
router.get("/search/:id", ClientController.getClientById);
router.get("/getId/:name", ClientController.getIdByName);





/* GET home page. */
router.get('/', function(req, res, next) {
  


    try {
      var enabled = optimizelyClientInstance.isFeatureEnabled('test', 'user123',{ vip: req.query.isVip === 'true'});
      const title = enabled
        ? 'Feature flag is on!'
        : 'Feature flag is off!'
          return res.status(200).json({
        status: 200,
        data: title,
        message: "Succesfully Feature flag",
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        message: e.message,
      });
    }


});



module.exports = router;
