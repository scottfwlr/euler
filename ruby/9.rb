# There exists exactly one Pythagorean triplet (a squared plus b squared equals c squared) for which _a_ + _b_ + _c_ = 1000.
# Find the product _abc_ <<<--->>>

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