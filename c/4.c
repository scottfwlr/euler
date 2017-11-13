// Find the largest palindrome made from the product of two 3-digit numbers
#include <stdio.h>
#include <string.h>

int palindrome(int n);

int main()
{
    int result = -1;

    for (int i = 100; i < 1000; ++i)
    {
        for (int j = 100; j < 1000; ++j)
        {
            int temp = i*j;

            if ((palindrome(temp) == 1) && (temp > result))
                result = temp;
        }
        
    }

    printf("%d\n", result); // 906609
}

int palindrome(int n)
{
    int palindromic = 1;
    char str[10];

    sprintf(str, "%d", n);

    for (int i = 0; i < strlen(str); ++i)
    {
        if (!(str[i] == str[(strlen(str)-1)-i]))
            palindromic = 0;
    }

    return palindromic;
}