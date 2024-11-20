export interface PaymentCapture {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    isRequiredUpdate: boolean;
    docStatus: number;
    sortOrder: number;
    hash: string;
    provider: string;
    accountId: string;
    updatedBalance: number;
    amount: number;
    transferTime: string;
    content: string;
}
