import { IPagingDto, ResponseList } from '../models/common';
import { Subscription } from '../models/subscription';
import http from './http';

export interface SubscriptionIV1Get extends IPagingDto {}

export interface SubscriptionIV1CreateDto extends Pick<Subscription, 'name' | 'description' | 'imageUrls' | 'index' | 'price' | 'duration'> {}

export interface SubscriptionIV1UpdateDto extends Pick<Subscription, 'name' | 'description' | 'imageUrls' | 'index' | 'price' | 'duration'> {}

export const subscriptionApi = {
    v1Get: async (dto: SubscriptionIV1Get) => {
        const url = '/v1/subscription';
        const res = await http.get<ResponseList<Subscription>>(url, { params: { ...dto } });
        return res.data;
    },
    v1GetById: async (id: string) => {
        const url = `/v1/subscription/${id}`;
        const res = await http.get<Subscription>(url);
        return res.data;
    },
    v1Create: async (dto: SubscriptionIV1CreateDto) => {
        const url = '/v1/subscription';
        const res = await http.post<Subscription>(url, dto);
        return res.data;
    },
    v1Update: async (id: string, dto: SubscriptionIV1UpdateDto) => {
        const url = `/v1/subscription/${id}`;
        const res = await http.put<Subscription>(url, dto);
        return res.data;
    },
    v1Delete: async (id: string) => {
        const url = `/v1/subscription/${id}`;
        const res = await http.delete<boolean>(url);
        return res.data;
    },
    v1Select: async (search: string, isShowDelete = false) => {
        const url = `/v1/subscription/select-options`;
        const res = await http.get<Array<Subscription>>(url, {
            params: {
                search,
                isShowDelete,
            },
        });
        return res.data;
    },
};
