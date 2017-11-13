# Find the sum of all the multiples of 3 or 5 below 1000.
puts 1..999.select { |n| n % 3 == 0 or n % 5 == 0 }.reduce(:+)