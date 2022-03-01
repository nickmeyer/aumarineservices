String.prototype.rightChars = function(n){
  if (n <= 0) {
    return "";
  }
  else if (n > this.length) {
    return this;
  }
  else {
    return this.substring(this.length, this.length - n);
  }
};

(function($) {
  var
    options = {
      highlightSpeed    : 20,
      typeSpeed         : 100,
      clearDelay        : 500,
      typeDelay         : 200,
      clearOnHighlight  : true,
      typerDataAttr     : 'data-typer-targets',
      typerInterval     : 2000
    },
    highlight,
    clearText,
    backspace,
    type,
    spanWithColor,
    clearDelay,
    typeDelay,
    clearData,
    isNumber,
    typeWithAttribute,
    getHighlightInterval,
    getTypeInterval,
    typerInterval;

  spanWithColor = function(color, backgroundColor) {
    if (color === 'rgba(0, 0, 0, 0)') {
      color = 'rgba(0, 0, 0, 0.3)';
    }

    return $('<span></span>')
      .css('color', color)
      .css('background-color', backgroundColor);
  };

  isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  clearData = function ($e) {
    $e.removeData([
      'typePosition',
      'highlightPosition',
      'leftStop',
      'rightStop',
      'primaryColor',
      'backgroundColor',
      'text',
      'typing'
    ]);
  };

  type = function ($e) {
    var
      // position = $e.data('typePosition'),
      text = $e.data('text'),
      oldLeft = $e.data('oldLeft'),
      oldRight = $e.data('oldRight');

    // if (!isNumber(position)) {
      // position = $e.data('leftStop');
    // }

    if (!text || text.length === 0) {
      clearData($e);
      return;
    }


    $e.text(
      oldLeft +
      text.charAt(0) +
      oldRight
    ).data({
      oldLeft: oldLeft + text.charAt(0),
      text: text.substring(1)
    });

    // $e.text($e.text() + text.substring(position, position + 1));

    // $e.data('typePosition', position + 1);

    setTimeout(function () {
      type($e);
    }, getTypeInterval());
  };

  clearText = function ($e) {
    $e.find('span').remove();

    setTimeout(function () {
      type($e);
    }, typeDelay());
  };

  highlight = function ($e) {
    var
      position = $e.data('highlightPosition'),
      leftText,
      highlightedText,
      rightText;

    if (!isNumber(position)) {
      position = $e.data('rightStop') + 1;
    }

    if (position <= $e.data('leftStop')) {
      setTimeout(function () {
        clearText($e);
      }, clearDelay());
      return;
    }

    leftText = $e.text().substring(0, position - 1);
    highlightedText = $e.text().substring(position - 1, $e.data('rightStop') + 1);
    rightText = $e.text().substring($e.data('rightStop') + 1);

    $e.html(leftText)
      .append(
        spanWithColor(
            $e.data('backgroundColor'),
            $e.data('primaryColor')
          )
          .append(highlightedText)
      )
      .append(rightText);

    $e.data('highlightPosition', position - 1);

    setTimeout(function () {
      return highlight($e);
    }, getHighlightInterval());
  };

  typeWithAttribute = function ($e) {
    var targets;

    if ($e.data('typing')) {
      return;
    }

    try {
      targets = JSON.parse($e.attr($.typer.options.typerDataAttr)).targets;
    } catch (e) {}

    if (typeof targets === "undefined") {
      targets = $.map($e.attr($.typer.options.typerDataAttr).split(','), function (e) {
        return $.trim(e);
      });
    }

    $e.typeTo(targets[Math.floor(Math.random()*targets.length)]);
  };

  // Expose our options to the world.
  $.typer = (function () {
    return { options: options };
  })();

  $.extend($.typer, {
    options: options
  });

  //-- Methods to attach to jQuery sets

  $.fn.typer = function() {
    var $elements = $(this);

    return $elements.each(function () {
      var $e = $(this);

      if (typeof $e.attr($.typer.options.typerDataAttr) === "undefined") {
        return;
      }

      typeWithAttribute($e);
      setInterval(function () {
        typeWithAttribute($e);
      }, typerInterval());
    });
  };

  $.fn.typeTo = function (newString) {
    var
      $e = $(this),
      currentText = $e.text(),
      i = 0,
      j = 0;

    if (currentText === newString) {
      console.log("Our strings our equal, nothing to type");
      return $e;
    }

    if (currentText !== $e.html()) {
      console.error("Typer does not work on elements with child elements.");
      return $e;
    }

    $e.data('typing', true);

    while (currentText.charAt(i) === newString.charAt(i)) {
      i++;
    }

    while (currentText.rightChars(j) === newString.rightChars(j)) {
      j++;
    }

    newString = newString.substring(i, newString.length - j + 1);

    $e.data({
      oldLeft: currentText.substring(0, i),
      oldRight: currentText.rightChars(j - 1),
      leftStop: i,
      rightStop: currentText.length - j,
      primaryColor: $e.css('color'),
      backgroundColor: $e.css('background-color'),
      text: newString
    });

    highlight($e);

    return $e;
  };

  //-- Helper methods. These can one day be customized further to include things like ranges of delays.

  getHighlightInterval = function () {
    return $.typer.options.highlightSpeed;
  };

  getTypeInterval = function () {
    return $.typer.options.typeSpeed;
  },

  clearDelay = function () {
    return $.typer.options.clearDelay;
  },

  typeDelay = function () {
    return $.typer.options.typeDelay;
  };

  typerInterval = function () {
    return $.typer.options.typerInterval;
  };
})(jQuery);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJqcXVlcnkudHlwZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiU3RyaW5nLnByb3RvdHlwZS5yaWdodENoYXJzID0gZnVuY3Rpb24obil7XG4gIGlmIChuIDw9IDApIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuICBlbHNlIGlmIChuID4gdGhpcy5sZW5ndGgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBlbHNlIHtcbiAgICByZXR1cm4gdGhpcy5zdWJzdHJpbmcodGhpcy5sZW5ndGgsIHRoaXMubGVuZ3RoIC0gbik7XG4gIH1cbn07XG5cbihmdW5jdGlvbigkKSB7XG4gIHZhclxuICAgIG9wdGlvbnMgPSB7XG4gICAgICBoaWdobGlnaHRTcGVlZCAgICA6IDIwLFxuICAgICAgdHlwZVNwZWVkICAgICAgICAgOiAxMDAsXG4gICAgICBjbGVhckRlbGF5ICAgICAgICA6IDUwMCxcbiAgICAgIHR5cGVEZWxheSAgICAgICAgIDogMjAwLFxuICAgICAgY2xlYXJPbkhpZ2hsaWdodCAgOiB0cnVlLFxuICAgICAgdHlwZXJEYXRhQXR0ciAgICAgOiAnZGF0YS10eXBlci10YXJnZXRzJyxcbiAgICAgIHR5cGVySW50ZXJ2YWwgICAgIDogMjAwMFxuICAgIH0sXG4gICAgaGlnaGxpZ2h0LFxuICAgIGNsZWFyVGV4dCxcbiAgICBiYWNrc3BhY2UsXG4gICAgdHlwZSxcbiAgICBzcGFuV2l0aENvbG9yLFxuICAgIGNsZWFyRGVsYXksXG4gICAgdHlwZURlbGF5LFxuICAgIGNsZWFyRGF0YSxcbiAgICBpc051bWJlcixcbiAgICB0eXBlV2l0aEF0dHJpYnV0ZSxcbiAgICBnZXRIaWdobGlnaHRJbnRlcnZhbCxcbiAgICBnZXRUeXBlSW50ZXJ2YWwsXG4gICAgdHlwZXJJbnRlcnZhbDtcblxuICBzcGFuV2l0aENvbG9yID0gZnVuY3Rpb24oY29sb3IsIGJhY2tncm91bmRDb2xvcikge1xuICAgIGlmIChjb2xvciA9PT0gJ3JnYmEoMCwgMCwgMCwgMCknKSB7XG4gICAgICBjb2xvciA9ICdyZ2JhKDAsIDAsIDAsIDAuMyknO1xuICAgIH1cblxuICAgIHJldHVybiAkKCc8c3Bhbj48L3NwYW4+JylcbiAgICAgIC5jc3MoJ2NvbG9yJywgY29sb3IpXG4gICAgICAuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgYmFja2dyb3VuZENvbG9yKTtcbiAgfTtcblxuICBpc051bWJlciA9IGZ1bmN0aW9uIChuKSB7XG4gICAgcmV0dXJuICFpc05hTihwYXJzZUZsb2F0KG4pKSAmJiBpc0Zpbml0ZShuKTtcbiAgfTtcblxuICBjbGVhckRhdGEgPSBmdW5jdGlvbiAoJGUpIHtcbiAgICAkZS5yZW1vdmVEYXRhKFtcbiAgICAgICd0eXBlUG9zaXRpb24nLFxuICAgICAgJ2hpZ2hsaWdodFBvc2l0aW9uJyxcbiAgICAgICdsZWZ0U3RvcCcsXG4gICAgICAncmlnaHRTdG9wJyxcbiAgICAgICdwcmltYXJ5Q29sb3InLFxuICAgICAgJ2JhY2tncm91bmRDb2xvcicsXG4gICAgICAndGV4dCcsXG4gICAgICAndHlwaW5nJ1xuICAgIF0pO1xuICB9O1xuXG4gIHR5cGUgPSBmdW5jdGlvbiAoJGUpIHtcbiAgICB2YXJcbiAgICAgIC8vIHBvc2l0aW9uID0gJGUuZGF0YSgndHlwZVBvc2l0aW9uJyksXG4gICAgICB0ZXh0ID0gJGUuZGF0YSgndGV4dCcpLFxuICAgICAgb2xkTGVmdCA9ICRlLmRhdGEoJ29sZExlZnQnKSxcbiAgICAgIG9sZFJpZ2h0ID0gJGUuZGF0YSgnb2xkUmlnaHQnKTtcblxuICAgIC8vIGlmICghaXNOdW1iZXIocG9zaXRpb24pKSB7XG4gICAgICAvLyBwb3NpdGlvbiA9ICRlLmRhdGEoJ2xlZnRTdG9wJyk7XG4gICAgLy8gfVxuXG4gICAgaWYgKCF0ZXh0IHx8IHRleHQubGVuZ3RoID09PSAwKSB7XG4gICAgICBjbGVhckRhdGEoJGUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuXG4gICAgJGUudGV4dChcbiAgICAgIG9sZExlZnQgK1xuICAgICAgdGV4dC5jaGFyQXQoMCkgK1xuICAgICAgb2xkUmlnaHRcbiAgICApLmRhdGEoe1xuICAgICAgb2xkTGVmdDogb2xkTGVmdCArIHRleHQuY2hhckF0KDApLFxuICAgICAgdGV4dDogdGV4dC5zdWJzdHJpbmcoMSlcbiAgICB9KTtcblxuICAgIC8vICRlLnRleHQoJGUudGV4dCgpICsgdGV4dC5zdWJzdHJpbmcocG9zaXRpb24sIHBvc2l0aW9uICsgMSkpO1xuXG4gICAgLy8gJGUuZGF0YSgndHlwZVBvc2l0aW9uJywgcG9zaXRpb24gKyAxKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgdHlwZSgkZSk7XG4gICAgfSwgZ2V0VHlwZUludGVydmFsKCkpO1xuICB9O1xuXG4gIGNsZWFyVGV4dCA9IGZ1bmN0aW9uICgkZSkge1xuICAgICRlLmZpbmQoJ3NwYW4nKS5yZW1vdmUoKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgdHlwZSgkZSk7XG4gICAgfSwgdHlwZURlbGF5KCkpO1xuICB9O1xuXG4gIGhpZ2hsaWdodCA9IGZ1bmN0aW9uICgkZSkge1xuICAgIHZhclxuICAgICAgcG9zaXRpb24gPSAkZS5kYXRhKCdoaWdobGlnaHRQb3NpdGlvbicpLFxuICAgICAgbGVmdFRleHQsXG4gICAgICBoaWdobGlnaHRlZFRleHQsXG4gICAgICByaWdodFRleHQ7XG5cbiAgICBpZiAoIWlzTnVtYmVyKHBvc2l0aW9uKSkge1xuICAgICAgcG9zaXRpb24gPSAkZS5kYXRhKCdyaWdodFN0b3AnKSArIDE7XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uIDw9ICRlLmRhdGEoJ2xlZnRTdG9wJykpIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBjbGVhclRleHQoJGUpO1xuICAgICAgfSwgY2xlYXJEZWxheSgpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZWZ0VGV4dCA9ICRlLnRleHQoKS5zdWJzdHJpbmcoMCwgcG9zaXRpb24gLSAxKTtcbiAgICBoaWdobGlnaHRlZFRleHQgPSAkZS50ZXh0KCkuc3Vic3RyaW5nKHBvc2l0aW9uIC0gMSwgJGUuZGF0YSgncmlnaHRTdG9wJykgKyAxKTtcbiAgICByaWdodFRleHQgPSAkZS50ZXh0KCkuc3Vic3RyaW5nKCRlLmRhdGEoJ3JpZ2h0U3RvcCcpICsgMSk7XG5cbiAgICAkZS5odG1sKGxlZnRUZXh0KVxuICAgICAgLmFwcGVuZChcbiAgICAgICAgc3BhbldpdGhDb2xvcihcbiAgICAgICAgICAgICRlLmRhdGEoJ2JhY2tncm91bmRDb2xvcicpLFxuICAgICAgICAgICAgJGUuZGF0YSgncHJpbWFyeUNvbG9yJylcbiAgICAgICAgICApXG4gICAgICAgICAgLmFwcGVuZChoaWdobGlnaHRlZFRleHQpXG4gICAgICApXG4gICAgICAuYXBwZW5kKHJpZ2h0VGV4dCk7XG5cbiAgICAkZS5kYXRhKCdoaWdobGlnaHRQb3NpdGlvbicsIHBvc2l0aW9uIC0gMSk7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBoaWdobGlnaHQoJGUpO1xuICAgIH0sIGdldEhpZ2hsaWdodEludGVydmFsKCkpO1xuICB9O1xuXG4gIHR5cGVXaXRoQXR0cmlidXRlID0gZnVuY3Rpb24gKCRlKSB7XG4gICAgdmFyIHRhcmdldHM7XG5cbiAgICBpZiAoJGUuZGF0YSgndHlwaW5nJykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgdGFyZ2V0cyA9IEpTT04ucGFyc2UoJGUuYXR0cigkLnR5cGVyLm9wdGlvbnMudHlwZXJEYXRhQXR0cikpLnRhcmdldHM7XG4gICAgfSBjYXRjaCAoZSkge31cblxuICAgIGlmICh0eXBlb2YgdGFyZ2V0cyA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGFyZ2V0cyA9ICQubWFwKCRlLmF0dHIoJC50eXBlci5vcHRpb25zLnR5cGVyRGF0YUF0dHIpLnNwbGl0KCcsJyksIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHJldHVybiAkLnRyaW0oZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAkZS50eXBlVG8odGFyZ2V0c1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqdGFyZ2V0cy5sZW5ndGgpXSk7XG4gIH07XG5cbiAgLy8gRXhwb3NlIG91ciBvcHRpb25zIHRvIHRoZSB3b3JsZC5cbiAgJC50eXBlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHsgb3B0aW9uczogb3B0aW9ucyB9O1xuICB9KSgpO1xuXG4gICQuZXh0ZW5kKCQudHlwZXIsIHtcbiAgICBvcHRpb25zOiBvcHRpb25zXG4gIH0pO1xuXG4gIC8vLS0gTWV0aG9kcyB0byBhdHRhY2ggdG8galF1ZXJ5IHNldHNcblxuICAkLmZuLnR5cGVyID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyICRlbGVtZW50cyA9ICQodGhpcyk7XG5cbiAgICByZXR1cm4gJGVsZW1lbnRzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICRlID0gJCh0aGlzKTtcblxuICAgICAgaWYgKHR5cGVvZiAkZS5hdHRyKCQudHlwZXIub3B0aW9ucy50eXBlckRhdGFBdHRyKSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHR5cGVXaXRoQXR0cmlidXRlKCRlKTtcbiAgICAgIHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdHlwZVdpdGhBdHRyaWJ1dGUoJGUpO1xuICAgICAgfSwgdHlwZXJJbnRlcnZhbCgpKTtcbiAgICB9KTtcbiAgfTtcblxuICAkLmZuLnR5cGVUbyA9IGZ1bmN0aW9uIChuZXdTdHJpbmcpIHtcbiAgICB2YXJcbiAgICAgICRlID0gJCh0aGlzKSxcbiAgICAgIGN1cnJlbnRUZXh0ID0gJGUudGV4dCgpLFxuICAgICAgaSA9IDAsXG4gICAgICBqID0gMDtcblxuICAgIGlmIChjdXJyZW50VGV4dCA9PT0gbmV3U3RyaW5nKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIk91ciBzdHJpbmdzIG91ciBlcXVhbCwgbm90aGluZyB0byB0eXBlXCIpO1xuICAgICAgcmV0dXJuICRlO1xuICAgIH1cblxuICAgIGlmIChjdXJyZW50VGV4dCAhPT0gJGUuaHRtbCgpKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiVHlwZXIgZG9lcyBub3Qgd29yayBvbiBlbGVtZW50cyB3aXRoIGNoaWxkIGVsZW1lbnRzLlwiKTtcbiAgICAgIHJldHVybiAkZTtcbiAgICB9XG5cbiAgICAkZS5kYXRhKCd0eXBpbmcnLCB0cnVlKTtcblxuICAgIHdoaWxlIChjdXJyZW50VGV4dC5jaGFyQXQoaSkgPT09IG5ld1N0cmluZy5jaGFyQXQoaSkpIHtcbiAgICAgIGkrKztcbiAgICB9XG5cbiAgICB3aGlsZSAoY3VycmVudFRleHQucmlnaHRDaGFycyhqKSA9PT0gbmV3U3RyaW5nLnJpZ2h0Q2hhcnMoaikpIHtcbiAgICAgIGorKztcbiAgICB9XG5cbiAgICBuZXdTdHJpbmcgPSBuZXdTdHJpbmcuc3Vic3RyaW5nKGksIG5ld1N0cmluZy5sZW5ndGggLSBqICsgMSk7XG5cbiAgICAkZS5kYXRhKHtcbiAgICAgIG9sZExlZnQ6IGN1cnJlbnRUZXh0LnN1YnN0cmluZygwLCBpKSxcbiAgICAgIG9sZFJpZ2h0OiBjdXJyZW50VGV4dC5yaWdodENoYXJzKGogLSAxKSxcbiAgICAgIGxlZnRTdG9wOiBpLFxuICAgICAgcmlnaHRTdG9wOiBjdXJyZW50VGV4dC5sZW5ndGggLSBqLFxuICAgICAgcHJpbWFyeUNvbG9yOiAkZS5jc3MoJ2NvbG9yJyksXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICRlLmNzcygnYmFja2dyb3VuZC1jb2xvcicpLFxuICAgICAgdGV4dDogbmV3U3RyaW5nXG4gICAgfSk7XG5cbiAgICBoaWdobGlnaHQoJGUpO1xuXG4gICAgcmV0dXJuICRlO1xuICB9O1xuXG4gIC8vLS0gSGVscGVyIG1ldGhvZHMuIFRoZXNlIGNhbiBvbmUgZGF5IGJlIGN1c3RvbWl6ZWQgZnVydGhlciB0byBpbmNsdWRlIHRoaW5ncyBsaWtlIHJhbmdlcyBvZiBkZWxheXMuXG5cbiAgZ2V0SGlnaGxpZ2h0SW50ZXJ2YWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICQudHlwZXIub3B0aW9ucy5oaWdobGlnaHRTcGVlZDtcbiAgfTtcblxuICBnZXRUeXBlSW50ZXJ2YWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICQudHlwZXIub3B0aW9ucy50eXBlU3BlZWQ7XG4gIH0sXG5cbiAgY2xlYXJEZWxheSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gJC50eXBlci5vcHRpb25zLmNsZWFyRGVsYXk7XG4gIH0sXG5cbiAgdHlwZURlbGF5ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAkLnR5cGVyLm9wdGlvbnMudHlwZURlbGF5O1xuICB9O1xuXG4gIHR5cGVySW50ZXJ2YWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICQudHlwZXIub3B0aW9ucy50eXBlckludGVydmFsO1xuICB9O1xufSkoalF1ZXJ5KTtcbiJdLCJmaWxlIjoianF1ZXJ5LnR5cGVyLmpzIn0=
