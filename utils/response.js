exports.resSuccess = async (response, data, status = 200) => {
    data = await changePath(data)
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

changePath = (data) => {
    let str = JSON.stringify(data)
    try {
        str = str.replace(/"path":"/g, `"path":"${process.env.CDN_URL_PREFIX + process.env.API_PREFIX}`)
        str = str.replace(/"logoPath":"/g, `"logoPath":"${process.env.CDN_URL_PREFIX + process.env.API_PREFIX}`)
        str = str.replace(/"coverPath":"/g, `"coverPath":"${process.env.CDN_URL_PREFIX + process.env.API_PREFIX}`)
        str = str.replace(/"model3d":"/g, `"model3d":"${process.env.CDN_URL_PREFIX + process.env.API_PREFIX}`)
        str = str.replace(/"boqFilePath":"/g, `"boqFilePath":"${process.env.CDN_URL_PREFIX + process.env.API_PREFIX}`)
        str = str.replace(/"quotationFilePath":"/g, `"quotationFilePath":"${process.env.CDN_URL_PREFIX + process.env.API_PREFIX}`)
        return JSON.parse(str)
    }
    catch (err) {
        console.log(err)
        return data
    }
}