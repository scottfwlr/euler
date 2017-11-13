// What is the 10 001st prime number?

#include <stdio.h>

int divisible(int val, int nums[], int len);

int main()
{
    int iter = 12; // `0 % x` is a "floating point exception"
    int idx = 5; // we have primes at 0..4 already

    // only looking for 10,001 primes
    // and we have these to start with
    int arr[10001] = {2, 3, 5, 7, 11}; 

    while (idx < 10001) // zero is falsy
    {
        if(divisible(iter, arr, idx))
        {
            arr[idx] = iter;
            ++idx;
        }
        ++iter;
    }   

    printf("%d\n", arr[10000]); // 104743

}

int divisible(int val, int nums[], int len)
{
    for (int i = 0; i < len; ++i)
    {
        if (!(val % nums[i]))
            return 0; 
    }
    return 1;
}