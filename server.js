
var portNum = process.env.PORT || 3000;

var express = require('express');
var app = express();

// Support routes
app.get(/^\/examples\/ng-router\/(plants(\/?)|families)/, function(req, res) {
    res.sendFile(__dirname + '/src/examples/ng-router/original-router.html');
});
app.get(/^\/examples\/ui-router\/(plants(\/?)|families)/, function(req, res) {
    res.sendFile(__dirname + '/src/examples/ui-router/ui-router.html');
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
