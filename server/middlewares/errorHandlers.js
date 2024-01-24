function errorHandlers(error, req, res, next) {
    console.log(error)
    let statusCode = 500
    let message = 'Internal server error'
    switch (error.name) {
        case 'SequelizeValidationError':
        case 'SequelizeUniqueConstraintError':
            statusCode = 400
            message = error.errors[0].message
            break
        case 'emailRequired':
            statusCode = 400
            message = 'Email is required'
            break
        case 'passwordRequired':
            statusCode = 400
            message = 'Password is required'
            break
        case 'inputYourAmount':
            statusCode = 400
            message = 'Input your amount!'
            break;
        case 'invalidProductId':
            statusCode = 400
            message = 'Invalid product id'
            break;
        case 'productSold':
            statusCode = 403
            message = "Product is already sold"
            break
        case 'invalidUser':
            statusCode = 401
            message = "Invalid email/password"
            break
        case 'invalidToken':
            statusCode = 401
            message = "Invalid token"
            break
        case 'productNotFound':
            statusCode = 404
            message = "Product Not Found"
            break
        case 'errorNotFound':
            statusCode = 404
            message = "Not Found!"
            break
    }
    res.status(statusCode).json({ message })
}

module.exports = errorHandlers