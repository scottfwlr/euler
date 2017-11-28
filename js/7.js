// What is the 10 001st prime number? <<<--->>>

function prime_test(n, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (n % arr[i] == 0) {
            return false;
        }
    }
    return true;
}

function eratosthenes(n) {
    var primes = [2, 3, 5, 7, 11, 13]; // as listed by projecteuler
    var i = primes[primes.length-1] + 1; // start at next candidate
    while (primes.length < n) {
        if (prime_test(i, primes)) {
            primes.push(i);
        }
        i++;
    }
    return primes;
}

var sieved = eratosthenes(10001);

console.log( sieved[sieved.length-1] ); // 104743   