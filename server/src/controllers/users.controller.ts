import { Request, Response } from "express";
import { User, UserInterface } from "../models/user.model";
import { UpdateOptions, DestroyOptions } from "sequelize";
import { jwt } from "jsonwebtoken";
import { bcrypt } from "bcrypt";

export class UsersController {
    public index(req: Request, res: Response) {
        User.findAll<User>({
            attributes: ["id", "username", "createdAt", "updatedAt"],
        })
            .then((users: Array<User>) => res.json(users))
            .catch((err: Error) => res.status(500).json(err));
    }
    public create(req: Request, res: Response) {

        /* All users table manipulations are done via signup, users route will respond 403 Forbidden */
        res.status(403).end();

        const params: UserInterface = req.body;

        User.create<User>(params)
            .then((user: User) => res.status(201).json(user))
            .catch((err: Error) => res.status(500).json(err));
    }
    public show(req: Request, res: Response) {
        const id: number = req.params.id;

        User.findByPk<User>(id)
            .then((user: User | null) => {
                if (user) {
                    res.json(user);
                } else {
                    res.status(404).json({ errors: ["User not found"] });
                }
            })
            .catch((err: Error) => res.status(500).json(err));
    }
    public update(req: Request, res: Response) {

        /* All users table manipulations are done via signup, users route will respond 403 Forbidden */
        res.status(403).end();

        const id: number = req.params.id;
        const params: UserInterface = req.body;

        const update: UpdateOptions = {
            where: { id: id },
            limit: 1,
        };

        User.update(params, update)
            .then(() => res.status(202).json({ data: "success" }))
            .catch((err: Error) => res.status(500).json(err));
    }
    public delete(req: Request, res: Response) {

        /* All users table manipulations are done via signup, users route will respond 403 Forbidden */
        res.status(403).end();

        const id: number = req.params.id;
        const options: DestroyOptions = {
            where: { id: id },
            limit: 1,
        };

        User.destroy(options)
            .then(() => res.status(204).json({ data: "success" }))
            .catch((err: Error) => res.status(500).json(err));
    }
    public authenticate(req: Request, res: Response) {}
}
