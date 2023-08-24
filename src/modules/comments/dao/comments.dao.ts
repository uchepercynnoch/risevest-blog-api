import { CommentTypes } from '../../../@types/comments';
import { IBaseDao } from '../../core/dao';
import Comment from '../models/comment.model';
import CommentModelType = CommentTypes.CommentModelType;

export interface ICommentDao extends IBaseDao<Comment, CommentModelType> {}
