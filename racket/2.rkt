; By considering the terms in the Fibonacci sequence whose values do not exceed four million, find the sum of the even-valued terms. <<<--->>>

(define (fib lst n) ; n for the 'n'th in fib sequence
  (if (= n (length lst))
    lst
    (fib (cons (+ (first lst) (second lst)) lst) n)))


(define (second lst)
  (last (take lst 2)))

(define (even? x)
  (= 0 (modulo x 2)))

(define (below-4m? x)
  (< x 4000000))

(println
  (foldl + 0 (filter (and even? below-4m?) (fib (list 2 1) 100)))
  ) ; 9227463
; something is very wrong here