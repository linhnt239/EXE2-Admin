import { IPagingDto, ResponseList } from '../models/common';
import { User } from '../models/user';
import http from './http';

export interface UserIV1Get extends IPagingDto {}

const baseEndpoint = '/v1/user-admin';

export const userAdminApi = {
    v1Get: async (dto: UserIV1Get) => {
        const url = `${baseEndpoint}`;
        const res = await http.get<ResponseList<User>>(url, { params: { ...dto } });
        return res.data;
    },
    v1GetById: async (id: string) => {
        const url = `${baseEndpoint}/${id}`;
        const res = await http.get<User>(url);
        return res.data;
    },

    v1Ban: async (id: string) => {
        const url = `${baseEndpoint}/banned-user/${id}`;
        const res = await http.put(url);
        return res.data;
    },
};
