// Collatz sequence
// n is even -> n/2
// n is odd  -> 3n+1
// n is 1    -> done

// it is thought that all starting numbers finish at 1
// Which starting number, under one million, produces the longest chain?

// the gross way is to just collatz each number and look for the longest chain

var gross = function() {

	function collatz(n) {
		if (n % 2 == 0) {
			return n/2;
		} else {
			return 3*n + 1;
		}
	}

	function collatz_chain(n) {
		var c = n;
		var i = 1;
		while (c != 1) {
			c = collatz(c);
			i++;
		}
		return i;
	}

	var best_starting = -1;
	var longest_chain = 0;

	for (var i = 1; i < 1000000; i++) {
		var chain = collatz_chain(i);
		if (chain > longest_chain) {
			longest_chain = chain;
			best_starting = i;
		}
	}

	console.log( best_starting ); // 837799

};


// there's two nicer approaches

// one is to create a 'Collatzer' object that memoizes each calculation
// which turns a call into a hash lookup

var memo_coll = function() {

	collatzer = {
		memo: {1: 1},
		collatz_calc: function(n) {
			if (n % 2 == 0) {
				return n/2;
			} else {
				return 3*n + 1;
			}
		},
		collatz: function(n) {
			if (this.memo[n] === undefined) {
				this.memo[n] = this.collatz_calc(n);
			}
			return this.memo[n];
		}
	};

	function collatz_chain(n) {
		var c = n;
		var i = 1;
		while (c != 1) {
			c = collatzer.collatz(c);
			i++;
		}
		return i;
	}

	var best_starting = -1;
	var longest_chain = 0;

	for (var i = 1; i < 1000000; i++) {
		var chain = collatz_chain(i);
		if (chain > longest_chain) {
			longest_chain = chain;
			best_starting = i;
		}
	}

	console.log( best_starting ); // 837799

	// N.B.: a Collatz iteration is a tiny arithmetical operation
	// relative to assigning and looking up values in associative arrays
	// so although this is much slower than the gross way
	// it's the right way to do it for expensive operations
};

// the other is to save a map of each starting number to its chain length
// which lets us short-circuit whenever we're on a known collatz trajectory

var trajectorize = function() {

	var chain_length = {1: 1};

	function collatz(n) {
		if (n % 2 == 0) {
			return n/2;
		} else {
			return 3*n + 1;
		}
	}

	function collatz_chain(n) {
		var c = n;
		var len = 1;
		if (chain_length[c] === undefined) {
			c = collatz(c);
			len = 1 + collatz_chain(c);
			chain_length[c] = len;
		}
		return chain_length[c];
	}

	var best_starting = -1;
	var longest_chain = 0;

	for (var i = 1; i < 1000000; i++) {
		var chain = collatz_chain(i);
		if (chain > longest_chain) {
			longest_chain = chain;
			best_starting = i;
		}
	}

	console.log( best_starting ); // 837799
};




// gross();        // 1.47s user 0.02s system 99% cpu 1.490 total
// memo_coll();    // 5.08s user 0.08s system 99% cpu 5.164 total
// trajectorize(); // 0.81s user 0.07s system 99% cpu 0.892 total