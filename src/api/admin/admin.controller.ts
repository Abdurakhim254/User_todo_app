import { Controller, Get,  Body, Param, Delete, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  findAll() {
    return this.adminService.findAll();
  }

  @Get('users/:id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Put('users/:id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete('users/:id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
