// What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?

#include <stdio.h>

#define ARRAY_SIZE 20

int divisible(int val, int nums[]);

int main()
{
	int result = 21;
	int nums[ARRAY_SIZE] = {1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20};

	while (!divisible(result, nums))
		++result;
	
	printf("%d\n", result); // 232792560
}

int divisible(int val, int nums[])
{
	for (int i = 0; i < ARRAY_SIZE; ++i)
	{
		if (val % nums[i])
			return 0; 
	}
	return 1;
}