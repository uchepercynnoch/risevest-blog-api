import Joi from 'joi';
import { AddPostDto, CreateUserDto } from '../dto/user.dto';

export function createUserSchema(): Joi.SchemaMap<CreateUserDto> {
  return {
    id: Joi.number().allow().label('User Id'),
    name: Joi.string().required().label('Name'),
  };
}

export function addPostSchema(): Joi.SchemaMap<AddPostDto> {
  return {
    title: Joi.string().required().label('Title'),
  };
}
