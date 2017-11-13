// Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.

#include <stdio.h>

int main()
{
    int sum_of_sq, sq_of_sum, sum;
    sum_of_sq = sq_of_sum = sum = 0;

    for (int i = 1; i < 101; ++i)
    {
        sum += i;
        sum_of_sq += i*i;
    }

    sq_of_sum = sum*sum;

    printf("%d\n", sq_of_sum - sum_of_sq); // 25164150 
}