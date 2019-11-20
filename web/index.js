const app = new Vue({
    el: ".app",
    data: {
        health: false,
        ip: ""
    }
})

fetch("http://localhost:" + 0xbeef + "/cmd/echo").then((res) => {
    let {
        json
    } = res;
    if (json.err == null) {
        app.$data.health = true;
    }
});
fetch("http://localhost:" + 0xbeef + "/ip").then((res) => {
    res.text().then((ip) => {
        app.$data.ip = ip;
    });
});