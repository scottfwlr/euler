# By considering the terms in the Fibonacci sequence whose values do not exceed four million, find the sum of the even-valued terms. <<<--->>>

defmodule Euler do
  def fib(0), do: 0
  def fib(1), do: 1
  def fib(n), do: fib(n-1) + fib(n-2)
end

result = Stream.iterate(0, fn(n) -> n + 1 end)
      |> Stream.map(fn(n) -> Euler.fib(n) end) 
      |> Stream.filter(fn(x) -> rem(x, 2) == 0 end) 
      |> Stream.take_while(fn(x) -> x < 4000000 end) 
      |> Enum.sum

IO.puts result # 4613732