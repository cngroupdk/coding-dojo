var assert = require('assert');
var _ = require('underscore');

var NAN = 'Not a number';

var basic = {
    0: NAN,
    1: 'I',
    5: 'V',
//    9: 'IX',
    10: 'X',
    50: 'D'
};

function findNearestHigherBasic(arabic) {
    if (arabic >= 5) {
        return 10;
    }
    return 5;
}

function toRoman(arabic) {
    if (basic[arabic]) {
        return basic[arabic];
    }

    if (arabic > 10) {
        return toRoman(10) + toRoman(arabic - 10);
    }
    if (arabic > 5) {
        if (arabic + 1 == findNearestHigherBasic(5)) {
            return "I" + toRoman(findNearestHigherBasic(5));
        }
        return toRoman(5) + toRoman(arabic - 5);
    }
    if (arabic > 1) {
        if (arabic > 3*1) {
            var nearestHigherBasic = findNearestHigherBasic(arabic);
            return toRoman(nearestHigherBasic - arabic) + toRoman(nearestHigherBasic);
        }

        return toRoman(1) + toRoman(arabic - 1);
    }

    return NAN;
}

assert(toRoman() === NAN);
assert(toRoman(0) === NAN);
assert(toRoman(1) === 'I', 1);
assert(toRoman(2) === 'II');
assert(toRoman(3) === 'III');
assert(toRoman(4) === 'IV');
assert(toRoman(5) === 'V');
assert(toRoman(6) === 'VI');
assert(toRoman(7) === 'VII');
assert(toRoman(8) === 'VIII');
assert(toRoman(9) === 'IX', toRoman(9));
assert(toRoman(10) === 'X', 10);
assert(toRoman(11) === 'XI', 11);
assert(toRoman(12) === 'XII', 12);
assert(toRoman(13) === 'XIII');
assert(toRoman(14) === 'XIV');
assert(toRoman(15) === 'XV');
assert(toRoman(20) === 'XX');
assert(toRoman(21) === 'XXI');
assert(toRoman(50) === 'D');
assert(findNearestHigherBasic(4) === 5)
assert(findNearestHigherBasic(8) === 10)