import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '@/common/prisma';
@Injectable()
export class TasksService {
  constructor (
    private readonly prismaService: PrismaService
  ){}
  async create(createTaskDto: CreateTaskDto) {
    const task=await this.prismaService.tasks.create({data:createTaskDto});
    return {
      message:'Task created successfully',
      data:task
    };
  }

  async findAll() {
    const task=await this.prismaService.tasks.findMany();
    if(task.length>0){
      return {
        message:'Tasks found successfully',
        data:task
      };
    }
    return {
      message:'No tasks found',
      data:[]
    };
  }

  async findOne(id: number) {
    const task=await this.prismaService.tasks.findUnique({where:{id}});
    if(task){
      return {
        message:'Task found successfully',
        data:task
      };
    }
    return {
      message:'No task found',
      data:[]
    };
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task=await this.prismaService.tasks.findUnique({where:{id}});
    if(task){
      const updatedTask=await this.prismaService.tasks.update({where:{id},data:updateTaskDto});
      return {
        message:'Task updated successfully',
        data:updatedTask
      };
    }
    return {
      message:'No task found',
      data:[]
    };
  }

  async remove(id: number) {
    const task=await this.prismaService.tasks.findUnique({where:{id}});
    if(task){
      const deletedTask=await this.prismaService.tasks.delete({where:{id}});
      return {
        message:'Task deleted successfully',
        data:deletedTask
      };
    }
    return {
      message:'No task found',
      data:[]
    };
  }
}
