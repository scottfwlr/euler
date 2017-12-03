# What is the 10 001st prime number? <<<--->>>

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
