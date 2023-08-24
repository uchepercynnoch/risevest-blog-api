export declare namespace PostTypes {
  import { CommentTypes } from './comments';
  import { UserTypes } from './users';

  import UserModelType = UserTypes.UserModelType;
  import CommentModelType = CommentTypes.CommentModelType;

  type PostModelType = {
    id: number;
    title: string;
    userId: number;
    user: UserModelType;
    comments: CommentModelType[];
  };
}
