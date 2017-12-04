// There exists exactly one Pythagorean triplet (a squared plus b squared equals c squared) for which _a_ + _b_ + _c_ = 1000.
// Find the product _abc_ <<<--->>>

function triplet(a, b, c) {
    if ((a*a + b*b) == c*c) {
        return true;
    } else {
        return false;
    }
}

function sums_to_100(a, b, c) {
    if (a + b + c == 1000) {
        return true;
    } else {
        return false;
    }
}

var res = -1;

for (var i = 1; i < 1000; i++) {
    for (var j = 1; j < 1000; j++) {
        for (var k = 1; k < 1000; k++) {
            if (sums_to_100(i,j,k)) {
                if (triplet(i,j,k)) {
                    console.log( i*j*k ); // 31875000
                }
            }
        }
    }
}

