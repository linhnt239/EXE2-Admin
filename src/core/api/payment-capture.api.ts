import { EnumListItem, IPagingDto, IReportDto, ReportResponse, ResponseList } from '../models/common';
import { PaymentCapture } from '../models/payment-capture';
import { UserGroup } from '../models/userGroup';
import http from './http';

export interface PaymentCaptureIV1Get extends IPagingDto {}

export interface CreatePaymentCapture
    extends Pick<PaymentCapture, 'provider' | 'accountId' | 'updatedBalance' | 'amount' | 'transferTime' | 'content'> {}

export const paymentCaptureApi = {
    v1Get: async (dto: PaymentCaptureIV1Get) => {
        const url = '/v1/payment-capture';
        const res = await http.get<ResponseList<PaymentCapture>>(url, { params: { ...dto } });
        return res.data;
    },
    v1GetById: async (id: string) => {
        const url = `/v1/payment-capture/${id}`;
        const res = await http.get<PaymentCapture>(url);
        return res.data;
    },
    v1Post: async (dto: CreatePaymentCapture) => {
        const url = '/v1/payment-capture';
        const res = await http.post<PaymentCapture>(url, dto);
        return res.data;
    },
};
