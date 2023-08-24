export declare namespace UserTypes {
  import { PostTypes } from './posts';
  import PostModelType = PostTypes.PostModelType;

  type UserModelType = {
    id: number;
    name: string;
    posts: PostModelType[];
  };
}
