var res = Math.pow(2, 1000).toString().split("").reduce(function(a,b){return a + b});
console.log( res );