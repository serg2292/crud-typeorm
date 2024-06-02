import { UserRegisterDto } from "../dto/user.register.dto";
import { UserUpdateDto } from "../dto/user.update.dto";
import { User } from "../entity/users.entity";

export interface IUserService {
  getAllUsers: () => Promise<User[] | null>;
  getUserById: (id: number) => Promise<User | null>;
  createUser: (dto: UserRegisterDto) => Promise<User | null>;
  updateUser: (dto: UserUpdateDto) => Promise<User | null>;
  deleteUser: (id: number) => Promise<boolean | null>;
}
