var jwt = require('jsonwebtoken');


const auth = async (req, res, next) => {
    try {
        //let authorization = localStorage.getItem("token")
        let authorization = req.headers.authorization.split(" ")[1]
        if (authorization) {
            var decoded = jwt.verify(authorization, 'charlie');
            if (decoded) {
                let id=decoded.id;
                req.body.userID=id
                next()
            } else {
                res.send({ err: "please login first" })
            }
        } else {
            res.send({ err: "please login first" })
        }

    } catch (error) {
        res.send({ err: "please login first" })
    }


}

module.exports = { auth }

