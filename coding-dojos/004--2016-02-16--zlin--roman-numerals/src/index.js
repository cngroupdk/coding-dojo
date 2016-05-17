function convert(roman) {
    var literals = {
        'V': 5,
        'X': 10
    };
    var lastCharacter = roman[roman.length - 1];
    var lastCharacterValue = literals[lastCharacter];
    var firstCharacter = roman[0];
    var firstCharacterValue = literals[firstCharacter];
    var restCharacters = roman.slice(1);

    if (firstCharacterValue) {
        var returnValue = firstCharacterValue;
        if (restCharacters === 'VIII'
            || (lastCharacterValue && roman.length > 1)) {
                returnValue += convert(restCharacters);
        } else {
            returnValue += restCharacters.length;
        }
        return returnValue;
    }

    var temp = roman.length + 1;
    if (lastCharacterValue) {
        temp = lastCharacterValue;
    }

    if (firstCharacter === 'I') {
        temp = temp - 1;
    }

    return temp;
}
