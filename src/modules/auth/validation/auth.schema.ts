import Joi from 'joi';
import { LoginDto } from '../dto/auth.dto';

export function loginSchema(): Joi.SchemaMap<LoginDto> {
  return {
    userId: Joi.number().required().label('User Id'),
  };
}
