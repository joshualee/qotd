$(document).ready(function() {
  var hideResponses = true;

  $("#show_responses").on("click", function(event) {
    event.preventDefault();
    hideResponses = !hideResponses;
    redraw();
  });

  $(".btn-yes").on("click", function(event) {
    if (gon.currentResponse === true) {
      unrespond(true);
    } else {
      respond(true);
    }

    hideResponses = false;
    redraw();
  });

  $(".btn-no").on("click", function(event) {
    if (gon.currentResponse === false) {
      unrespond(false);
    } else {
      respond(false);
    }

    hideResponses = false;
    redraw();
  });

  var respond = function(response) {
    if (response) {
      gon.yesCount += 1;

      if (_.isNil(gon.currentResponse)) {
        gon.responseCount += 1;
      } else {
        gon.noCount -= 1;
      }
    } else {
      gon.noCount += 1;

      if (_.isNil(gon.currentResponse)) {
        gon.responseCount += 1;
      } else {
        gon.yesCount -= 1;
      }
    }

    gon.currentResponse = response;
  };

  var unrespond = function(response) {
    if (response) {
      gon.yesCount -= 1;
    } else {
      gon.noCount -= 1;
    }

    gon.responseCount -= 1;
    gon.currentResponse = null;
  };

  var getPercent = function(numerator, denominator) {
    if (denominator === 0) {
      return 0;
    }

    return Math.round(numerator / denominator) * 100;
  };

  var formatPercent = function(p) {
    return "(" + p + "%)";
  }

  var redraw = function() {
    console.log(gon);
    $("#responses").toggleClass("hidden", hideResponses);
    $("#show_responses").html((hideResponses) ? "Show Responses" : "Hide Responses");

    $(".yes-response-count").html(gon.yesCount);
    $(".yes-response-percent").html(formatPercent(getPercent(gon.yesCount, gon.responseCount)));
    $(".progress-yes").attr({
      value: getPercent(gon.yesCount, gon.responseCount),
      max: 100,
    });

    $(".no-response-count").html(gon.noCount);
    $(".no-response-percent").html(formatPercent(getPercent(gon.noCount, gon.responseCount)));
    $(".progress-no").attr({
      value: getPercent(gon.noCount, gon.responseCount),
      max: 100,
    });

    $(".total-response-count").html(gon.responseCount);

    $(".btn-yes").toggleClass("btn-success", _.isNil(gon.currentResponse)  || gon.currentResponse === true);
    $(".btn-yes").toggleClass("btn-secondary", gon.currentResponse === false);
    $(".btn-no").toggleClass("btn-danger", _.isNil(gon.currentResponse) || gon.currentResponse === false);
    $(".btn-no").toggleClass("btn-secondary", gon.currentResponse === true);
  };

  redraw();
});
