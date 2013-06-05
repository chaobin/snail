/**
 * Added by Chaobin Tang <cbtchn@gmail.com>
 * Added on 2013-05-30
 *
**/

(function ($) {

  "use strict";

  /**
   * External name
  **/
  var ulamespiral = window.ulamespiral || {};
  window.ulamespiral = ulamespiral;

  /**
   * Taken from someone else that I forgot the source.
   *
  **/
  ulamespiral.Prime = function() {
    // current prime number
    this.prime = 1;

    // return true if NUM is prime
    this.isPrime = function(num) {
      var result = true;
      if (num !== 2) {
        if (num % 2 == 0) {
          result = false;
        } else {
          for (var x = 3; x <= Math.sqrt(num); x += 2) {
            if (num % x == 0) result = false;
          }
        }
      }
      return result;
    }

    // return next prime number
    this.nextPrime = function() {
      this.prime++;
      while (!this.isPrime(this.prime)) this.prime++;
      return this.prime;
    }
  }

  ulamespiral.Point = function (n, x, y) {
    
    var that = this;
    that.n = n;
    that.x = x;
    that.y = y;

    that.klass = 'point';

    that.toDivWithID = function (_id) {
      var div = $('<div></div>').addClass(that.klass);
      div.attr({
        'id': _id,
        'title': that.n
      });
      return div;
    }

  }

  /**
   * Class used to calculate the Ulame Spiral.
  **/
  ulamespiral.UlameSpiral = function (size) {

    var that = this;

    that.size = size;

    that.center = (function () {
      /**
       * The index of the center value
       * in a 0-indexed array.
      **/
      return Math.ceil( (that.size - 1) / 2 );
    })();

    that.isOdd = function (n) {
      return ( (n & 1) == 1 );
    }

    that.corrs = function () {
      /**
       * Return array of odd numbers.
       * e.g. 
       *-
       * 1 -> [1]
       * 3 -> [1, 3]
       * 5 -> [1, 3, 5]
       * 7 -> [1, 3, 5, 7]
      **/

      var corrs = [];
      
      var i = 0;
      while (i <= that.size) {
        if ( that.isOdd(i) ) {
          corrs.push(i);
        }
        i += 1;
      }

      return corrs;
    }

    that.zeros = function () {
      /**
       * Calculate a 2-D array pre-filled
       * with 0.
      **/
      var Ys = [];
      for (var i = 0; i < that.size; i++) {
        var Xs = [];
        for (var j = 0; j < that.size; j++) {
          Xs.push(0);
        }
        Ys.push(Xs);
      }
      return Ys;

    }

    that.distance = function (axis) {
      /**
       * Return the distance to the center
       * along one certain axis, be it
       * either x or y.
      **/
      return Math.abs(axis - that.center) - 1;
    }

    that.corrByPoint = function (x, y) {
      /**
       * Return the corresponding correlation
       * given the coordinates in the matrix.
      **/
      
      var distance_x = that.distance(x);
      var distance_y = that.distance(y);

      var corrIndex = distance_x;
      if ( distance_x < distance_y ) {
        corrIndex = distance_x + (distance_y - distance_x);
      }

      return that._corrs[corrIndex + 1];
    }

    that.draw = function () {
      /**
       *
       * IMPORTANT! This is the formula that
       * calculates the number based on an observation
       * that number value decreases along the direction
       * spiral to the center of the pattern.
       *
      **/
      that.prepare();

      if (that._map.length > 0) { // Means already calculated.
        return;
      }

      var n = 0, pow, topLeft, bottomLeft, bottomRight;

      for (var x = 0; x < that.size; x++) {
        for (var y = 0, last = that.tail; y < that.size; y++) {

          var corr = that.corrByPoint(x, y);

          pow = Math.pow(corr, 2);
          topLeft = pow - (corr - 1);
          bottomLeft = topLeft - (corr - 1);
          bottomRight = bottomLeft - (corr - 1);

          n = ( topLeft - x + y);
          if ( x > that.center ) {
            if ( y > (that.tail - x) && y < ( x + 1)) {
              n = bottomLeft - y + (that.tail - x);
            }
          }

          if ( y > that.center ) {
            
            if ( x > (that.tail - y) && x < y ) { // cause it is one-element-less than bottom-x-axis.
              n = bottomRight - (that.tail - x) + (that.tail - y);
            }
          }

          if (n > that.pow) {
            n = -1;
          }
          that._zeros[x][y] = n;
          // Pinpoint this number with its coordinates
          that._map[n] = {x:x, y:y};
        }
      }

    }

    that.prepare = function () {
      /**
       *
       * Called before draw().
       * This is made to be lazy.
       * 
       * IMPORTANT! When the size is an even number,
       * the size is incremented by 1 to make it odd.
       * This is because the pattern of the size of an
       * odd number has the pattern of that of (size-1)
       * contained, only it has an extra top and right
       * 'border', and there are instead filled with
       * '-1' to indicate their uselessness when feeded
       * to the output.
       *
      **/
      if ( that.pow == undefined ) {

        that.pow = Math.pow(that.size, 2);

        if (! that.isOdd(that.size) ) {
          that.pow = Math.pow(that.size, 2);
          that.size += 1;
        }

        that.tail = that.size - 1;
      }

      if ( that._corrs == undefined ) {
        that._corrs = that.corrs();
        that._zeros = that.zeros(); // Computed results;
        that._map = {};
      }
    }
  }

  ulamespiral.Plotter = function (options) {
    /**
     *
     * Class that plots certain
     * interesting numbers, such as prime
     * number, triangle number, on a pre-calculated
     * Ulame Spiral instance.
     *
    **/

    var that = this;

    that.spiral = options.spiral; // ulamespiral instance
    that.$el = $(options.el); // selector of container that this spiral goes into
    that.tag = options.tag; // unique tag for this spiral plot
    that.klass = 'spiral'; // class name for spiral div

    that.init = function () {
      /**
       *
       * Initializer for this class
       *
      **/
      that.container = $('<div></div>').attr('id', 'us' + that.tag);
      that.container.addClass(that.klass);
      that.container.appendTo(that.$el);
    }

    that.newLine = function () {
      $('<br/>').appendTo(that.container);
    }

    that.plot = function (plotter) {
      /**
       * Print the pattern into ducument.
       * 
       * param spiral: the UlameSpiral instance
       * plotter: name of function that decides whether
       *    and how to plot a point.
      **/

      var matrix = that.spiral._zeros;
      var size = matrix.length;

      for (var x = 0; x < size; x++) {

        for (var y = 0; y < size; y++) {
          var n = matrix[x][y];
          if (n < 0) {
            // Ignore -1, the left and top 'border' for spirals of size of an even number.
            continue;
          }
          that[plotter](new ulamespiral.Point(n, x, y));
        }
        that.newLine();
      }
    }

    that.drawPoint = function (point, highlight) {
      
      var _id = that.tag + point.x + point.y
      var pointDiv = point.toDivWithID(_id);
      if (highlight) {
        pointDiv.addClass('highlight');
      }
      pointDiv.appendTo(that.container);
    }

    that.all = function (point) {
      that.drawPoint(point, true);
    }

    that.prime = function (point) {
      /**
       *
       * Plot all found prime numbers on the spiral
       * pattern, to demonstrate an interesting feature
       * of prime numbers, that they tend to appear
       * in lines as many as possible in this spiral
       * pattern.
       *
      **/
      var highlight = false;

      if (that.primeObj == undefined) {
        that.primeObj = new ulamespiral.Prime();
      }
      highlight = that.primeObj.isPrime(point.n);
      that.drawPoint(point, highlight);
    }

    that.triangle = function (point) {
      /**
       * Triangle numbers are numbers that you can
       * lay them out into a triangle shape.
       * e.g., 1, 3, 6, 10
       *
      **/
      var highlight = false;
      var squareRoot = Math.sqrt(8 * point.n + 1);
      if ( (squareRoot % 1) === 0 ) {
        highlight = true;
      }
      that.drawPoint(point, highlight);
    }

    that.breathe = function (divPoint) {
      /**
       *
       * Replace something inside a located
       * point div to make it look funny.
       * Since being too fast makes it impossible
       * for human-eyes to see the transition,
       * this function should be instead called
       * using setInterval() with a reasonable
       * amount of pause.
       *
       *
      **/
      var oldCtt = divPoint.innerHTML;
      var newCtt = '*';
      divPoint.innerHTML = newCtt;
    }

    that.animate = function (pattern) {
      /**
       *
       * Traverse the pattern, using the coordinates
       * to animate the pattern in one of the many funny
       * ways.
       *
      **/

      var i = 1;
      window.animator = setInterval(function () {
        if (i > pattern.pow) {
          clearInterval(window.animator);
          return;
        }
        var point = pattern._map[i];
        var _id = that.makeIdFromXY(point.x, point.y);
        var divPoint = document.getElementById(_id);
        that.breathe(divPoint);
        i++;
      }, 100);
    }

    // Initialize the instance
    that.init();

  }

})(jQuery);