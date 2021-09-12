module.exports = app => {
    function isNullValue(value, massege) {
        if(!value) throw massege
    }

    function isEquals(valueOne, valueTwo, messager) {
        if(valueOne !== valueTwo) throw messager
    }

    function emailVerification(email) {
        const res = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi

        if (!res.test(email)) throw "Email no formado incorreto."
    }

    return { isNullValue, isEquals, emailVerification }
}