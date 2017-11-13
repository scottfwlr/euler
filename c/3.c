// What is the largest prime factor of the number 600851475143

#include <stdio.h>

int factorise(long n);

int main() 
{
    int res;
    long num = 600851475143;

    res = factorise(num);
    printf("%d\n", res);
    return 0;
}

int factorise(long n) {
    int div, factor;

    div = 2; // smallest prime

    while (n > 1)
    {
        while (n % div == 0)
        {
            factor = div; // last is expected to be largest...
            n = n / div; 
        }
        div++; // ... because we are strictly incrementing
    }
    return factor; // 6857
}