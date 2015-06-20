
var portNum = process.env.PORT || 3000;

var express = require('express');
var app = express();

// Support routes
app.use("/examples/routing/plants", function(req, res) {
    res.sendFile(__dirname + '/src/examples/routing/original-router.html');
});
app.use("/examples/routing/plants/*", function(req, res) {
    res.sendFile(__dirname + '/src/examples/routing/original-router.html');
});
app.use("/examples/routing/families", function(req, res) {
    res.sendFile(__dirname + '/src/examples/routing/original-router.html');
});

app.use("/tests", express.static("tests"));
app.use("/", express.static("src"));

var server = app.listen(portNum, function () {
    var addr = server.address().address;
    var host = isLocalHost(addr) ? "localhost" : addr;
    var port = server.address().port;
    console.log('Web application listening at http://%s:%s', host, port);
});

function isLocalHost(addr) {
    return addr === "::";
}
