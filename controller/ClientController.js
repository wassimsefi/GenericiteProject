var ClientService = require("../services/ClientService");

exports.getClients = async function (req, res, next) {
    // Validate request parameters, queries using express-validator
    var page = req.params.page ? req.params.page : 1;
    var limit = req.params.limit ? req.params.limit : 10;
    try {
      var data = await ClientService.getClients({}, page, limit);
      return res.status(200).json({
        status: 200,
        data: data,
        message: "Succesfully Clients Retrieved",
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        message: e.message,
      });
    }
  };
  

  
  exports.addClient = async function (req, res, next) {
    try {

      var content = await ClientService.addClient(req.body);
      return res.status(200).json({
        status: 200,
        data: content,
        message: "Client added succesfully",
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        message: e.message,
      });
    }
  };
  
  exports.updateClient = async function (req, res, next) {
    try {
      var content = await ClientService.updateClient(req.params.id, req.body);
      return await res.status(200).json({
        status: 200,
        data: content,
        message: "Succesfully updated",
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        message: e.message,
      });
    }
  };
  
  exports.removeClient = async function (req, res, next) {
    try {
      var content = await ClientService.removeClient(req.params.id);
      return res.status(200).json({
        status: 200,
        data: content,
        message: "Succesfully deleted",
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        message: e.message,
      });
    }
  };
  
  exports.getClientById = async function (req, res, next) {
    try {
      var content = await ClientService.getClientById(req.params.id);
      return res.status(200).json({
        status: 200,
        data: content,
        message: "Succesfully found Client",
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        message: e.message,
      });
    }
  };
  
  exports.getIdByName = async function (req, res, next) {
    try {
      var content = await ClientService.getIdByName(req.params.name);
      return res.status(200).json({
        status: 200,
        data: content[0]._id,
        message: "Succesfully found Client",
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        message: e.message,
      });
    }
  };