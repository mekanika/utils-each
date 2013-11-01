
/**
 * Expose module
 */

module.exports = each;


/**
 * Functional style collection iterator
 *
 * Iterates over objects and arrays, applying a method to each value. Returns
 * a partially applied function if only provided a `fn` parameter.
 *
 * @example
 * each( function(v) { console.log(v*3) }, [1,2,3] );
 * // 3
 * // 6
 * // 9
 *
 * @example
 * var logPlus2 = each( function(v) { console.log(v+2) } );
 * logPlus2( [1,2,3] );
 * // 3
 * // 4
 * // 5
 *
 * @param {Function} fn Each collection element gets run `fn( val, index, col)`
 * @param {Object|Array} [col] The collection to be iterated
 *
 * @returns {Object|Array} A reference back to the original collection
 */

//+ each :: Function -> Object|Array -> Object|Array

function each( fn, col ) {

  var _each = function( col ) {

    // Shallow iterate through object keys
    if (typeof col === 'object') {
      for (var key in col) {
        if (col.hasOwnProperty(key))
          fn.call( this, col[key], key, col );
      };
      return col;
    }

    // Iterate over array elements
    else if (col instanceof Array) {
      for (var i=0; i<col.length; i++) {
        fn.call( this, col[i], i, col );
      };
      return col;
    }

    // Or fail to iterate
    return new TypeError('Can only iterate over Arrays or Objects');
  }

  // Return partially applied function or execute iteration on `col`
  return col === undefined
    ? _each
    : _each( col );

}
