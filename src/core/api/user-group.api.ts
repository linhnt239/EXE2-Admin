import { EnumListItem, IPagingDto, IReportDto, ReportResponse, ResponseList } from '../models/common';
import { UserGroup } from '../models/userGroup';
import http from './http';

export interface UserGroupIV1Get extends IPagingDto {}

export const userGroupApi = {
    v1Get: async (dto: UserGroupIV1Get) => {
        const url = '/v1/user-group';
        const res = await http.get<ResponseList<UserGroup>>(url, { params: { ...dto } });
        return res.data;
    },
    v1GetById: async (id: string) => {
        const url = `/v1/user-group/${id}`;
        const res = await http.get<UserGroup>(url);
        return res.data;
    },

    v1Delete: async (id: string) => {
        const url = `/v1/user-group/${id}`;
        const res = await http.delete<boolean>(url);
        return res.data;
    },
    v1Select: async (search: string, isShowDelete = false) => {
        const url = `/v1/user-group/select-options`;
        const res = await http.get<Array<UserGroup>>(url, {
            params: {
                search,
                isShowDelete,
            },
        });
        return res.data;
    },
    v1GetEnumStatus: async () => {
        const url = '/v1/user-group/enum-options/status';
        const res = await http.get<EnumListItem[]>(url);
        return res.data;
    },
    v1GetReport: async (dto: IReportDto) => {
        const url = '/v1/user-group/report';
        const res = await http.get<ReportResponse[]>(url, { params: { ...dto } });
        return res.data;
    },
};
