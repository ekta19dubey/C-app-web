exports.getSuccessObject = (result) => {
    let response = {
        status: 200,
        message: 'success',
        data: result
    }
    return response;
};

exports.getErrorObject = (statusCode, message, data = {}) => {
    let response = {
        status: statusCode,
        message: message,
        data: data
    }
    return response;
};
