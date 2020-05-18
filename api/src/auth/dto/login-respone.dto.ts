import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entity/user.entity';

export class LoginResponseDto {
    @ApiProperty() 
    token: string;

    @ApiProperty({ type: User })
    user: Object;
}