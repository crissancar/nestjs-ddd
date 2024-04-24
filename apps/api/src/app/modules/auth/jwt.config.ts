import { JwtModuleOptions } from '@nestjs/jwt';

import { config } from '../../../config/app';

const { jwt } = config;

export const jwtConfig: JwtModuleOptions = { secret: jwt.secret };
