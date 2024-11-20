import { EnumListItem, IPagingDto, IReportDto, ReportResponse, ResponseList } from '../models/common';
import { UserSale } from '../models/userSale';
import http from './http';

const baseUrl = '/v1/user-sale';
export interface UserSaleIV1Get extends IPagingDto {}
export interface UpdateUserSaleIV1GetByIdDto extends Pick<UserSale, 'name' | 'description' | 'note' | 'price' | 'status'> {
    productCategoryId: string;
    imageUrls: string[];
}
export const userSaleApi = {
    v1Get: async (dto: UserSaleIV1Get) => {
        const url = `${baseUrl}`;
        const res = await http.get<ResponseList<UserSale>>(url, { params: { ...dto } });
        return res.data;
    },
    v1GetById: async (id: string) => {
        const url = `${baseUrl}/${id}`;
        const res = await http.get<UserSale>(url);
        return res.data;
    },
    v1GetSelect: async (search: string, isShowDelete = false) => {
        const url = `${baseUrl}/select-options`;
        const res = await http.get<UserSale[]>(url, {
            params: {
                search,
                isShowDelete,
            },
        });

        return res.data;
    },
    v1GetAll: async () => {
        const url = `${baseUrl}/all`;
        const res = await http.get<UserSale[]>(url);
        return res.data;
    },
    v1GetEnumStatus: async () => {
        const url = `${baseUrl}/enum-options/status`;
        const res = await http.get<EnumListItem[]>(url);
        return res.data;
    },
    v1Put: async (id: string, dto: UpdateUserSaleIV1GetByIdDto) => {
        const url = `${baseUrl}/${id}`;
        const res = await http.put<UserSale>(url, dto);
        return res.data;
    },
    v1GetReport: async (dto: IReportDto) => {
        const url = `${baseUrl}/report`;
        const res = await http.get<ReportResponse[]>(url, { params: { ...dto } });
        return res.data;
    },
};
