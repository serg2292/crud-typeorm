import typeormService from "../../../database/typeorm.service";
import { UserRegisterDto } from "../dto/user.register.dto";
import { UserUpdateDto } from "../dto/user.update.dto";
import { User } from "../entity/users.entity";
import { IUserService } from "./users.service.interface";

const usersRepository = typeormService.dataSource.getRepository(User);

class UsersService implements IUserService {
  async getAllUsers() {
    try {
      const users = await usersRepository.find();
      return users;
    } catch (error: any) {
      throw new Error("Failed to fetch users: " + error.message);
    }
  }

  async createUser({ name, email, password }: UserRegisterDto) {
    try {
      const newUser = new User();
      newUser.name = name;
      newUser.email = email;
      newUser.password = password;
      await usersRepository.save(newUser);
      return newUser;
    } catch (error: any) {
      throw new Error("Failed to create user: " + error.message);
    }
  }

  async getUserById(id: number) {
    try {
      const user = await usersRepository.findOneBy({ id });
      return user;
    } catch (error: any) {
      throw new Error("Failed to fetch user: " + error.message);
    }
  }

  async updateUser({ id, email, password, name }: UserUpdateDto) {
    try {
      const user = await usersRepository.findOneBy({ id });
      if (!user) {
        return null;
      }
      user.email = email;
      user.password = password;
      user.name = name;
      return await usersRepository.save(user);
    } catch (error: any) {
      throw new Error("Failed to update user: " + error.message);
    }
  }

  async deleteUser(id: number) {
    try {
      const result = await usersRepository.delete(id);
      return result.affected !== 0;
    } catch (error: any) {
      throw new Error("Failed to delete user: " + error.message);
    }
  }
}

export default new UsersService();
