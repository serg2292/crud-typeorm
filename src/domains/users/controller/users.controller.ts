import { Request, Response } from "express";
import { IUsersController } from "./users.controller.interface";
import { BaseController } from "../../../common/controller/base.controller";
import { IControllerRoute } from "../../../common/controller/route.interface";
import usersService from "../service/users.service";
import { UserRegisterDto } from "../dto/user.register.dto";
import { UserUpdateDto } from "../dto/user.update.dto";

class UsersController extends BaseController implements IUsersController {
  private routes: IControllerRoute[] = [
    {
      path: "/",
      method: "get",
      func: this.getAll,
    },
    {
      path: "/",
      method: "post",
      func: this.register,
    },
    {
      path: "/:id",
      method: "get",
      func: this.getOne,
    },
    {
      path: "/:id",
      method: "put",
      func: this.update,
    },
    {
      path: "/:id",
      method: "delete",
      func: this.delete,
    },
  ];

  constructor() {
    super();
    this.bindRoutes(this.routes);
  }

  async getAll(_: Request, res: Response): Promise<any> {
    try {
      const users = await usersService.getAllUsers();
      return res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async register(
    { body }: Request<{}, {}, UserRegisterDto>,
    res: Response
  ): Promise<void> {
    if (!body.name || !body.email || !body.password) {
      res
        .status(400)
        .json({ message: "Name, email, and password are required" });
      return;
    }
    try {
      const newUser = await usersService.createUser(body);
      res.json(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getOne(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id, 10);
      const user = await usersService.getUserById(userId);

      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { params, body } = req;
      const userId = parseInt(params.id, 10);
      const updatedUser = await usersService.updateUser({
        id: userId,
        ...body,
      });

      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id, 10);
      const result = await usersService.deleteUser(userId);
      res.json(result);
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default new UsersController();
