(function () {

  "use strict";

  var sn = new snail.Snail(150);
  sn.prepare();
  sn.draw();
  snail.ui.draw(sn._zeros);

})();