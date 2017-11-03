var total = 0;
for (var i = 1; i <= 999; i++) {
	if ((i % 3 == 0) || (i % 5 == 0)) {
		total = total + i;
	}
}
console.log(total); // 233168