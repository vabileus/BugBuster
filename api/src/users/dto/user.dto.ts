import { Exclude, Expose } from 'class-transformer';
import { IsString, IsInt } from 'class-validator';

@Exclude()
export class UserDto {
    @Expose()
    @IsInt()
    readonly id: number;

    @Expose()
    @IsString()
    readonly firstName: string;

    @Expose()
    @IsString()
    readonly lastName: string;

    @Expose()
    @IsString()
    readonly projectUserRole: string;
}