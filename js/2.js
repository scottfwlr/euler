// By considering the terms in the Fibonacci sequence whose values do not exceed four million, find the sum of the even-valued terms.

var fib = [1, 2];

while (fib[fib.length-1] < 4000000) {
    fib.push(fib[fib.length-1] + fib[fib.length-2]);
}

var total = 0;

for (var i = 0; i < fib.length; i++) {
    if (fib[i] % 2 == 0) {
        total = total + fib[i];
    }
}

console.log(total); // 4613732