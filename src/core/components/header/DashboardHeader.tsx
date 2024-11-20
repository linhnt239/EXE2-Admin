import * as React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { RiseOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { DragVerticalFill } from 'akar-icons';
import { Button, Dropdown } from 'antd';
import { MenuIcon } from 'lucide-react';
import { useSelector } from 'react-redux';

import { NKConfig } from '@/core/NKConfig';
import { NKConstant } from '@/core/NKConstant';
import { NKRouter } from '@/core/NKRouter';
import { userMeApi } from '@/core/api/user-me.api';
import { useRole } from '@/core/hooks/useRole';
import { UserRoleIndex } from '@/core/models/userRole';
import { RootState, store } from '@/core/store';
import { UserState, userActions } from '@/core/store/user';

interface DashboardHeaderProps {
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ setCollapsed }) => {
    const router = useRouter();
    const [isDisplayExpert] = useRole(UserRoleIndex.MANAGER, true);
    const userStore = useSelector<RootState, UserState>((state) => state.user);
    const logoutMutation = useMutation(
        () => {
            return userMeApi.v1PostLogout();
        },
        {
            onSuccess: () => {
                store.dispatch(userActions.resetState());
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            },
        },
    );

    return (
        <div className="z-10 flex h-16 items-center justify-between gap-2 border border-black bg-white p-4 shadow-md">
            <div className="flex items-center gap-2 ">
                <Link href={isDisplayExpert ? NKRouter.expert.chart.list() : NKRouter.dashboard()}>
                    <div className="flex h-6 items-center gap-2">
                        <div className="h-full shrink-0 ">
                            <img src="/assets/images/logo.png" alt={NKConstant.APP_NAME} className="h-full w-16 lg:w-full " />
                        </div>
                        <div className="font-semibold text-black">{NKConstant.APP_NAME}</div>
                    </div>
                </Link>
                {isDisplayExpert ? (
                    <>
                        <div className="ml-8 flex items-center gap-4">
                            <Button
                                type="primary"
                                onClick={() => {
                                    setCollapsed((pre) => !pre);
                                }}
                                size="small"
                                icon={<MenuIcon className="h-5 w-5" />}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="ml-8 flex items-center gap-4">
                            <Button
                                type="primary"
                                onClick={() => {
                                    setCollapsed((pre) => !pre);
                                }}
                                size="small"
                                icon={<MenuIcon className="h-5 w-5" />}
                            />
                            <Button
                                type="primary"
                                onClick={() => {
                                    router.push(NKRouter.menu.list());
                                }}
                                className="flex items-center justify-center"
                                size="small"
                                icon={<DragVerticalFill strokeWidth={3} size={20} className="h-5 w-5" />}
                            />

                            {/* <Link href={`${NKConfig.API_URL}/monitor/cron`} target="_blank">
                                <Button size="small" type="primary" icon={<RiseOutlined rev="" />}>
                                    Cronner Monitor
                                </Button>
                            </Link>
                            <Link href={`${NKConfig.API_URL}/monitor/queue`} target="_blank">
                                <Button size="small" type="primary" icon={<RiseOutlined rev="" />}>
                                    Queue Monitor
                                </Button>
                            </Link> */}
                        </div>
                    </>
                )}
            </div>
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
                    <div>
                        Hello, <span className="font-semibold">{userStore.name}</span>
                    </div>
                </Dropdown>
            </div>
        </div>
    );
};

export default DashboardHeader;
