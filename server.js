// Import package dependencies
let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
const fs = require('fs');
let mail = require('./mail')

// Import Configurations
let config = require('./config.json');
//mail send
mail.mailSend();
// Create & Run Express App
let app = express(); 

enableCORS(app);
attachBodyParser(app);
enableStaticFileServer(app, config.uploadUrl, '/static');
enableStaticFileServer(app, config.uploadPDFUrl, '/printpdf');

let socketServer = startServer(app, config.server.port);

// Make Public And Uploads Folder If Server Have Not
if (!fs.existsSync('./public')) {
    fs.mkdirSync('./public');
} else {
    if (!fs.existsSync('./public/uploads')) {
        fs.mkdirSync('./public/uploads');
    }
    if (!fs.existsSync('./public/pdf')) {
        fs.mkdirSync('./public/pdf');
    }
}

/* Fuctions */

// Start Express Server
function startServer(expressInstance, port) {
    return expressInstance.listen(port, () => {
        console.log('App listening on port : ', port);
    });
}

// Enable CORS
function enableCORS(expressInstance) {
    expressInstance.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, timeZone');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    });
}

// Attach BodyParser
function attachBodyParser(expressInstance) {
    expressInstance.use(bodyParser.json({
        limit: '1000mb'
    }));
    expressInstance.use(bodyParser.urlencoded({
        extended: true
    }));
}

// Enable Static File Server
function enableStaticFileServer(expressInstance, folderName, route) {
    // expressInstance.use(express.static(path.join(__dirname, folderName)));
    app.use(route, express.static(path.join(__dirname, folderName)));
}
