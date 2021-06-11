import { Request } from "express";
import * as jwt from "jsonwebtoken";

const getAuth = (req: Request): number => {

    if ('authorization' in req.headers) {

        try {
            const token = req.headers.authorization.split(' ')[1];

            let authorized = jwt.verify(token, process.env.JWTSECRET, (error, decoded) => {
                return Number(decoded.id);
            });

            return authorized;
        } catch (error) {
            console.log(error);
            return null;
        }

    } else {
        return null;
    }
};

export default getAuth;
