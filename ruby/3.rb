# What is the largest prime factor of the number 600851475143?

def not_prime?(n)
  (2..Math.sqrt(n).ceil).any? { |e| n % e == 0 }
end

def lpf(n)
  factors = [n]
  while factors.any(&:not_prime?)
    subject = factors.delete_at(factors.index(&:not_prime?))
    
  end
end
