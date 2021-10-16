exports.resSuccess = async (response, data, status = 200) => {
    const responseData = {
        status,
        message: 'success',
        data
    }
    return response.status(status).send(responseData);
}

exports.resError = function (response, message, status = 422) {
    if (typeof message === 'string') {
        message = { msg: message }
    }
    const responseData = { status, error: message }
    return response.status(status).send(responseData)
}