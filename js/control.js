var ScornControl = {};

(function(ns) {
    var highVolumeIcon = null;
    var lowVolumeIcon = null;
    var offVolumeIcon = null;
    var muteVolumeIcon = null;
    var volumeRange = null;
    var reloadButton = null;
    var playButton = null;
    var pauseButton = null;
    var scornBGM = null;
    var appendix = null;
    
    addEventListener("load",function() {
        highVolumeIcon = document.getElementById("v-high");
        lowVolumeIcon = document.getElementById("v-low");
        offVolumeIcon = document.getElementById("v-off");
        muteVolumeIcon = document.getElementById("v-mute");
        volumeRange = document.getElementById("volume");
        reloadButton = document.getElementById("reload");
        playButton = document.getElementById("play");
        pauseButton = document.getElementById("pause");
        appendixArea = document.getElementById("appendix");
        
        var backgroundPage = chrome.extension.getBackgroundPage();
        scornBGM = backgroundPage.ScornBGM;
        
        debug();
        setup();
    });
    
    ns.debug = debug();
    function debug() {
        ns.scornBGM = scornBGM;
    }
    
    function setup() {
        volumeRange.value = scornBGM.audio.volume;
        volumeUpdate();
        
        isPlaying = !scornBGM.audio.paused;
        
        if (isPlaying){
            play();
        }else {
            pause();
        }
        
        highVolumeIcon.addEventListener("click", mute);
        lowVolumeIcon.addEventListener("click", mute);
        offVolumeIcon.addEventListener("click", mute);
        muteVolumeIcon.addEventListener("click", mute);
        volumeRange.addEventListener("change", volumeUpdate);
        reloadButton.addEventListener("click", reload);
        playButton.addEventListener("click", play);
        pauseButton.addEventListener("click", pause);
    };
    
    var volume = 0;
    function volumeUpdate() {
        scornBGM.audio.muted = false;
        
        volume = volumeRange.value;
        scornBGM.audio.volume = volume;
        
        highVolumeIcon.style.display = "none";
        lowVolumeIcon.style.display = "none";
        offVolumeIcon.style.display = "none";
        muteVolumeIcon.style.display = "none";
        
        if (volume == 0) {
            offVolumeIcon.style.display = "inline";
        } else if (0.5 < volume) {
            highVolumeIcon.style.display = "inline";
        } else {
            lowVolumeIcon.style.display = "inline";
        }
    };
    
    function mute() {
        var isMuted = !scornBGM.audio.muted;
        scornBGM.audio.muted = isMuted;
        if (isMuted){
            highVolumeIcon.style.display = "none";
            lowVolumeIcon.style.display = "none";
            offVolumeIcon.style.display = "none";
            muteVolumeIcon.style.display = "inline";
        }else {
            volumeUpdate();
        }
    }
    
    var reloadTimes = 0;
    function reload() {
        scornBGM.audio.currentTime = 0;
        
        reloadTimes = reloadTimes + 1;
        if (reloadTimes == 10){
            hidden();
        }
        
    };
    
    function play() {
        scornBGM.audio.play();
        isPlaying = true;
        playButton.style.display = "none";
        pauseButton.style.display = "inline";
    };
    
    function pause() {
        scornBGM.audio.pause();
        isPlaying = false;
        playButton.style.display = "inline";
        pauseButton.style.display = "none";
    };
    
    function hidden() {
        appendixArea.style.display = "inline";
    }
    
})(ScornControl);


