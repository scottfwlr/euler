# By considering the terms in the Fibonacci sequence whose values do not exceed four million, find the sum of the even-valued terms.

fib = [0, 1]
while fib.last < 4_000_000
  fib.push(fib[-1]+fib[-2])
end
puts fib.select { |e| e.even? }.reduce(:+) # 4613732