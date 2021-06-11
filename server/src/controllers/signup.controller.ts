import { Request, Response } from "express";
import { User, UserInterface } from "../models/user.model";
const bcrypt = require("bcrypt");

export class SignupController {
    public create(req: Request, res: Response) {
        const params: UserInterface = req.body;

        User.findAll({ where: { username: req.body.username } })
            .then((users: Array<User>) => {
                if (users.length > 0) {
                    res.status(400).send('Username taken');
                } else {
                    bcrypt.hash(String(params.password), 10)
                        .then((password) => {
                            User.create<User>({ ...params, password: password })
                                .then((user: User) => res.status(201).json(user))
                                .catch((err: Error) => { res.status(500).json(err) });
                        });
                }
            })
    }
}
