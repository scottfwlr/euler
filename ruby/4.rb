# Find the largest palindrome made from the product of two 3-digit numbers.

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