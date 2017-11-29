; By considering the terms in the Fibonacci sequence whose values do not exceed four million, find the sum of the even-valued terms. <<<--->>>

(define (fib x)
  (cond ((= 1 x) 1)
        ((= 2 x) 2)
        (else
          ((fib (- x 1)) (fib (- x 2))))))

(define (even? x)
  (= 0 (modulo x 2)))

