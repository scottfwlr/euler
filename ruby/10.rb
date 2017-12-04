# Find the sum of all the primes below two million. <<<--->>>


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