import { bcryptAdapter } from '../../config/bcrypt.adpater';
import { JwtAdapter } from '../../config/jwt.adapter';
import { UserModel } from '../../data';
import { CustomError } from '../../domain';
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto';
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';
import { UserEntity } from '../../domain/entities/user.entity';

export class AuthService {
    constructor() {}

    public async registerUser(registerUserDto: RegisterUserDto) {
        const existUser = await UserModel.findOne({ email: registerUserDto.email });

        if (existUser) throw CustomError.badRequest('Email already exist');

        try {
            const user = new UserModel(registerUserDto);
            user.password = bcryptAdapter.hash(registerUserDto.password);

            await user.save();
            const { password, ...userRest } = UserEntity.fromObject(user);

            const token = await this.getToken({ id: userRest.id, email: userRest.email, role: userRest.role });
            if (!token) {
                throw CustomError.internalServer('Error while creating JWT');
            }
            return {
                user: userRest,
                token,
            };
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    public async registerAdmin(registerUserDto: RegisterUserDto) {
        const existUser = await UserModel.findOne({ email: registerUserDto.email });

        if (existUser) throw CustomError.badRequest('Email already exist');

        try {
            const user = new UserModel(registerUserDto);
            user.password = bcryptAdapter.hash(registerUserDto.password);
            user.role = 'ADMIN';
            await user.save();
            const { password, ...userRest } = UserEntity.fromObject(user);

            const token = await this.getToken({ id: userRest.id, email: userRest.email, role: userRest.role });
            if (!token) {
                throw CustomError.internalServer('Error while creating JWT');
            }
            return {
                user: userRest,
                token,
            };
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    public async loginUser(loginUserDto: LoginUserDto) {
        const user = await UserModel.findOne({ email: loginUserDto.email });

        if (!user) throw CustomError.badRequest('Email/passord invalid');

        const isMatching = bcryptAdapter.compare(loginUserDto.password, user.password);

        if (!isMatching) throw CustomError.badRequest('Email/passord invalid');

        const { password, ...userProp } = UserEntity.fromObject(user);

        const token = await this.getToken({ id: user.id, email: user.email, role: user.role });
        if (!token) {
            throw CustomError.internalServer('Error while creating JWT');
        }
        return {
            user: userProp,
            token,
        };
    }
    private async getToken(payload: any) {
        return await JwtAdapter.generateToken(payload);
    }
}
