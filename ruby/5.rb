# What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?

n = 20

while not ((1..20).all? { |e| n % e == 0 })
  n += 20
end

puts n # 232792560