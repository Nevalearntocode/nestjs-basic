import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  // A constructor is a special function that is called when a new instance of a class is created.
  constructor(
    // @InjectRepository is a decorator that is used to inject the repository into the constructor.
    @InjectRepository(User)
    // Repository<User> is a type that is used to inject the repository into the constructor.
    private readonly userRepository: Repository<User>,
  ) {}

  async register(
    username: string,
    password: string,
    rePassword: string,
  ): Promise<User> {
    if (password !== rePassword) {
      throw new Error('Passwords do not match');
    }

    const user = new User();
    user.username = username;
    user.password = password;
    return this.userRepository.save(user);
  }
}
