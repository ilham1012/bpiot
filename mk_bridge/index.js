"use strict";

const Bridge = require("./lib/Bridge.js");

let config = require("./config.js");
try {
    const prodConfig = require("./prod.conf.js");
    config = prodConfig;
} catch(_){
    // empty
}

const bridge = new Bridge(config);
bridge.on("error", console.error);
bridge
    .run()
    .catch(console.error);