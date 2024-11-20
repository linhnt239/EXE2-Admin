import { EnumListItem, IReportDto, ReportResponse } from '../models/common';
import { User } from '../models/user';
import http from './http';

export const userApi = {
    v1GetEnumGender: async () => {
        const url = '/v1/user/enum-options/gender';
        const res = await http.get<EnumListItem[]>(url);
        return res.data;
    },
    v1GetEnumStatus: async () => {
        const url = '/v1/user/enum-options/status';
        const res = await http.get<EnumListItem[]>(url);
        return res.data;
    },

    v1GetReport: async (dto: IReportDto) => {
        const url = '/v1/user/report';
        const res = await http.get<ReportResponse[]>(url, { params: { ...dto } });
        return res.data;
    },
    v1Select: async (search: string, isShowDelete = false) => {
        const url = `/v1/user/select-options`;
        const res = await http.get<Array<User>>(url, {
            params: {
                search,
                isShowDelete,
            },
        });
        return res.data;
    },
};
