// Find the sum of all the primes below two million.

// from 7.js
function prime_test(n, arr) {
	for (var i = 0; i < arr.length; i++) {
		if (n % arr[i] == 0) {
			return false;
		}
	}
	return true;
}

// modified from 7.js
function eratosthenes(n) {
	var primes = [2, 3, 5, 7, 11, 13]; // as listed by projecteuler
	var i = primes[primes.length-1]; // start at next candidate
	while (primes[primes.length-1] < n) {
		if (prime_test(i, primes)) {
			if (i < n) {
				primes.push(i);
			} else {
				return primes;
			}
		}
		i++;
	}
	return primes;
}

var arr = eratosthenes(2000000);
var result = arr.reduce( function(a, b){
	return a+b;
},0);
// $ time node 10.js
// > 37.53s user 0.06s system 99% cpu 37.637 total
// a little slow


console.log(result); // 142913828922


