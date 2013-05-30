snail
=====

An algorithm implemented in Javascript that prints spiral pattern like that of one snail.

Usage
---

```javascript

var drawer = new snail.Drawer(7);
drawer.prepare();
drawer.draw();
snail.ui.draw(drawer._zeros);

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