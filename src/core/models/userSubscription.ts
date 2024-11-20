import { Subscription } from './subscription';
import { User } from './user';

export interface UserSubscription {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    isRequiredUpdate: boolean;
    docStatus: number;
    startSubscriptionDate: string;
    endSubscriptionDate: string;
    status: string;
    subscription: Subscription;
    user: User;
}
