export declare namespace CommentTypes {
  import { PostTypes } from './posts';
  import PostModelType = PostTypes.PostModelType;

  type CommentModelType = {
    id: number;
    content: string;
    postId: number;
    post: PostModelType;
  };
}
