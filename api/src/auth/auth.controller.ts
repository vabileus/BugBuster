import { Controller, UseGuards, Post, Get, Body, HttpException, HttpStatus, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/entity/user.entity';
import { ApiCreatedResponse, ApiBadRequestResponse, ApiOperation } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { GetOperationId } from 'src/utils/get-operation-id.helper';
import { ApiException } from 'src/utils/api-exception.model';
import { LoginResponseDto } from './dto/login-respone.dto';
import { LoginDto } from './dto/login.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @Post('register')
    @ApiCreatedResponse({ type: User })
    @ApiBadRequestResponse({ type: ApiException })
    @ApiOperation(GetOperationId('User', 'Register'))
    async register(@Body() registerDto: RegisterDto): Promise<User> {
        const { username, password } = registerDto;

        if (!username) {
            throw new HttpException('Username is required', HttpStatus.BAD_REQUEST);
        }

        if (!password) {
            throw new HttpException('Password is required', HttpStatus.BAD_REQUEST);
        }

        let exist;

        try {
            exist = await this.usersService.findOne(username);
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (exist) {
            throw new HttpException(`${username} exists`, HttpStatus.BAD_REQUEST);
        }

        const newUser = await this.authService.register(registerDto);

        return newUser;
    }
    
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('login')
    @ApiCreatedResponse({ type: LoginResponseDto })
    @ApiBadRequestResponse({ type: ApiException })
    @ApiOperation(GetOperationId('User', 'Login'))
    async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
        const fields = Object.keys(loginDto);
        fields.forEach(field => {
            if (!loginDto[field]) {
                throw new HttpException(`${field} is required`, HttpStatus.BAD_REQUEST);
            }
        });

        return this.authService.login(loginDto);
    }
}
