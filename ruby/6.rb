# Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum. <<<--->>>

puts ((1..100).reduce(0) { |acc, e| acc + e*e } - (1..100).reduce(:+)**2).abs 

# 25164150