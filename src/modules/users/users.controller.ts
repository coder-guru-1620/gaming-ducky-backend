import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Will be created
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    // Usually registration is handled by AuthController, but fine to have create here for admin or internal use.
    // We'll leave it as typical CRUD.

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string): Promise<User> {
        return this.usersService.findOne(id);
    }
}
