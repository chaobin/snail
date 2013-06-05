Ulame Spiral
===

An algorithm implemented in Javascript that prints an ["Ulame Spiral"](http://en.wikipedia.org/wiki/Ulam_spiral "Ulame Spiral").

I didn't know until someone at work handed me a math magazine where Prime Number is discussed, and this very pattern is called an ["Ulame Spiral"](http://en.wikipedia.org/wiki/Ulam_spiral "Ulame Spiral").

Usage
---

```javascript

var spiral = new ulamespiral.UlameSpiral(1); // size = 1
spiral.draw();

```

And you get:

```
1
```

```javascript

var spiral = new ulamespiral.UlameSpiral(4); // size = 4

```

And you see:

```

07 08 09 10
06 01 02 11
05 04 03 12
16 15 14 13
```

```javascript

var spiral = new ulamespiral.UlameSpiral(7); // size = 7
```

And you see:

```

43 44 45 46 47 48 49 
42 21 22 23 24 25 26 
41 20 07 08 09 10 27 
40 19 06 01 02 11 28 
39 18 05 04 03 12 29 
38 17 16 15 14 13 30 
37 36 35 34 33 32 31
```

Demo
---

Here is a live [demo](http://chaobin.github.io/2013/05/30/printing-spiral-numbers-with-js/ "ulamespiral").
