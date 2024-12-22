import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../entities/todo.entity'; // Adjust the path as necessary

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  // Get all To-Do items
  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  // Get all To-Do items paginated
  async findAllPaginated({
    page = 1,
    limit = 10,
  }: {
    page: number;
    limit: number;
  }): Promise<{ count: number; data: Todo[] }> {
    const skip = (page - 1) * limit;
    const [results, total] = await this.todoRepository.findAndCount({
      skip,
      take: limit,
    });

    return { count: total, data: results };
  }

  // Create a new To-Do item
  async create(todo: Todo): Promise<Todo> {
    return this.todoRepository.save(todo);
  }

  async findOne(id: number): Promise<Todo> {
    return this.todoRepository.findOne({ where: { id } });
  }

  async update(id: number, todo: Todo): Promise<Todo> {
    todo.id = id;
    return this.todoRepository.save(todo);
  }

  async delete(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
