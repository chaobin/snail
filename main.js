(function () {

  "use strict";

  function start () {

    var spiral = new ulamespiral.UlameSpiral(10);
    spiral.draw();

    var plotter = new ulamespiral.Plotter({
      'spiral': spiral,
      'tag': 'p1',
      'el': '#plots'
    });
    plotter.plot('all');

    var plotter = new ulamespiral.Plotter({
      'spiral': spiral,
      'tag': 'p2',
      'el': '#plots'
    });
    plotter.plot('prime');

    var plotter = new ulamespiral.Plotter({
      'spiral': spiral,
      'tag': 'p3',
      'el': '#plots'
    });
    plotter.plot('triangle');
  }

  start();

})();