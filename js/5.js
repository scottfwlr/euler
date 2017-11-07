// What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?

divisible = function(n) {
	for (var i = 1; i <= 20; i++) {
		if (n % i != 0) {
			return false;
		}
	}
	return true;
};

var i = 20;
while (!divisible(i)) {
	i++;
}

console.log(i); // 232792560