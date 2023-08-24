import Joi from 'joi';
import { AddCommentDto, CreatePostDto } from '../dto/post.dto';

export function createPostSchema(): Joi.SchemaMap<CreatePostDto> {
  return {
    id: Joi.number().allow().label('Post Id'),
    title: Joi.string().required().label('Title'),
  };
}

export function addCommentSchema(): Joi.SchemaMap<AddCommentDto> {
  return {
    comment: Joi.string().required().label('Comment'),
  };
}
