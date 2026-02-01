import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Admin } from './entities/admin.entity';
import { AdminLoginDto } from './dto/admin-login.dto';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private adminRepository: Repository<Admin>,
        private jwtService: JwtService,
    ) { }

    async login(loginDto: AdminLoginDto) {
        const admin = await this.adminRepository.findOne({
            where: { username: loginDto.username },
            select: ['id', 'username', 'password', 'currentToken'], // Explicitly select hidden fields
        });

        if (!admin || !(await bcrypt.compare(loginDto.password, admin.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { username: admin.username, sub: admin.id, role: 'admin' };
        const token = this.jwtService.sign(payload);

        // Save token to DB to enforce simple session/invalidation
        admin.currentToken = token;
        await this.adminRepository.save(admin);

        return {
            access_token: token,
        };
    }

    async validateTokenInDb(userId: string, token: string): Promise<boolean> {
        const admin = await this.adminRepository.findOne({
            where: { id: userId },
            select: ['currentToken'],
        });

        if (!admin) return false;
        return admin.currentToken === token;
    }

    async createInitialAdmin(username: string, pass: string) {
        const existing = await this.adminRepository.findOne({ where: { username } });
        if (existing) return;

        const hashedPassword = await bcrypt.hash(pass, 10);
        const admin = this.adminRepository.create({
            username,
            password: hashedPassword,
        });
        return this.adminRepository.save(admin);
    }
}
