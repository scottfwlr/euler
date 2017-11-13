# multilingual projecteuler

### description

Solving and re-solving questions in multiple programming languages to get my fingers used to them. Avoiding just re-implementing my first solution in new syntax, instead aiming for idiomatic fashion, taking advantage of the language's strengths and compensating for its weaknesses.

### TODO:

#### compare.??

Quick script to grab each solution for a given problem and output a markdown document with them right next to each other. Ideally, using github syntax highlighting e.g.:

*Ruby*
```
(1..999).select { |n| n % 3 == 0 or n % 5 == 0 }.reduce(:+)
```

vs


*Ruby*
```ruby
(1..999).select { |n| n % 3 == 0 or n % 5 == 0 }.reduce(:+)
```

