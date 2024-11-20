import { EnumListItem, IPagingDto, ResponseList } from '../models/common';
import { UserWallet } from '../models/userWallet';
import http from './http';

export interface UserWalletIV1Get extends IPagingDto {}

export const userWalletApi = {
    v1Get: async (dto: UserWalletIV1Get) => {
        const url = '/v1/user-wallet';
        const res = await http.get<ResponseList<UserWallet>>(url, { params: { ...dto } });
        return res.data;
    },
    v1GetById: async (id: string) => {
        const url = `/v1/user-wallet/${id}`;
        const res = await http.get<UserWallet>(url);
        return res.data;
    },
    v1GetByUserId: async (id: string) => {
        const url = `/v1/user-wallet/user/${id}`;
        const res = await http.get<UserWallet>(url);
        return res.data;
    },

    v1Select: async (search: string, isShowDelete = false) => {
        const url = `/v1/user-wallet/select-options`;
        const res = await http.get<Array<UserWallet>>(url, {
            params: {
                search,
                isShowDelete,
            },
        });
        return res.data;
    },

    v1GetEnumType: async () => {
        const url = '/v1/user-wallet/enum-options/type';
        const res = await http.get<EnumListItem[]>(url);
        return res.data;
    },
};
