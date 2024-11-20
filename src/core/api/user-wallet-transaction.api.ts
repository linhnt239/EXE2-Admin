import { EnumListItem, IPagingDto, IReportDto, ReportResponse, ResponseList } from '../models/common';
import { UserWallet } from '../models/userWallet';
import { UserWalletTransaction } from '../models/userWalletTransaction';
import http from './http';

export interface UserWalletTransactionIV1Get extends IPagingDto {}

export interface UserWalletTransactionIV1AdminDepositBalance {
    userId: string;
    amount: number;
}

export interface UserWalletTransactionIV1AdminWithdrawBalance {
    userId: string;
    amount: number;
}

export const userWalletTransactionApi = {
    v1Get: async (dto: UserWalletTransactionIV1Get) => {
        const url = '/v1/user-wallet-transaction';
        const res = await http.get<ResponseList<UserWalletTransaction>>(url, { params: { ...dto } });
        return res.data;
    },
    v1GetReport: async (dto: IReportDto) => {
        const url = '/v1/user-wallet-transaction/report';
        const res = await http.get<ReportResponse[]>(url, { params: { ...dto } });
        return res.data;
    },
    v1GetByWallet: async (walletId: string, dto: UserWalletTransactionIV1Get) => {
        const url = `/v1/user-wallet-transaction/wallet/${walletId}`;
        const res = await http.get<ResponseList<UserWalletTransaction>>(url, { params: { ...dto } });
        return res.data;
    },

    v1GetEnumType: async () => {
        const url = '/v1/user-wallet-transaction/enum-options/type';
        const res = await http.get<EnumListItem[]>(url);
        return res.data;
    },

    v1GetEnumStatus: async () => {
        const url = '/v1/user-wallet-transaction/enum-options/status';
        const res = await http.get<EnumListItem[]>(url);
        return res.data;
    },

    v1AdminDepositBalance: async (dto: UserWalletTransactionIV1AdminDepositBalance) => {
        const url = `/v1/user-wallet-transaction/admin-deposit-balance`;
        const res = await http.post<UserWallet>(url, dto);
        return res.data;
    },

    v1AdminWithdrawBalance: async (dto: UserWalletTransactionIV1AdminWithdrawBalance) => {
        const url = `/v1/user-wallet-transaction/admin-withdraw-balance`;
        const res = await http.post<UserWallet>(url, dto);
        return res.data;
    },
};
