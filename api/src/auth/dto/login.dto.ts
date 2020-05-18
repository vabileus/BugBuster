import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ required: true, minLength: 6 })
    username: string;

    @ApiProperty({ required: true, minLength: 6, type: String, format: 'password' })
    password: string;
}