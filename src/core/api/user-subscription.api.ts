import { EnumListItem, IPagingDto, IReportDto, ReportResponse, ResponseList } from '../models/common';
import { UserSubscription } from '../models/userSubscription';
import http from './http';

export interface UserSubscriptionIV1Get extends IPagingDto {}

export const userSubscriptionApi = {
    v1Get: async (dto: UserSubscriptionIV1Get) => {
        const url = '/v1/user-subscription';
        const res = await http.get<ResponseList<UserSubscription>>(url, { params: { ...dto } });
        return res.data;
    },
    v1GetById: async (id: string) => {
        const url = `/v1/user-subscription/${id}`;
        const res = await http.get<UserSubscription>(url);
        return res.data;
    },

    v1Delete: async (id: string) => {
        const url = `/v1/user-subscription/${id}`;
        const res = await http.delete<boolean>(url);
        return res.data;
    },
    v1Select: async (search: string, isShowDelete = false) => {
        const url = `/v1/user-subscription/select-options`;
        const res = await http.get<Array<UserSubscription>>(url, {
            params: {
                search,
                isShowDelete,
            },
        });
        return res.data;
    },
    v1GetEnumStatus: async () => {
        const url = '/v1/user-subscription/enum-options/status';
        const res = await http.get<EnumListItem[]>(url);
        return res.data;
    },
    v1GetReport: async (dto: IReportDto) => {
        const url = '/v1/user-subscription/report';
        const res = await http.get<ReportResponse[]>(url, { params: { ...dto } });
        return res.data;
    },
};
