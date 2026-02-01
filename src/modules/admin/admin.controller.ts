import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminLoginDto } from './dto/admin-login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Post('login')
    @ApiOperation({ summary: 'Admin login' })
    @ApiResponse({ status: 200, description: 'Return JWT access token' })
    login(@Body() loginDto: AdminLoginDto) {
        return this.adminService.login(loginDto);
    }
}
