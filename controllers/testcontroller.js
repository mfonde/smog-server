var express = require('express');
var router = express.Router();
//* Can be removed (all contents of file)
//? Gets the current url endpoint of the client side server
//* If this route is hit, send this message into the console or postman success message
router.get('/', function (req, res) {
    //* there is no request going into this router's get request. On visitation of this route, the server will respond with the following message.
    res.send('This is the test route');
});

//? Exports router so that the functions tied to certain endpoints can be reached.
module.exports = router;
