# What is the largest prime factor of the number 600851475143? <<<--->>>

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