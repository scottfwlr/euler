// What is the largest prime factor of 600851475143?

factorise = function(num) {
	var factors = [];
	var dvs = 2; // the smallest prime
	var brkpt = Math.sqrt(num); // the largest possible factor
	while (num > 1) { 
		while (num % dvs == 0) {
			factors.push(dvs);
			num /= dvs; 
		}
		dvs++; 
		// we will always hit a prime before we hit a composite
		// and each primes remove all composites it is a factor of
	}
	return factors;
};

var factors = factorise(600851475143);
// since we started with the lowest factors,
// the highest is at the end

console.log(factors[factors.length-1]); // 6857