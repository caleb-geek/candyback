const jwt = require('jsonwebtoken');

exports.checkToken = async (req, res, next) => {
    //Authorization: Bearer token
    const token = req.headers.authorization.split(" ")[1]
    try {
        const decodedData = await jwt.verify(token, 'RANDOM_TOKEN_SECRET')
        const userId = decodedData.userId.id
        console.log(userId)
        if (+req.params.id && +req.params.id !== userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }

    } catch (error) {
        return res.status(401).json({ error: error })

    }

}