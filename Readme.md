
# mekanika-utils-each

  Functional style immutable collection iterator.


## Installation

  Install with npm:

    $ npm install mekanika-utils-each

  Or install with [component(1)](http://component.io):

    $ component install mekanika/utils-each


## API

Applies a function to a collection (either an `Object` or `Array`) and returns the unmodified collection.

```js
each( iteratorFn, collection [, thisBinding] );
```

### Params

- `iteratorFn` _{Function}_ Called for each element in the collection. Receives params:

  - `value` _{Mixed}_ The value of the current element in the collection
  - `index` _{Number|String}_ Current index, Number for array, String for object
  - `collection` _{Object|Array}_ A reference to the collection being iterated

- `collection` _{Object|Array}_ The collection to be iterated

- `thisBinding` _{*}_ Optional `this` binding for the iteratorFn callback

### Returns

- `collection` _{Object|Array}_ A reference to the original collection


## Usage

### Setup

Using node:

```js
var each = require('mekanika-utils-each');
```

To use in a browser:

    $ make component

and then include as:

```html
<script src="build/mekanika-utils-each.js"></script>
```

### Examples

Iterating arrays:

```js
each( function(v) { console.log( v*3 ) }, [1,2,3] );
// 3
// 6
// 9
// -> [1,2,3]
```

Iterating object properties:

```js
each( function(v) { console.log( v*2 ) }, {a:2,b:3,c:4} );
// 4
// 6
// 8
// -> {a:2,b:3,c:4}
```

Functional style: partial application and subsequent calling:

```js
var logSqrt = each( function(v) { console.log( Math.sqrt(v) ) } );
logSqrt( [1,2,3] );
// 1
// 1.41421...
// 1.73205...
// -> [1,2,3]
```


## License

  MIT
