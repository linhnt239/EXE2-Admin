import { UserPostCommentLike } from './userPostCommentLike';

export interface UserPostComment {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    isRequiredUpdate: boolean;
    docStatus: number;
    content: string;
    userPostCommentLikes: UserPostCommentLike[];
}
