import { EnumListItem, IPagingDto, IReportDto, ReportResponse, ResponseList } from '../models/common';
import { UserSaleBooking } from '../models/userSaleBooking';
import http from './http';

const baseUrl = '/v1/user-sale-booking-order';
export interface UserSaleBookingIV1Get extends IPagingDto {}

export const userSaleBookingOrderApi = {
    v1Get: async (dto: UserSaleBookingIV1Get) => {
        const url = `${baseUrl}`;
        const res = await http.get<ResponseList<UserSaleBooking>>(url, { params: { ...dto } });
        return res.data;
    },
    v1GetById: async (id: string) => {
        const url = `${baseUrl}/${id}`;
        const res = await http.get<UserSaleBooking>(url);
        return res.data;
    },
    v1GetReport: async (dto: IReportDto) => {
        const url = `${baseUrl}/report`;
        const res = await http.get<ReportResponse[]>(url, { params: { ...dto } });
        return res.data;
    },
    v1GetSelect: async (search: string, isShowDelete = false) => {
        const url = `${baseUrl}/select-options`;
        const res = await http.get<UserSaleBooking[]>(url, {
            params: {
                search,
                isShowDelete,
            },
        });

        return res.data;
    },
    v1GetAll: async () => {
        const url = `${baseUrl}/all`;
        const res = await http.get<UserSaleBooking[]>(url);
        return res.data;
    },

    v1GetEnumStatus: async () => {
        const url = `${baseUrl}/enum-options/status`;
        const res = await http.get<EnumListItem[]>(url);
        return res.data;
    },
};
