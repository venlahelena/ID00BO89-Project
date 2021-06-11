import { Request, Response } from "express";
import { Blog, BlogInterface } from "../models/blog.model";
import { UpdateOptions, DestroyOptions } from "sequelize";

import getAuth from "../middlewares/auth.middleware";

export class BlogsController {

    public index(req: Request, res: Response) {
        Blog.findAll<Blog>({})
            .then((blogs: Array<Blog>) => res.json(blogs))
            .catch((err: Error) => res.status(500).json(err));
    }

    public create(req: Request, res: Response) {
        const params: BlogInterface = req.body;

        let authUser: number = getAuth(req);

        /* Check that blog is being created with authorized user_id */
        if (params.user_id !== authUser) {
            res.status(401).end();
        } else {
            Blog.create<Blog>(params)
                .then((blog: Blog) => res.status(201).json(blog))
                .catch((err: Error) => res.status(500).json(err));
        }
    }

    public show(req: Request, res: Response) {
        const id: number = req.params.id;

        Blog.findByPk<Blog>(id)
            .then((blog: Blog | null) => {
                if (blog) {
                    res.json(blog);
                } else {
                    res.status(404).json({ errors: ["Blog not found"] });
                }
            })
            .catch((err: Error) => res.status(500).json(err));
    }

    public update(req: Request, res: Response) {
        const id: number = req.params.id;
        const params: BlogInterface = req.body;
        let authUser: number = getAuth(req);

        /* Railroad user_id in SQL query options to allow selection of only own blogs */
        const update: UpdateOptions = {
            where: { id: id, user_id: authUser },
            limit: 1,
        };

        if (authUser === null) {
            res.status(401).end();
        } else {
            Blog.update(params, update)
                .then(() => res.status(202).json({ data: "success" }))
                .catch((err: Error) => res.status(500).json(err));
        }
    }

    public delete(req: Request, res: Response) {
        const id: number = req.params.id;
        let authUser: number = getAuth(req);

        /* Railroad user_id in SQL query options to allow selection of only own blogs */
        const options: DestroyOptions = {
            where: { id: id, user_id: authUser },
            limit: 1,
        };

        if (authUser === null) {
            res.status(401).end();
        } else {
            Blog.destroy(options)
                .then(() => res.status(204).json({ data: "success" }))
                .catch((err: Error) => res.status(500).json(err));
        }
    }
}
