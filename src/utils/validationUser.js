module.exports = app => {
    function isNullValue(value, massege) {
        if(!value) throw massege
    }

    function isEquals(valueOne, valueTwo, messager) {
        if(valueOne !== valueTwo) throw messager
    }

    return { isNullValue, isEquals }
}