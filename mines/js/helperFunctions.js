function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function toggleState(state) {
    if (typeof state === "string") {
        if (state === "false" || state === "False" || state === "FALSE") {
            return true;
        }
        return false;
    }
    return (state ? false : true);
}

//formats the number as a string with leading zeros to fulfill the number of places
function formatNumber(num, places) {
    var strNum = num.toString();
    if (strNum.length >= places) {
        return strNum;
    }
    else {
        var leadingZeros = places - strNum.length;
        var str = "";
        for (var i = 0; i < leadingZeros; i++) {
            str += "0";
        }
        str += strNum;
        return str;
    }
}