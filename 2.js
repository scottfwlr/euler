var fib = [1, 2, 3, 5];

while (fib[fib.length-1] < 4000000) {
	fib.unshift(fib[fib.length-1] + fib[fib.length-2]);
}

var total = 0;

for (var i = 0; i < fib.length; i++) {
	if (fib[i] % 2 == 0) {
		total = total + i;
	}
}

console.log(total);