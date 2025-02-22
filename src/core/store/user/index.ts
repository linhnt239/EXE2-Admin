import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { UserRole } from '@/core/models/userRole';

import { User } from '../../models/user';

export interface UserState extends Pick<User, 'name' | 'id' | 'isDeleted' | 'isRequiredUpdate'> {
    isAuth: boolean;
    isLogin: boolean;
    token: string;
    role: UserRole | null;
}

const initialState: UserState = {
    id: '',
    name: '',
    token: '',
    isAuth: false,
    isDeleted: false,
    isLogin: false,

    isRequiredUpdate: false,
    role: null,
};

const reducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetState: () => ({ ...initialState }),
        setToken: (state, action) => {
            const newState = { ...state };
            newState.token = action.payload;

            return newState;
        },
        setUser: (state, action: PayloadAction<User>) => {
            const newState = { ...state };
            newState.id = action.payload.id;
            newState.name = action.payload.name;
            newState.isDeleted = action.payload.isDeleted;
            newState.isRequiredUpdate = action.payload.isRequiredUpdate;
            newState.role = action.payload.role;
            newState.isAuth = true;
            newState.isLogin = true;

            return newState;
        },

        setLoginFailed: (state) => {
            const newState = { ...state };
            newState.isAuth = false;
            newState.isLogin = true;
            return newState;
        },
    },
});

export const userActions = {
    ...reducer.actions,
};
export const userReducer = reducer.reducer;
