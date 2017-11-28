# Find the sum of all the multiples of 3 or 5 below 1000. <<<--->>>

multiples = fn(n) -> (rem(n, 3) == 0) or (rem(n, 5) == 0) end

res = 1..999 
      |> Enum.filter(&(multiples.(&1))) 
      |> Enum.sum

IO.puts res # 233168