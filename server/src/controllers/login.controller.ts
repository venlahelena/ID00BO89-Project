import { Request, Response } from "express";
import { User, UserInterface } from "../models/user.model";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
import "dotenv/config";

export class LoginController {
    public create(req: Request, res: Response) {
        const params: UserInterface = req.body;

        User.findOne({ where: { username: params.username } })
            .then(((user) => {
                bcrypt.compare(params.password, user.password, (error, result) => {
                    if (result === true) {
                        const token = jwt.sign(JSON.stringify(user), process.env.JWTSECRET);
                        res.status(200).json({ auth: token, ...user.get({ plain: true }), password: null });
                    } else {
                        res.status(401).end();
                    }
                })
            }))
            .catch((err: Error) => { res.status(500).json(err) });
    }
}
