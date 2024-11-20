import { User } from './user';
import { UserGroupRate } from './userGroupRate';

export interface UserGroupMember {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    isRequiredUpdate: boolean;
    docStatus: number;
    isAdmin: boolean;
    isOwner: boolean;
    isApprove: string;
    user: User;
    userGroupRates: UserGroupRate[];
    createRates: UserGroupRate[];
}
