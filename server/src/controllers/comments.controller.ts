import { Request, Response } from "express";
import { Comment, CommentInterface } from "../models/comment.model";
import { UpdateOptions, DestroyOptions } from "sequelize";

import getAuth from "../middlewares/auth.middleware";

export class CommentsController {

    public index(req: Request, res: Response) {
        Comment.findAll<Comment>({})
            .then((comments: Array<Comment>) => res.json(comments))
            .catch((err: Error) => res.status(500).json(err));
    }

    public create(req: Request, res: Response) {
        const params: CommentInterface = req.body;

        let authUser: number = getAuth(req);

        /* Check that comment is being created with authorized user_id */
        if (params.user_id !== authUser) {
            res.status(401).end();
        } else {
            Comment.create<Comment>(params)
                .then((comment: Comment) => res.status(201).json(comment))
                .catch((err: Error) => res.status(500).json(err));
        }
    }

    public show(req: Request, res: Response) {
        const id: number = req.params.id;

        Comment.findByPk<Comment>(id)
            .then((comment: Comment | null) => {
                if (comment) {
                    res.json(comment);
                } else {
                    res.status(404).json({ errors: ["Comment not found"] });
                }
            })
            .catch((err: Error) => res.status(500).json(err));
    }

    public update(req: Request, res: Response) {

        const id: number = req.params.id;
        const params: CommentInterface = req.body;
        let authUser: number = getAuth(req);

        /* Railroad user_id in SQL query options to allow selection of only own comments */
        const update: UpdateOptions = {
            where: { id: id, user_id: authUser },
            limit: 1,
        };

        if (authUser === null) {
            res.status(401).end();
        } else {
            Comment.update(params, update)
                .then(() => res.status(202).json({ data: "success" }))
                .catch((err: Error) => res.status(500).json(err));
        }
    }

    public delete(req: Request, res: Response) {
        const id: number = req.params.id;
        let authUser: number = getAuth(req);

        /* Railroad user_id in SQL query options to allow selection of only own comments */
        const options: DestroyOptions = {
            where: { id: id, user_id: authUser },
            limit: 1,
        };

        if (authUser === null) {
            res.status(401).end();
        } else {
            Comment.destroy(options)
                .then(() => res.status(204).json({ data: "success" }))
                .catch((err: Error) => res.status(500).json(err));
        }
    }
}
