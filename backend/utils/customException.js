const error = (errorCode, message, displayMessage) => {
    return {
        errorCode,
        message,
        displayMessage
    }
}

module.exports = {
    error
}