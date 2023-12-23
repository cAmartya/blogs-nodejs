import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "AMAZING PROJECT";

const chkuser = (req, res, next) => {
    // const token = req.header("auth-token");
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;    
    if(!token)
        res.status(401).send({error : "Authentication token can't be empty. Not Signed In."})
    
    try {
        if(token && isCustomAuth)   {
            decodedData = jwt.verify(token, JWT_SECRET_KEY);
            req.userId = decodedData?.id;
            req.userName = decodedData?.userName;
        }else   {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
            req.userName = decodedData?.userName;
        }

        next();
    } catch (error) {
        console.log(error)
        res.status(401).send({error : "Invalid Authentication token"})    
    }
}

export default chkuser;