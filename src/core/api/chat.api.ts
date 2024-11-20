import { Chat } from '../models/chat';
import { EnumListItem, IPagingDto, ResponseList } from '../models/common';
import http from './http';

export interface ChatIV1Get extends IPagingDto {}

export const chatApi = {
    v1Get: async (dto: ChatIV1Get) => {
        const url = '/v1/chat';
        const res = await http.get<ResponseList<Chat>>(url, { params: { ...dto } });
        return res.data;
    },
    v1GetById: async (id: string) => {
        const url = `/v1/chat/${id}`;
        const res = await http.get<Chat>(url);
        return res.data;
    },

    v1Delete: async (id: string) => {
        const url = `/v1/chat/${id}`;
        const res = await http.delete<boolean>(url);
        return res.data;
    },
    v1Select: async (search: string, isShowDelete = false) => {
        const url = `/v1/chat/select-options`;
        const res = await http.get<Array<Chat>>(url, {
            params: {
                search,
                isShowDelete,
            },
        });
        return res.data;
    },
    v1GetEnumStatus: async () => {
        const url = '/v1/chat/enum-options/status';
        const res = await http.get<EnumListItem[]>(url);
        return res.data;
    },
};
