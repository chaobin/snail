(function () {

  "use strict";

  var sn = new snail.Snail(9);
  sn.prepare();
  sn.draw();
  snail.ui.draw(sn._zeros);
  snail.ui.animate(sn);

})();