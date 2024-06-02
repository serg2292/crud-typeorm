import { Request, Response } from "express";

export interface IUsersController {
  getAll: (req: Request, res: Response) => Promise<void>;
  register: (req: Request, res: Response) => Promise<void>;
  // getOne: (req: Request, res: Response) => Promise<void>;
  // update: (req: Request, res: Response) => Promise<void>;
  // delete: (req: Request, res: Response) => Promise<void>;
  // register: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
