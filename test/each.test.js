
/**
 * Test dependencies
 */

var each = require('..')
  , expect = require('expect.js');


/**
 * Basic module test
 */

describe('each Module', function() {

  it('exports the `each` function', function() {
    expect( each ).to.be.a( Function );
    expect( each.name ).to.be( 'each' );
  });

});


/**
 * Test global placeholders
 */

var ares = []
  , ores = {};


/**
 * Mutator method to double value and push to `ares`
 */

function doubleAndPush(v) {
  ares.push( v*2 );
}

/**
 * Mutator method to triple a value and apply it to `ores[key]`
 */

function tripleAndApply(v, key) {
  ores[ key ] = v*3;
}




/**
 * Tests when passed both each() parameters
 */

describe('each( fn, collection )', function() {

  beforeEach( function() {
    // Reset the results array
    ares = [];
    ores = {};
  });

  it('iterates over Arrays', function() {
    each( doubleAndPush, [1,2,3] );
    expect( ares ).to.contain( 2, 4, 6 );
  });

  it('iterates over Objects', function() {
    each( tripleAndApply, {a:1,b:2,c:3});
    expect( ores ).to.have.property( 'a', 3 );
    expect( ores ).to.have.property( 'b', 6 );
    expect( ores ).to.have.property( 'c', 9 );
  });

  it('returns a reference to the original collection', function() {
    var og = [3,2,1];
    var res = each( doubleAndPush, og );
    expect( res ).to.be( og );
  });

  it('passes (val, key, col) to iterator function', function(done) {
    var oc = [5];

    function iter( v, k, col ) {
      expect( v ).to.be( 5 );
      expect( k ).to.be( '0' );
      expect( col ).to.be( oc );
      expect( col[ k ] ).to.be( 5 );
      done();
    }

    each( iter, oc );

  });

  it('fails if not passed Object or Array', function() {
    expect( each( doubleAndPush, 'woo' ) ).to.be.a( TypeError );
    expect( each( doubleAndPush, 5 ) ).to.be.a( TypeError );
    expect( each( doubleAndPush, false ) ).to.be.a( TypeError );
  });

});


/**
 * Tests for partial application
 */

describe('each( fn )', function() {

  beforeEach( function() {
    // Reset the results array
    ares = [];
    ores = {};
  });

  it('returns a partially applied function', function() {
    var doubler = each( doubleAndPush );
    expect( doubler ).to.be.a( Function );
  });

  it('applies the partial when called with Array or Object', function() {
    var doubler = each( doubleAndPush );
    doubler( [1,2,3] );
    expect( ares ).to.contain( 2,4,6 );
    expect( ares[0] ).to.be( 2 );
  });

});


/**
 * `this` can be optionally passed in
 */

describe('this Context', function() {

  it('passes in and applies optional `this` context', function() {

    function Woo() {
      this.spoon = 'spoon';

      this.mod = function( ar, self ) {
        each( function(v) {
          self || (self = this);
          if (!self.spoon) throw new Error('There is no spoon');
          self.spoon += v;
        }, ar, self );
      }
    }

    var woo = new Woo();

    var err;
    try {
      woo.mod( ['yo'] );
    }
    catch( e ) { err = e; }
    expect( err ).to.be.an( Error );

    woo.mod( ['man'], woo );
    expect( woo.spoon ).to.be( 'spoonman' );

  });

});
