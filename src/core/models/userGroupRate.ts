export interface UserGroupRate {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    isRequiredUpdate: boolean;
    docStatus: number;
    rateWork: number;
    rateService: number;
    rateFriendly: number;
    content: string;
}
