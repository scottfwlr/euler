# What is the largest prime factor of the number 600851475143?

defmodule Euler do

  def factor(n) when n < 2, do: []

  def factor(n) do
    d = 2..trunc(:math.ceil(:math.sqrt(n))) # speeds things up
      |> Stream.filter(&(rem(n, &1) == 0))
      |> Enum.to_list
      |> List.first || n # if no factor found, return itself

    [d] ++ factor(trunc(n/d))
  end
end

IO.puts List.last(Euler.factor(600851475143)) # 6857