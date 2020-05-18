import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { User } from 'src/users/entity/user.entity';
import { compare, genSalt, hash } from 'bcryptjs';
import { LoginResponseDto } from './dto/login-respone.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './model/jwt-payload.model';
import { sign, SignOptions } from 'jsonwebtoken';
import { classToPlain } from 'class-transformer';

@Injectable()
export class AuthService {
    private readonly jwtOptions: SignOptions;
    private readonly jwtKey: string;

    constructor(
      private usersService: UsersService,
      private jwtService: JwtService
    ) {}

async validateUserLocal(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
}

async signPayload(payload: JwtPayload): Promise<string> {
    return sign(payload, this.jwtKey, this.jwtOptions);
}

async validateUser(validatePayload: JwtPayload): Promise<User> {
    return this.usersService.findOneBy({ username: validatePayload.username.toLowerCase() });
}

async register(registerDto: RegisterDto) {
    const { username, password, firstName, lastName } = registerDto;

    const user = new User();
    user.username = username.trim().toLowerCase();
    user.firstName = firstName;
    user.lastName = lastName;

    const salt = await genSalt(10);
    user.password = await hash(password, salt);

    try {
        const result = await this.usersService.save(user);
        return result;
    } catch (e) {
        throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { username, password } = loginDto;

    const user = await this.usersService.findOneBy({ username });

    if (!user) {
        throw new HttpException('Invalid crendentials', HttpStatus.NOT_FOUND);
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
        throw new HttpException('Invalid crendentials', HttpStatus.BAD_REQUEST);
    }

    const payload: JwtPayload = {
        username: user.username,
        role: user.userRole,
    };

    const token = this.jwtService.sign(payload);

    return {
        token,
        user: classToPlain(user),
    };
  }
}