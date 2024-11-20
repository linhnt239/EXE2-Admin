import { ProductCategory } from './productCategory';
import { User } from './user';

export interface UserSale {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    isRequiredUpdate: boolean;
    docStatus: number;
    sortOrder: number;
    name: string;
    description: string;
    note: string;
    price: number;
    imageUrls: string[];
    status: string;
    productCategory: ProductCategory;
    createdBy: User;
}
