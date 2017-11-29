; Find the sum of all the multiples of 3 or 5 below 1000. <<<--->>>

(define (mult-of? x y)
  (= 0 (modulo x y)))

(define (mult-of-3-or-5? x)
  (or (mult-of? x 3) (mult-of? x 5)))

(println
  (foldl + 0 (filter mult-of-3-or-5? (range 1 1000)))
  ) ;233168