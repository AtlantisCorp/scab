import jsonwebtoken from 'jsonwebtoken'

export default function (req, res, next) {
    const authHeader = req.headers['Authorization']

    if (!authHeader) {
        res.status(401).send('Error: no Authorization header found.')
        return 
    }

    const [ bearer, token ] = authHeader.split(' ')

    if (bearer.toLowerCase() !== 'bearer') {
        res.status(400).send('Error: Bearer is not a Bearer.')
        return 
    }

    if (!token) {
        res.status(401).send('Error: no token found.')
        return 
    }

    jsonwebtoken.verify(token, process.env['jsonWebTokenSecret'], (err, payload) => {
        if (err) {
            res.status(401).send('Error: cannot authorize and verify JSONWebToken.')
            return 
        }

        req.userId = payload.userId 
        next()
    })
}