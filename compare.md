# Multilingual Project Euler Solutions

### Problem 1
>Find the sum of all the multiples of 3 or 5 below 1000. 

*C*
```c
#include <stdio.h>

int main()
{
    int sum = 0;

    for (int i = 0; i < 1000; ++i)
    {
        if (((i % 3) == 0) || ((i % 5) == 0))
            sum = i + sum;
    }

    printf("%d\n", sum); // 233168
}
```



*Elixir*
```exs
multiples = fn(n) -> (rem(n, 3) == 0) or (rem(n, 5) == 0) end

res = 1..999 
      |> Enum.filter(&(multiples.(&1))) 
      |> Enum.sum

IO.puts res # 233168
```



*Javascript*
```js
var total = 0;
for (var i = 1; i <= 999; i++) {
    if ((i % 3 == 0) || (i % 5 == 0)) {
        total = total + i;
    }
}
console.log(total); // 233168
```



*Ruby*
```rb
puts (1..999).select { |n| n % 3 == 0 or n % 5 == 0 }.reduce(:+)
# 233168
```



*Racket*
```rkt
(define (mult-of? x y)
  (= 0 (modulo x y)))

(define (mult-of-3-or-5? x)
  (or (mult-of? x 3) (mult-of? x 5)))

(println
  (foldl + 0 (filter mult-of-3-or-5? (range 1 1000)))
  ) ;233168
```



### Problem 2
>By considering the terms in the Fibonacci sequence whose values do not exceed four million, find the sum of the even-valued terms. 

*C*
```c
#include <stdio.h>

int fib(int i);
int even(int n);

int main()
{
    int i, sum, current;
    i = sum = current = 0;
    
    while (current <= 4000000)
    {
        if (current % 2 == 0)
            sum = current + sum;
        i++;
        current = fib(i);
    }

    printf("%d\n", sum); // 4613732
}

int fib(int i)
{
    int n;
    if (i == 1)
        return 1;
    else if (i == 2)
        return 2;
    else
        return fib(i-1) + fib(i-2);
}
```



*Elixir*
```exs
defmodule Euler do
  def fib(0), do: 0
  def fib(1), do: 1
  def fib(n), do: fib(n-1) + fib(n-2)
end

result = Stream.iterate(0, fn(n) -> n + 1 end)
      |> Stream.map(fn(n) -> Euler.fib(n) end) 
      |> Stream.filter(fn(x) -> rem(x, 2) == 0 end) 
      |> Stream.take_while(fn(x) -> x < 4000000 end) 
      |> Enum.sum

IO.puts result # 4613732
```



*Javascript*
```js
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
```



*Ruby*
```rb
fib = [0, 1]
while fib.last < 4_000_000
  fib.push(fib[-1]+fib[-2])
end
puts fib.select { |e| e.even? }.reduce(:+) # 4613732
```



*Racket*
```rkt
(define (fib lst n) ; n for the 'n'th in fib sequence
  (if (= n (length lst))
    lst
    (fib (cons (+ (first lst) (second lst)) lst) n)))


(define (second lst)
  (last (take lst 2)))

(define (even? x)
  (= 0 (modulo x 2)))

(define (below-4m? x)
  (< x 4000000))

(println
  (foldl + 0 (filter even? (filter below-4m? (fib (list 2 1) 100))))
  ) ; 4613732
; okay "(filter (and foo bar) list)" doesn't work it seems
```



### Problem 3
>What is the largest prime factor of the number 600851475143? 

*C*
```c
#include <stdio.h>

int factorise(long n);

int main() 
{
    int res;
    long num = 600851475143;

    res = factorise(num);
    printf("%d\n", res);
    return 0;
}

int factorise(long n) {
    int div, factor;

    div = 2; // smallest prime

    while (n > 1)
    {
        while (n % div == 0)
        {
            factor = div; // last is expected to be largest...
            n = n / div; 
        }
        div++; // ... because we are strictly incrementing
    }
    return factor; // 6857
}
```



*Elixir*
```exs
defmodule Euler do

  def factor(n) when n < 2, do: []

  def factor(n) do
    d = 2..trunc(:math.ceil(:math.sqrt(n))) # speeds things up
      |> Stream.filter(&(rem(n, &1) == 0))
      |> Enum.to_list
      |> List.first || n # if no factor found, return itself

    [d] ++ factor(trunc(n/d))
  end
end

IO.puts List.last(Euler.factor(600851475143)) # 6857
```



*Javascript*
```js
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
```



*Ruby*
```rb
def factorise(n)
  case n
  when 3
    [1, 3]
  when 5
    [1, 5]
  when 7
    [1, 7]
  else
    d = (2..Math.sqrt(n).ceil).find { |e| n % e == 0 }
    d = n if d.nil?
    [n/d, d]
  end
end

def lpf(n)
  composites = [n]
  factors = []
  until composites.empty?
    new_n, d = factorise(composites.pop)
    factors << d
    composites << new_n unless new_n == 1
  end
  factors.last
end

puts lpf(600851475143) # 6857
```



### Problem 4
>Find the largest palindrome made from the product of two 3-digit numbers. 

*C*
```c
#include <stdio.h>
#include <string.h>

int palindrome(int n);

int main()
{
    int result = -1;

    for (int i = 100; i < 1000; ++i)
    {
        for (int j = 100; j < 1000; ++j)
        {
            int temp = i*j;

            if ((palindrome(temp) == 1) && (temp > result))
                result = temp;
        }
        
    }

    printf("%d\n", result); // 906609
}

int palindrome(int n)
{
    int palindromic = 1;
    char str[10];

    sprintf(str, "%d", n);

    for (int i = 0; i < strlen(str); ++i)
    {
        if (!(str[i] == str[(strlen(str)-1)-i]))
            palindromic = 0;
    }

    return palindromic;
}
```



*Elixir*
```exs
defmodule Euler do
  
end
```



*Javascript*
```js
palindrome = function(str) {
    var pal = str.toString().split("").reverse().join("");
    return pal == str; 
};

var biggest = -1;
var result = [];

for (var i = 999; i >= 100; i--) {
    for (var j = 999; j >= 100; j--) {
        var n = i*j;
        if (palindrome(n) && n > biggest) {
            biggest = n;
            result = [i, j];
        }
    }
}

console.log('biggest: ' + biggest + ", digits: " + result);
// biggest: 906609, digits: 993,913
```



*Ruby*
```rb
def palindrome?(str)
  str === str.reverse
end

biggest = 0

(100..999).each do |i|
  (100..999).each do |j|
    biggest = i*j if palindrome?((i*j).to_s) && i*j > biggest
  end
end

puts biggest # 906609
```



### Problem 5
>What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20? 

*C*
```c
#include <stdio.h>

#define ARRAY_SIZE 20

int divisible(int val, int nums[]);

int main()
{
    int result = 21;
    int nums[ARRAY_SIZE] = {1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20};

    while (!divisible(result, nums))
        ++result;
    
    printf("%d\n", result); // 232792560
}

int divisible(int val, int nums[])
{
    for (int i = 0; i < ARRAY_SIZE; ++i)
    {
        if (val % nums[i])
            return 0; 
    }
    return 1;
}
```



*Javascript*
```js
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
```



*Ruby*
```rb
n = 20

while not ((1..20).all? { |e| n % e == 0 })
  n += 20
end

puts n # 232792560
```



### Problem 6
>Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum. 

*C*
```c
#include <stdio.h>

int main()
{
    int sum_of_sq, sq_of_sum, sum;
    sum_of_sq = sq_of_sum = sum = 0;

    for (int i = 1; i < 101; ++i)
    {
        sum += i;
        sum_of_sq += i*i;
    }

    sq_of_sum = sum*sum;

    printf("%d\n", sq_of_sum - sum_of_sq); // 25164150 
}
```



*Javascript*
```js
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
```



*Ruby*
```rb
puts ((1..100).reduce(0) { |acc, e| acc + e*e } - (1..100).reduce(:+)**2).abs 

# 25164150
```



### Problem 7
>What is the 10 001st prime number? 

*C*
```c
#include <stdio.h>

int divisible(int val, int nums[], int len);

int main()
{
    int iter = 12; // `0 % x` is a "floating point exception"
    int idx = 5; // we have primes at 0..4 already

    // only looking for 10,001 primes
    // and we have these to start with
    int arr[10001] = {2, 3, 5, 7, 11}; 

    while (idx < 10001) // zero is falsy
    {
        if(divisible(iter, arr, idx))
        {
            arr[idx] = iter;
            ++idx;
        }
        ++iter;
    }   

    printf("%d\n", arr[10000]); // 104743

}

int divisible(int val, int nums[], int len)
{
    for (int i = 0; i < len; ++i)
    {
        if (!(val % nums[i]))
            return 0; 
    }
    return 1;
}
```



*Javascript*
```js
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
```



*Ruby*
```rb
primes = [2, 3]
n = 4
while primes.length < 10001
  primes << n unless primes.any? { |e| n % e == 0 }
  n+=1
end
puts primes.last # 104743
# time ruby 7.rb  
# 3.44s user 0.13s system 91% cpu 3.911 total
# ... but it's elegant
```



### Problem 8
>Find the thirteen adjacent digits in the 1000-digit number that have the greatest product. What is the value of this product? 

*C*
```c
#include <stdio.h>

#define LENGTH 13

int char_to_i(char c);
long product(int idx, int len, char arr[]);

int main()
{
    char digits[] = "7316717653133062491922511967442657474235534919493496983520312774506326239578318016984801869478851843858615607891129494954595017379583319528532088055111254069874715852386305071569329096329522744304355766896648950445244523161731856403098711121722383113622298934233803081353362766142828064444866452387493035890729629049156044077239071381051585930796086670172427121883998797908792274921901699720888093776657273330010533678812202354218097512545405947522435258490771167055601360483958644670632441572215539753697817977846174064955149290862569321978468622482839722413756570560574902614079729686524145351004748216637048440319989000889524345065854122758866688116427171479924442928230863465674813919123162824586178664583591245665294765456828489128831426076900422421902267105562632111110937054421750694165896040807198403850962455444362981230987879927244284909188845801561660979191338754992005240636899125607176060588611646710940507754100225698315520005593572972571636269561882670428252483600823257530420752963450";

    int digits_length = sizeof(digits);

    long mx = 0;
    for (int idx = 0; idx < digits_length-LENGTH; ++idx)
    {
        long temp = product(idx, LENGTH, digits);
        if (temp > mx)
        {
            mx = temp;
        } else {
        }
    }
    printf("%ld\n", mx); // 23514624000
}

int char_to_i(char c)
{
    return c - '0';
}

long product(int idx, int len, char arr[])
{
    long res = 1;
    for (int i = idx; i < idx+len; ++i)
    {
        res = res * char_to_i(arr[i]);
    }
    return res;
}
```



*Javascript*
```js
the_number = "7316717653133062491922511967442657474235534919493496983520312774506326239578318016984801869478851843858615607891129494954595017379583319528532088055111254069874715852386305071569329096329522744304355766896648950445244523161731856403098711121722383113622298934233803081353362766142828064444866452387493035890729629049156044077239071381051585930796086670172427121883998797908792274921901699720888093776657273330010533678812202354218097512545405947522435258490771167055601360483958644670632441572215539753697817977846174064955149290862569321978468622482839722413756570560574902614079729686524145351004748216637048440319989000889524345065854122758866688116427171479924442928230863465674813919123162824586178664583591245665294765456828489128831426076900422421902267105562632111110937054421750694165896040807198403850962455444362981230987879927244284909188845801561660979191338754992005240636899125607176060588611646710940507754100225698315520005593572972571636269561882670428252483600823257530420752963450".split("");

var biggest = -1;

for (var i = 0; i < the_number.length-13; i++) {
    var arr = the_number.slice(i, i+13);
    var candidate = arr.reduce(function(sum,value) {return sum*value});
    if (candidate >= biggest) {
        biggest = candidate;
    }
}

console.log( biggest ); // 23514624000
```



*Ruby*
```rb
digits = "7316717653133062491922511967442657474235534919493496983520312774506326239578318016984801869478851843858615607891129494954595017379583319528532088055111254069874715852386305071569329096329522744304355766896648950445244523161731856403098711121722383113622298934233803081353362766142828064444866452387493035890729629049156044077239071381051585930796086670172427121883998797908792274921901699720888093776657273330010533678812202354218097512545405947522435258490771167055601360483958644670632441572215539753697817977846174064955149290862569321978468622482839722413756570560574902614079729686524145351004748216637048440319989000889524345065854122758866688116427171479924442928230863465674813919123162824586178664583591245665294765456828489128831426076900422421902267105562632111110937054421750694165896040807198403850962455444362981230987879927244284909188845801561660979191338754992005240636899125607176060588611646710940507754100225698315520005593572972571636269561882670428252483600823257530420752963450".split('').map(&:to_i)

puts digits.each_cons(13).map { |arr| arr.reduce(:*) }.max
# 23514624000
```



### Problem 9
>There exists exactly one Pythagorean triplet (a squared plus b squared equals c squared) for which _a_ + _b_ + _c_ = 1000.
>Find the product _abc_ 

*Javascript*
```js
function triplet(a, b, c) {
    if ((a*a + b*b) == c*c) {
        return true;
    } else {
        return false;
    }
}

function sums_to_100(a, b, c) {
    if (a + b + c == 1000) {
        return true;
    } else {
        return false;
    }
}

var res = -1;

for (var i = 1; i < 1000; i++) {
    for (var j = 1; j < 1000; j++) {
        for (var k = 1; k < 1000; k++) {
            if (sums_to_100(i,j,k)) {
                if (triplet(i,j,k)) {
                    console.log( i*j*k ); // 31875000
                }
            }
        }
    }
}
```



*Ruby*
```rb
1.upto(1000) { |a| 1.upto(1000) { |b| 1.upto(1000) { |c| 
  if a+b+c == 1000
    if a**2 + b**2 == c**2
      puts a * b * c
      return
    end
  end
}}}

# 31875000
# time ruby 9.rb
# 12.70s user 0.29s system 87% cpu 14.835 total
```



### Problem 10
>Find the sum of all the primes below two million. 

*Javascript*
```js
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
```



*Ruby*
```rb
def sieve_to(x)
  primes = (2..x).to_a
  
  (2..x).each do |n|
    unless n*n > x
      primes.reject! { |e| (e % n == 0) and (e > n) }
    end
  end

  primes
end

puts sieve_to(2_000_000).reduce(:+) # 142913828922
# $  time ruby 10.rb
# >  16.70s user 0.24s system 97% cpu 17.368 total
```



### Problem 11
>What is the greatest product of four adjacent numbers in the same direction (up, down, left, right, or diagonally) in the 20×20 grid? 

*Javascript*
```js
the_grid = [[08, 02, 22, 97, 38, 15, 00, 40, 00, 75, 04, 05, 07, 78, 52, 12, 50, 77, 91, 08], [49, 49, 99, 40, 17, 81, 18, 57, 60, 87, 17, 40, 98, 43, 69, 48, 04, 56, 62, 00], [81, 49, 31, 73, 55, 79, 14, 29, 93, 71, 40, 67, 53, 88, 30, 03, 49, 13, 36, 65], [52, 70, 95, 23, 04, 60, 11, 42, 69, 24, 68, 56, 01, 32, 56, 71, 37, 02, 36, 91], [22, 31, 16, 71, 51, 67, 63, 89, 41, 92, 36, 54, 22, 40, 40, 28, 66, 33, 13, 80], [24, 47, 32, 60, 99, 03, 45, 02, 44, 75, 33, 53, 78, 36, 84, 20, 35, 17, 12, 50], [32, 98, 81, 28, 64, 23, 67, 10, 26, 38, 40, 67, 59, 54, 70, 66, 18, 38, 64, 70], [67, 26, 20, 68, 02, 62, 12, 20, 95, 63, 94, 39, 63, 08, 40, 91, 66, 49, 94, 21], [24, 55, 58, 05, 66, 73, 99, 26, 97, 17, 78, 78, 96, 83, 14, 88, 34, 89, 63, 72], [21, 36, 23, 09, 75, 00, 76, 44, 20, 45, 35, 14, 00, 61, 33, 97, 34, 31, 33, 95], [78, 17, 53, 28, 22, 75, 31, 67, 15, 94, 03, 80, 04, 62, 16, 14, 09, 53, 56, 92], [16, 39, 05, 42, 96, 35, 31, 47, 55, 58, 88, 24, 00, 17, 54, 24, 36, 29, 85, 57], [86, 56, 00, 48, 35, 71, 89, 07, 05, 44, 44, 37, 44, 60, 21, 58, 51, 54, 17, 58], [19, 80, 81, 68, 05, 94, 47, 69, 28, 73, 92, 13, 86, 52, 17, 77, 04, 89, 55, 40], [04, 52, 08, 83, 97, 35, 99, 16, 07, 97, 57, 32, 16, 26, 26, 79, 33, 27, 98, 66], [88, 36, 68, 87, 57, 62, 20, 72, 03, 46, 33, 67, 46, 55, 12, 32, 63, 93, 53, 69], [04, 42, 16, 73, 38, 25, 39, 11, 24, 94, 72, 18, 08, 46, 29, 32, 40, 62, 76, 36], [20, 69, 36, 41, 72, 30, 23, 88, 34, 62, 99, 69, 82, 67, 59, 85, 74, 04, 36, 16], [20, 73, 35, 29, 78, 31, 90, 01, 74, 31, 49, 71, 48, 86, 81, 16, 23, 57, 05, 54], [01, 70, 54, 71, 83, 51, 54, 69, 16, 92, 33, 48, 61, 43, 52, 01, 89, 19, 67, 48]];

// range-checked here for convenience and readability's sake
the_grid.access = function(n, m) {
    if (n >= 0 && n <= this.length-1) {
        if (m >= 0 && m <= this[n].length-1) {
            return this[n][m];
        } else {
            throw "out of range";
        }
    }
};

// horizontal
// the_grid[x][y], the_grid[x][y+1], ...
function horizontal(n, m) {
    return the_grid.access(n,m) *
    the_grid.access(n,m+1) *
    the_grid.access(n,m+2) *
    the_grid.access(n,m+3);
}

// vertical
// the_grid[x][y], the_grid[x+1][y], ...
function vertical(n, m) {
    return the_grid.access(n,m) *
    the_grid.access(n+1,m) *
    the_grid.access(n+2,m) *
    the_grid.access(n+3,m);
}

// diagonal "backslash"
// the_grid[x][y] the_grid[x+1][y+1], ...
function backslash(n, m) {
    return the_grid.access(n,m) *
    the_grid.access(n+1,m+1) *
    the_grid.access(n+2,m+2) *
    the_grid.access(n+3,m+3);
}

// diagonal "forward slash"
// the_grid[x][y] the_grid[x+1][y-1], ...
function forward_slash(n, m) {
    return the_grid.access(n,m) *
    the_grid.access(n+1,m-1) *
    the_grid.access(n+2,m-2) *
    the_grid.access(n+3,m-3);
}

var biggest = -1;

// really should iterate through a "funcs" array applying these functions
// writing out try/catch blocks and max four times is silly
// javascript functions are first-class so i CAN do this
// i just don't know how yet 

for (var i = 0; i < the_grid.length; i++) {
    for (var j = 0; j < the_grid.length; j++) {
        try {
            var candidate = horizontal(i,j);
            if (candidate > biggest) { biggest = candidate; }
        } catch(err) { }

        try {
            var candidate = vertical(i,j);
            if (candidate > biggest) { biggest = candidate; }
        } catch(err) { }

        try {
            var candidate = backslash(i,j);
            if (candidate > biggest) { biggest = candidate; }
        } catch(err) { }

        try {
            var candidate = forward_slash(i,j);
            if (candidate > biggest) { biggest = candidate; }
        } catch(err) { }
    }
}

console.log( biggest ); // 70600674
```



*Ruby*
```rb
this_particular_grid = [[8, 2, 22, 97, 38, 15, 0, 40, 0, 75, 4, 5, 7, 78, 52, 12, 50, 77, 91, 8], [49, 49, 99, 40, 17, 81, 18, 57, 60, 87, 17, 40, 98, 43, 69, 48, 4, 56, 62, 0], [81, 49, 31, 73, 55, 79, 14, 29, 93, 71, 40, 67, 53, 88, 30, 3, 49, 13, 36, 65], [52, 70, 95, 23, 4, 60, 11, 42, 69, 24, 68, 56, 1, 32, 56, 71, 37, 2, 36, 91], [22, 31, 16, 71, 51, 67, 63, 89, 41, 92, 36, 54, 22, 40, 40, 28, 66, 33, 13, 80], [24, 47, 32, 60, 99, 3, 45, 2, 44, 75, 33, 53, 78, 36, 84, 20, 35, 17, 12, 50], [32, 98, 81, 28, 64, 23, 67, 10, 26, 38, 40, 67, 59, 54, 70, 66, 18, 38, 64, 70], [67, 26, 20, 68, 2, 62, 12, 20, 95, 63, 94, 39, 63, 8, 40, 91, 66, 49, 94, 21], [24, 55, 58, 5, 66, 73, 99, 26, 97, 17, 78, 78, 96, 83, 14, 88, 34, 89, 63, 72], [21, 36, 23, 9, 75, 0, 76, 44, 20, 45, 35, 14, 0, 61, 33, 97, 34, 31, 33, 95], [78, 17, 53, 28, 22, 75, 31, 67, 15, 94, 3, 80, 4, 62, 16, 14, 9, 53, 56, 92], [16, 39, 5, 42, 96, 35, 31, 47, 55, 58, 88, 24, 0, 17, 54, 24, 36, 29, 85, 57], [86, 56, 0, 48, 35, 71, 89, 7, 5, 44, 44, 37, 44, 60, 21, 58, 51, 54, 17, 58], [19, 80, 81, 68, 5, 94, 47, 69, 28, 73, 92, 13, 86, 52, 17, 77, 4, 89, 55, 40], [4, 52, 8, 83, 97, 35, 99, 16, 7, 97, 57, 32, 16, 26, 26, 79, 33, 27, 98, 66], [88, 36, 68, 87, 57, 62, 20, 72, 3, 46, 33, 67, 46, 55, 12, 32, 63, 93, 53, 69], [4, 42, 16, 73, 38, 25, 39, 11, 24, 94, 72, 18, 8, 46, 29, 32, 40, 62, 76, 36], [20, 69, 36, 41, 72, 30, 23, 88, 34, 62, 99, 69, 82, 67, 59, 85, 74, 4, 36, 16], [20, 73, 35, 29, 78, 31, 90, 1, 74, 31, 49, 71, 48, 86, 81, 16, 23, 57, 5, 54], [1, 70, 54, 71, 83, 51, 54, 69, 16, 92, 33, 48, 61, 43, 52, 1, 89, 19, 67, 48]]

# up and down are both checked by vertical
# left and right are both checked by horizontal
# diagonally requires two checks - forwards and backwards diagonal (think "forward-slash" and "backslash")


# I felt like solving the more general problem, of getting the greatest f() of x adjacent numbers in an n*n grid.


class Grid
  def initialize(grid)
    @grid, @width, @height = grid, grid.length, grid.first.length
  end

  def adjacents(n)
    vertical_adjacents(n) + \
    horizontal_adjacents(n) + \
    forward_diagonal_adjacents(n) + \
    backward_diagonal_adjacents(n) 
  end


  def vertical_adjacents(n)
    candidates = []
    (0...@width).each { |x|
      (0...@height-n).each { |y|
        candidates << @grid[x][y...y+n]
      }
    }
    candidates
  end

  def horizontal_adjacents(n)
    candidates = []
    (0...@width-n).each { |x|
      (0...@height).each { |y|
        candidates << @grid[x...x+n].map{|a| a[y] }
      }
    }
    candidates
  end

  def forward_diagonal_adjacents(n)
    candidates = []
    # x increases, y decreases
    (0...@width-n).each { |x|
      (n...@height).each { |y| 
        candidates << (x...x+n).zip(y.downto(y-n)).map { |e_x, e_y|
          @grid[e_x][e_y]
        }
      }
    }
    candidates
  end

  def backward_diagonal_adjacents(n)
    candidates = []
    # x increases, y increases
    (0...@width-n).each { |x|
      (0...@height-n).each { |y|
        candidates << ((x...x+n).zip(y...y+n)).map { |e_x, e_y|
          @grid[e_x][e_y]
        }
      }
    }
    candidates
  end

end


the_grid = Grid.new(this_particular_grid)
p the_grid.adjacents(4).map { |arr| arr.reduce(:*) }.max # 70600674
# for the general solution to "getting the greatest f() of x adjacent numbers in an n*n grid":
# Grid.new( <n*n grid> ).adjacents( <x> ).map { |arr| <f() of arr> }.max


# note that 
# grid.adjacents(4).max_by { |arr| arr.reduce(:*) }
# would give us the actual candidates
# and this could be fairly easily extended to include the candidates' indexes too
```



### Problem 12
>The sequence of triangle numbers is generated by adding the natural numbers.
>28 is the first triangle number to have over five divisors.
>What is the value of the first triangle number to have over five hundred divisors? 

*Javascript*
```js
var triangles = [1, 3, 6, 10, 15, 21, 28];
triangles.iterate = function() {
    this.push( this[this.length-1] + this.length+1 );
};
// this is just much more efficient than `[1..n].sum`

function divisors(n) {
    var result = [];
    var brkpt = n;
    for (var i = 1; i <= brkpt; i++) {
        if (n % i == 0) {
            result.push(i);   // if we found one factor,
            result.push(n/i); // we have found another,
            brkpt = n/i - 1;  // and we know to stop early.
        }
    }
    return result;
}

var i = 7; // start at the eighth element
var result = 0;

while(true) {
    triangles.iterate();
    var divs = divisors(triangles[triangles.length-1]);
    if (divs.length > 500) {
        console.log( triangles[triangles.length-1] ); 
        return;
    }
    i++;
}

// 76576500

// time node 12.js
// 0.35s user 0.02s system 99% cpu 0.367 total
```



### Problem 13
>Work out the first ten digits of the sum of the following one-hundred 50-digit numbers. 

*Javascript*
```js
nums = [37107287533902102798797998220837590246510135740250, 46376937677490009712648124896970078050417018260538, 74324986199524741059474233309513058123726617309629, 91942213363574161572522430563301811072406154908250, 23067588207539346171171980310421047513778063246676, 89261670696623633820136378418383684178734361726757, 28112879812849979408065481931592621691275889832738, 44274228917432520321923589422876796487670272189318, 47451445736001306439091167216856844588711603153276, 70386486105843025439939619828917593665686757934951, 62176457141856560629502157223196586755079324193331, 64906352462741904929101432445813822663347944758178, 92575867718337217661963751590579239728245598838407, 58203565325359399008402633568948830189458628227828, 80181199384826282014278194139940567587151170094390, 35398664372827112653829987240784473053190104293586, 86515506006295864861532075273371959191420517255829, 71693888707715466499115593487603532921714970056938, 54370070576826684624621495650076471787294438377604, 53282654108756828443191190634694037855217779295145, 36123272525000296071075082563815656710885258350721, 45876576172410976447339110607218265236877223636045, 17423706905851860660448207621209813287860733969412, 81142660418086830619328460811191061556940512689692, 51934325451728388641918047049293215058642563049483, 62467221648435076201727918039944693004732956340691, 15732444386908125794514089057706229429197107928209, 55037687525678773091862540744969844508330393682126, 18336384825330154686196124348767681297534375946515, 80386287592878490201521685554828717201219257766954, 78182833757993103614740356856449095527097864797581, 16726320100436897842553539920931837441497806860984, 48403098129077791799088218795327364475675590848030, 87086987551392711854517078544161852424320693150332, 59959406895756536782107074926966537676326235447210, 69793950679652694742597709739166693763042633987085, 41052684708299085211399427365734116182760315001271, 65378607361501080857009149939512557028198746004375, 35829035317434717326932123578154982629742552737307, 94953759765105305946966067683156574377167401875275, 88902802571733229619176668713819931811048770190271, 25267680276078003013678680992525463401061632866526, 36270218540497705585629946580636237993140746255962, 24074486908231174977792365466257246923322810917141, 91430288197103288597806669760892938638285025333403, 34413065578016127815921815005561868836468420090470, 23053081172816430487623791969842487255036638784583, 11487696932154902810424020138335124462181441773470, 63783299490636259666498587618221225225512486764533, 67720186971698544312419572409913959008952310058822, 95548255300263520781532296796249481641953868218774, 76085327132285723110424803456124867697064507995236, 37774242535411291684276865538926205024910326572967, 23701913275725675285653248258265463092207058596522, 29798860272258331913126375147341994889534765745501, 18495701454879288984856827726077713721403798879715, 38298203783031473527721580348144513491373226651381, 34829543829199918180278916522431027392251122869539, 40957953066405232632538044100059654939159879593635, 29746152185502371307642255121183693803580388584903, 41698116222072977186158236678424689157993532961922, 62467957194401269043877107275048102390895523597457, 23189706772547915061505504953922979530901129967519, 86188088225875314529584099251203829009407770775672, 11306739708304724483816533873502340845647058077308, 82959174767140363198008187129011875491310547126581, 97623331044818386269515456334926366572897563400500, 42846280183517070527831839425882145521227251250327, 55121603546981200581762165212827652751691296897789, 32238195734329339946437501907836945765883352399886, 75506164965184775180738168837861091527357929701337, 62177842752192623401942399639168044983993173312731, 32924185707147349566916674687634660915035914677504, 99518671430235219628894890102423325116913619626622, 73267460800591547471830798392868535206946944540724, 76841822524674417161514036427982273348055556214818, 97142617910342598647204516893989422179826088076852, 87783646182799346313767754307809363333018982642090, 10848802521674670883215120185883543223812876952786, 71329612474782464538636993009049310363619763878039, 62184073572399794223406235393808339651327408011116, 66627891981488087797941876876144230030984490851411, 60661826293682836764744779239180335110989069790714, 85786944089552990653640447425576083659976645795096, 66024396409905389607120198219976047599490197230297, 64913982680032973156037120041377903785566085089252, 16730939319872750275468906903707539413042652315011, 94809377245048795150954100921645863754710598436791, 78639167021187492431995700641917969777599028300699, 15368713711936614952811305876380278410754449733078, 40789923115535562561142322423255033685442488917353, 44889911501440648020369068063960672322193204149535, 41503128880339536053299340368006977710650566631954, 81234880673210146739058568557934581403627822703280, 82616570773948327592232845941706525094512325230608, 22918802058777319719839450180888072429661980811197, 77158542502016545090413245809786882778948721859617, 72107838435069186155435662884062257473692284509516, 20849603980134001723930671666823555245252804609722, 53503534226472524250874054075591789781264330331690
]; 

var res = nums.reduce(function(a,b){return a+b;},0); // 5.537376230390877e+51

console.log( res.toString().replace('.','').substr(0,10) ); // 5537376230

// substr is the one that takes (index,length)
```



### Problem 14
>Collatz sequence
>n is even -> n/2
>n is odd  -> 3n+1
>n is 1    -> done
>
>it is thought that all starting numbers finish at 1
>Which starting number, under one million, produces the longest chain? 

*Javascript*
```js
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
```



### Problem 15
>Starting in the top left corner of a 2×2 grid, and only being able to move to the right and down, there are exactly 6 routes to the bottom right corner.
>
>How many such routes are there through a 20×20 grid? 

*Javascript*
```js
// you can move right (R) or down (D), have to have 20 Rs and 20 Ds by the end
// so its a question of, how many different ways can I arrange 20 Rs and 20 Ds

// there are 40 moves so the nPr is 40 P 40
// there are 20 Rs so divide by 20!
// there are 20 Ds so divide by 20! again
// search term here is "permutations with repetition"


function factorial(n) {
    for (var i = n-1; i > 1; i--) {
        n *= i;
    }
    return n;
}


console.log( factorial(40) / (factorial(20)*factorial(20)) ); // 137846528820.00003

// javascript doing integer math in floating point is wild
```



### Problem 16
>

*Javascript*
```js
var res = Math.pow(2, 1000).toString().split("").reduce(function(a,b){return a + b});
console.log( res );
```



