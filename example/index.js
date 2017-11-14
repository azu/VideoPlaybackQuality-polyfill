// LICENSE : MIT
"use strict";
var isSupported = require("videoplaybackquality").isSupported;
var getVideoPlaybackQuality = require("videoplaybackquality").getVideoPlaybackQuality;
console.log("getVideoPlaybackQuality supported: ", isSupported ? "YES" : "NO");
setInterval(function() {
    var video = document.getElementById("js-video");
    console.log(getVideoPlaybackQuality(video));
}, 1000);
