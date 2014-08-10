define(['LocalStorage'],function(LocalStorage){    var Timer = {        timer: 60,        duration : 0,        resourceTimer: null,        objQuestion: null,        localStorage: new LocalStorage()    };    Timer.showTimer = function(text){        $('.timer', '.appWrapper').text(text);    };    Timer.localStoragePushTimer = function(duration){        Timer.localStorage.parseStorage();        Timer.localStorage.setTimer(duration);        Timer.localStorage.stringifyStorage();    };    Timer.timeUpShow = function(){        $('.wrongContent', '.appWrapper').html('<p class="timeUp">Ваше время истекло!</p><p><h1 class="repeatT">Повторить</h1></p>');        $('.repeatT').on('click', function(){            Timer.objQuestion.repeatTest();        });        $('.floatWindows', '.appWrapper').show();    };    Timer.goTimer = function(){        var min,            sec,            strTimer;        if(--Timer.duration > 0){            min = Math.floor((Timer.duration / 60), 2);            sec = Timer.duration % 60;            strTimer = (min < 10 ? ("0"+min) : min) + ":" + (sec < 10 ?  ("0" + sec): sec);        }else if(Timer.duration <= 0){            Timer.duration = 0;            clearInterval(Timer.resourceTimer);            Timer.resourceTimer = null;            strTimer = "00:00";            Timer.timeUpShow();        }        Timer.showTimer(strTimer);        Timer.localStoragePushTimer(Timer.duration);    };    Timer.reset = function(){        clearInterval(Timer.resourceTimer);        Timer.resourceTimer = null;        Timer.duration = Timer.timer;    };    Timer.start = function(objQuestion){        this.objQuestion =  objQuestion;        this.goTimer();        this.resourceTimer = setInterval(this.goTimer, 1000);    };    Timer.setDuration = function(duration){        this.duration   = duration;    };    Timer.getDuration = function(){        return this.duration;    };    return Timer;});