(function () {

  "use strict";

  var drawer = new snail.Drawer(7);
  drawer.prepare();
  drawer.draw();
  snail.ui.draw(drawer._zeros);

})();