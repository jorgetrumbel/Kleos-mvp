import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../../users/users.service';
import { AuthenticatedUser } from '../types/authenticated-request';

type JwtPayload = {
  sub: string;
  email: string;
  role: 'coach' | 'athlete';
};

@Injectable()
export class JwtStrategy {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async validate(token: string): Promise<AuthenticatedUser> {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: this.getJwtSecret(),
      });

      const user = await this.usersService.findById(payload.sub);

      if (!user || !user.activo) {
        throw new UnauthorizedException('Invalid token');
      }

      return {
        id: user.id,
        email: user.email,
        role: user.rol === 'coach' ? 'coach' : 'athlete',
      };
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private getJwtSecret() {
    return (
      this.configService.get<string>('JWT_ACCESS_SECRET') ??
      'development-access-secret'
    );
  }
}
