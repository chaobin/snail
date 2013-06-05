(function () {

  "use strict";

  function createManyPlots (sizePlot, numPlots) {

    var spiral = new ulamespiral.UlameSpiral(sizePlot);
    spiral.draw();

    var plotters = {};

    for (var i = 1; i <= numPlots; i++) {
      var plotter = new ulamespiral.Plotter({
        'spiral': spiral,
        'tag': ('p' + i),
        'el': '#plots'
      });
      plotters[i] = plotter;
      plotter.plot('all');
    }

    for (var i in plotters) {
      var plotter = plotters[i];
      plotter.animate({
        'speed': 10,
        'icon': '.'
      });
    }
  }

  function start () {
    createManyPlots(20, 1);
  }

  start();

})();