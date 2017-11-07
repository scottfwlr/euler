// Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.

function sum_of_squares(n) {
	var total = 0;
	for (var i = 1; i <= n; i++) {
		total += i*i;
	}
	return total;
}

function square_of_sum(n) {
	var sum = 0;
	for (var i = 0; i <= n; i++) {
		sum += i;
	}
	return sum*sum;
}

console.log( square_of_sum(100) - sum_of_squares(100) ); // 25164150