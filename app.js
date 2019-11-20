const app = require("./index");
const {
    menubar
} = require('menubar');
const {
    join
} = require("path");

const mb = menubar({
    index: "file://" + join(__dirname + "/web/" + "index.html")
});

mb.on('ready', () => {
    console.log('app is ready');
    app.listen(0xbeef);
});