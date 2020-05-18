import { ApiPropertyOptional } from '@nestjs/swagger';
import { LoginDto } from './login.dto';

export class RegisterDto extends LoginDto {
    @ApiPropertyOptional({ example: 'John' })
    firstName?: string;

    @ApiPropertyOptional({ example: 'Doe' })
    lastName?: string;
}