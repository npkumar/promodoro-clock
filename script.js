var Clock = function(stime, btime) {
  var sessionTime = stime;
  var breakTime = btime;

  this.setSessionTime = function(mins) {
    sessionTime = mins;
  }
  this.getSessionTime = function() {
    return sessionTime;
  }
  this.setBreakTime = function(mins) {
    breakTime = mins;
  }
  this.getBreakTime = function() {
    return breakTime;
  }

  this.setSessionTime(stime);
  this.setBreakTime(btime);

}

function formatTime(time) {
  time = time.toString();
  if (time.length == 1) {
    return '0' + time;
  }
  return time;
}

$(document).ready(function() {
  var pause = false;
  var clock = new Clock(parseInt($("#session_length").text()) * 60, parseInt($("#break_length").text()) * 60);

  $("#break_minus").click(function() {
    if (parseInt($("#break_length").text()) > 1) {
      pause = true;
      $("#break_length").text(parseInt($("#break_length").text()) - 1);
      clock.setBreakTime(parseInt($("#break_length").text()) * 60);
    }
  });

  $("#break_plus").click(function() {
    console.log($("#break_length").text());
    pause = true;
    $("#break_length").text(parseInt($("#break_length").text()) + 1);
    clock.setBreakTime(parseInt($("#break_length").text()) * 60);
  });

  $("#session_minus").click(function() {
    if (parseInt($("#session_length").text()) > 1) {
      pause = true;
      $("#session_length").text(parseInt($("#session_length").text()) - 1);
      clock.setSessionTime(parseInt($("#session_length").text()) * 60);
    }
  });

  $("#session_plus").click(function() {
    console.log($("#session_length").text());
    pause = true;
    $("#session_length").text(parseInt($("#session_length").text()) + 1);
    clock.setSessionTime(parseInt($("#session_length").text()) * 60);
  });

  function timer() {
    if (!pause) {

      if (clock.getSessionTime() > 0) {
        $("#clock_description").text("SESSION");
        var minutes = formatTime(Math.floor(clock.getSessionTime() / 60));
        var seconds = formatTime((clock.getSessionTime() % 60).toFixed(0));
        $("#clock_time").text(minutes + ":" + seconds);
        clock.setSessionTime(clock.getSessionTime() - 1);
      }
      if (clock.getSessionTime() <= 0) {
        $("#clock_description").text("BREAK!");
        var break_minutes = formatTime(Math.floor(clock.getBreakTime() / 60));
        var break_seconds = formatTime((clock.getBreakTime() % 60).toFixed(0));
        $("#clock_time").text(break_minutes + ":" + break_seconds);
        clock.setBreakTime(clock.getBreakTime() - 1);
        if (clock.getBreakTime() <= 0) {
          clock.setSessionTime(parseInt($("#session_length").text()) * 60);
          clock.setBreakTime(parseInt($("#break_length").text()) * 60);
        }
      }
    }

  }

  // do this every second
  setInterval(timer, 1000);

  // pause or unpause on clicking the clock
  $("#clock").click(function() {
    pause = !pause;
  });

});
