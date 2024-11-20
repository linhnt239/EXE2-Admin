import { EnumListItem } from '../models/common';
import { UserPost } from '../models/userPost';
import { UserPostCommentLike } from '../models/userPostCommentLike';
import http from './http';

export interface UserPostCommentLikeIV1CreateDto extends Pick<UserPostCommentLike, 'react'> {}

export const userPostCommentLikeApi = {
    v1Create: async (id: string, dto: UserPostCommentLikeIV1CreateDto) => {
        const url = `/v1/user-post-comment-like/${id}`;
        const res = await http.post<UserPost>(url, dto);
        return res.data;
    },
    v1GetEnumReact: async () => {
        const url = '/v1/user-post-comment-like/enum-options/react';
        const res = await http.get<EnumListItem[]>(url);
        return res.data;
    },
};
