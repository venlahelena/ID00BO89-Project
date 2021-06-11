import { Request, Response } from "express";
import { DefaultController } from "../controllers/default.controller";
import { UsersController } from "../controllers/users.controller";
import { BlogsController } from "../controllers/blogs.controller";
import { CommentsController } from "../controllers/comments.controller";
import { LoginController } from "../controllers/login.controller";
import { SignupController } from "../controllers/signup.controller";
export class Routes {
    public defaultController: DefaultController = new DefaultController();
    public usersController: UsersController = new UsersController();
    public blogsController: BlogsController = new BlogsController();
    public commentsController: CommentsController = new CommentsController();
    public loginController: LoginController = new LoginController();
    public signupController: SignupController = new SignupController();

    public routes(app): void {
        app.route("/").get(this.defaultController.index);
        app.route("/login")
            .post(this.loginController.create);
        app.route("/signup")
            .post(this.signupController.create);
        app.route("/users")
            .get(this.usersController.index)
            .post(this.usersController.create);
        app.route("/users/:id")
            .get(this.usersController.show)
            .put(this.usersController.update)
            .delete(this.usersController.delete);
        app.route("/blogs")
            .get(this.blogsController.index)
            .post(this.blogsController.create);
        app.route("/blogs/:id")
            .get(this.blogsController.show)
            .put(this.blogsController.update)
            .delete(this.blogsController.delete);
        app.route("/comments")
            .get(this.commentsController.index)
            .post(this.commentsController.create);
        app.route("/comments/:id")
            .get(this.commentsController.show)
            .put(this.commentsController.update)
            .delete(this.commentsController.delete);
    }
}
