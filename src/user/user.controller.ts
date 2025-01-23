import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(
    @Body()
    {
      username,
      password,
      rePassword,
    }: {
      username: string;
      password: string;
      rePassword: string;
    },
  ) {
    return this.userService.register(username, password, rePassword);
  }
}
