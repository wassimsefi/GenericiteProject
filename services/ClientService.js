var Client = require("../models/Client");
var nodemailer = require('nodemailer');
const QRCode = require('qrcode');
const bcrypt = require("bcrypt");





exports.getClients = async function (query, page, limit) {
    try {
      var Clients = await Client.find(query);
      return Clients;
    } catch (e) {
      throw Error("Error while fetching Clients");
    }
  };

  exports.getClientById = async function (id) {
    try {
      var content = await Client.findById(id);
      return content;
    } catch (e) {
      throw Error("Error while finding Client");
    }
  };
  exports.getIdByName = async function (nom) {
    try {
      var content = await Client.find({nom : nom});
      return content;
    } catch (e) {
      throw Error("Error while finding Client");
    }
  };

const generateQR = async text => {
	try {
		await QRCode.toFile('./yahoo-qr-code.png', text);
	} catch(err){
		console.log(err);
	}
}
  
exports.addClient = async function (document) {

    try {
      
     const salt = await bcrypt.genSalt(10);
      document.url = await bcrypt.hash(document.url, salt); 


    /*  var salt = crypto.randomBytes(128).toString('base64');
      var iterations = 10000;
       document.url = pbkdf2(document.url, salt, iterations);*/

      const { nom, codeActivation, url,email } = document;
        var content = await Client.create(document);
  

        var transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          service:'gmail',
          port: 587,
          secure: false,
          requireTLS: true,
            auth: {
              user: process.env.email,
              pass: process.env.password 
            }
          });

        
        await generateQR(""+url+"");

          
          var mailOptions = {
            from: process.env.email ,
            to: email,
            subject: 'Sending Email using Node.js',
          


           attachments: [{
            filename: 'yahoo-qr-code.jpg',
            path: `${__dirname}/../yahoo-qr-code.png`,
            cid: 'yahoo-qr-code1' //same cid value as in the html img src
}],

html: 'Qr Code :  <br>  <img src="cid:yahoo-qr-code1"/>' ,// html body


            // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
            
          
        return content;
      } catch (e) {
        throw Error("Error while adding new Client");
      }
};




exports.removeClient = async function (id) {
    try {
      var content = await Client.findByIdAndDelete(id);
      return content;
    } catch (e) {
      throw Error(e);
    }
  };
  
  exports.updateClient = async function (id, data) {
    try {
      var content = await Client.findByIdAndUpdate(id, data);
      return  content;
    } catch (e) {
      throw Error("Error while updating");
    }
  };




  
  