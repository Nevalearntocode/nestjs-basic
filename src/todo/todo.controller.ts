import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from '../entities/todo.entity';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAllPaginated(
    @Param('page') page: number,
    @Param('limit') limit: number,
  ): Promise<{ count: number; data: Todo[] }> {
    return this.todoService.findAllPaginated({ page, limit });
  }

  @Post()
  async create(@Body() todo: Todo): Promise<Todo> {
    return this.todoService.create(todo);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Todo> {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() todo: Todo): Promise<Todo> {
    return this.todoService.update(id, todo);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.todoService.delete(id);
  }
}
