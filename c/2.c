// By considering the terms in the Fibonacci sequence whose values do not exceed four million, find the sum of the even-valued terms.

#include <stdio.h>

int fib(int i);
int even(int n);

int main()
{
	int i, sum, current;
	i = sum = current = 0;
	
	while (current <= 4000000)
	{
		if (current % 2 == 0)
			sum = current + sum;
		i++;
		current = fib(i);
	}

	printf("%d\n", sum); // 4613732
}

int fib(int i)
{
	int n;
	if (i == 1)
		return 1;
	else if (i == 2)
		return 2;
	else
		return fib(i-1) + fib(i-2);
}
