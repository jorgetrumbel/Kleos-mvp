import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RolUsuario, Usuario } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    const email = registerDto.email.toLowerCase();
    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const passwordHash = await bcrypt.hash(registerDto.password, 12);

    const user = await this.prisma.$transaction(async (tx) => {
      const createdUser = await tx.usuario.create({
        data: {
          email,
          passwordHash,
          nombre: registerDto.nombre,
          apellido: registerDto.apellido,
          rol: registerDto.role,
        },
      });

      if (registerDto.role === RolUsuario.coach) {
        await tx.coach.create({
          data: {
            usuarioId: createdUser.id,
            codigoVinculacion: this.generateCoachLinkCode(),
          },
        });
      }

      if (registerDto.role === RolUsuario.atleta) {
        await tx.atleta.create({
          data: {
            usuarioId: createdUser.id,
          },
        });
      }

      return createdUser;
    });

    return this.buildAuthResponse(user);
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(
      loginDto.email.toLowerCase(),
    );

    if (!user || !user.activo) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(
      loginDto.password,
      user.passwordHash,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.buildAuthResponse(user);
  }

  async me(userId: string) {
    const user = await this.usersService.findById(userId);

    if (!user || !user.activo) {
      throw new UnauthorizedException('Invalid session');
    }

    return this.toAuthUser(user);
  }

  private async buildAuthResponse(user: Usuario) {
    return {
      user: this.toAuthUser(user),
      accessToken: await this.signAccessToken(user),
    };
  }

  private toAuthUser(user: Usuario) {
    return {
      id: user.id,
      email: user.email,
      role: user.rol === RolUsuario.coach ? 'coach' : 'athlete',
    };
  }

  private signAccessToken(user: Usuario) {
    return this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
        role: user.rol === RolUsuario.coach ? 'coach' : 'athlete',
      },
      {
        secret: this.getJwtSecret(),
        expiresIn: '1d',
      },
    );
  }

  private getJwtSecret() {
    return (
      this.configService.get<string>('JWT_ACCESS_SECRET') ??
      'development-access-secret'
    );
  }

  private generateCoachLinkCode() {
    return `KLEOS-${randomUUID().slice(0, 8).toUpperCase()}`;
  }
}
