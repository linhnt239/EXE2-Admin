'use client';

import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { Dropdown, Layout, Menu } from 'antd';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { NKConstant } from '@/core/NKConstant';
import { NKRouter } from '@/core/NKRouter';
import { userMeApi } from '@/core/api/user-me.api';
import { useMenuDashboard } from '@/core/contexts/MenuDashboardContext';
import { RootState, store } from '@/core/store';
import { UserState, userActions } from '@/core/store/user';

const { Content, Sider } = Layout;

interface DashboardLayoutProps extends React.PropsWithChildren {}

const DashboardLayout: React.FunctionComponent<DashboardLayoutProps> = ({ children }) => {
    const [collapsed, setCollapsed] = React.useState(false);
    const { menu } = useMenuDashboard();
    const router = useRouter();
    const userStore = useSelector<RootState, UserState>((state) => state.user);
    const logoutMutation = useMutation(
        () => {
            return userMeApi.v1PostLogout();
        },
        {
            onSuccess: () => {
                store.dispatch(userActions.resetState());
                toast.success('Logout successfully!');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            },
        },
    );

    return (
        <Layout className="fade-in !min-h-screen min-w-[900px] overflow-auto">
            {/* <DashboardHeader setCollapsed={setCollapsed} /> */}
            <Layout className="">
                <Sider collapsed={collapsed} onCollapse={setCollapsed} width={250} className="sidebar relative min-h-[calc(100vh-64px)] ">
                    <div className="flex h-full flex-col justify-between">
                        <Link href={NKRouter.dashboard()}>
                            <div className="text-white">
                                <div className="h-full shrink-0 py-4 text-center">
                                    <img src="/assets/images/logo.png" alt={NKConstant.APP_NAME} className="!w-16   " />
                                </div>
                            </div>
                        </Link>
                        <Menu mode="inline" className="h-full border-r-0" items={menu} />
                        <div className="bg-white  pb-2 ">
                            <div>
                                <Dropdown
                                    menu={{
                                        items: [
                                            {
                                                type: 'item',
                                                label: 'Profile',
                                                key: 'profile',
                                                onClick: () => {
                                                    router.push(NKRouter.account.profile());
                                                },
                                            },
                                            {
                                                type: 'item',
                                                label: 'Update Profile',
                                                key: 'update-profile',
                                                onClick: () => {
                                                    router.push(NKRouter.account.updateProfile());
                                                },
                                            },
                                            {
                                                type: 'item',
                                                label: 'Change Password',
                                                key: 'change-password',
                                                onClick: () => {
                                                    router.push(NKRouter.account.changePassword());
                                                },
                                            },

                                            {
                                                type: 'item',
                                                label: 'Logout',
                                                key: 'logout',
                                                onClick: () => {
                                                    logoutMutation.mutate();
                                                },
                                            },
                                        ] as any,
                                    }}
                                >
                                    <div className="flex cursor-pointer gap-2 px-8 py-2 duration-300 hover:bg-gray-200">
                                        <HiOutlineUserGroup />
                                        <div>{userStore.name}</div>
                                    </div>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </Sider>
                <Layout className="">
                    <Content className="m-0 min-h-[280px]  p-4">{children}</Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default DashboardLayout;
