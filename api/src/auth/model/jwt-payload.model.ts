import { UserRole } from 'src/users/model/user-role.enum';

export interface JwtPayload {
    username: string;
    role: UserRole;
    iat?: Date;
}