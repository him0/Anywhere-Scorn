audiojs.events.ready(function() {
    var as = audiojs.createAll();
});

var ScornBGM = {};

(function(ns) {
    var audio = null;
    
    addEventListener("load",function() {
        audio = document.getElementById("ScornAudio");
        
        setup();
    });

    function setup() {
        ns.audio = audio;
    }
    
})(ScornBGM);



