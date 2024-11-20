import { IReportDto, ReportResponse, ResponseList } from '../models/common';
import http from './http';

export const chatMessageApi = {
    v1GetReport: async (dto: IReportDto) => {
        const url = '/v1/chat-message/report';
        const res = await http.get<ReportResponse[]>(url, { params: { ...dto } });
        return res.data;
    },
};
