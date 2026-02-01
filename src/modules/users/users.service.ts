import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const existingUser = await this.usersRepository.findOne({
            where: { email: createUserDto.email }
        });
        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        const user = this.usersRepository.create(createUserDto);
        // Note: Password hashing should be done here or in a subscriber. 
        // For this setup, we will handle it in Auth service or here if we want strictly separated concerns.
        // However, usually register logic goes through Auth service which calls User service.
        // We will save it as raw here, but the Auth module will hash it before calling create 
        // OR we hash it here. Let's hash it here in a real app, but for now we follow the structure.
        return this.usersRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(id: string): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.usersRepository.findOne({
            where: { email },
            select: ['id', 'email', 'name', 'password', 'createdAt', 'updatedAt']
        });
    }
}
