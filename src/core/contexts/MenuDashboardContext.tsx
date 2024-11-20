'use client';

import * as React from 'react';

import { useRouter } from 'next/navigation';

import { AppstoreOutlined, AreaChartOutlined, CreditCardOutlined, InboxOutlined, MoneyCollectOutlined, UserOutlined } from '@ant-design/icons';
import { Calendar, ChatQuestion, Coin, Fire, Paper, SettingsHorizontal } from 'akar-icons';

import { NKConfig } from '../NKConfig';
import { NKRouter } from '../NKRouter';
import { useRole } from '../hooks/useRole';
import { UserRoleIndex } from '../models/userRole';

export interface IMenuItem {
    key: string;
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
    children?: IMenuItem[];
}

export interface IMenuDashboardContext {
    menu: IMenuItem[];
}

export const MenuDashboardContext = React.createContext<IMenuDashboardContext>({
    menu: [],
});

interface MenuDashboardProviderProps {
    children: React.ReactNode;
}

export const MenuDashboardProvider: React.FC<MenuDashboardProviderProps> = ({ children }) => {
    const [isDisplay] = useRole(UserRoleIndex.SUPER_ADMIN);
    const [isDisplayExpert] = useRole(UserRoleIndex.MANAGER, true);

    const router = useRouter();

    return (
        <MenuDashboardContext.Provider
            value={{
                menu: [
                    ...(isDisplay
                        ? [
                              {
                                  key: 'user-list',
                                  label: 'User',
                                  icon: <UserOutlined rev="" />,
                                  onClick: () => router.push(NKRouter.user.user.list()),
                              },
                              {
                                  key: 'user-role-list',
                                  label: 'User Role',
                                  icon: <UserOutlined rev="" />,
                                  onClick: () => router.push(NKRouter.user.userRole.list()),
                              },

                              //   {
                              //       key: 'booking',
                              //       icon: <UserOutlined rev="" />,
                              //       label: 'Expert',
                              //       children: [
                              //           {
                              //               key: 'booking-list',
                              //               label: 'List',
                              //               onClick: () => router.push(NKRouter.booking.list()),
                              //           },
                              //       ],
                              //   },
                              //   {
                              //       key: 'product',
                              //       icon: <AppstoreOutlined rev="" />,
                              //       label: 'Product',
                              //       children: [
                              //   {
                              //       key: 'product-list',
                              //       label: 'List',
                              //       onClick: () => router.push(NKRouter.product.list()),
                              //   },
                              //   {
                              //       key: 'user-sale',
                              //       label: 'User Sale',
                              //       onClick: () => router.push(NKRouter.userSale.list()),
                              //   },
                              //   {
                              //       key: 'product-category',
                              //       label: 'Product Category',
                              //       onClick: () => router.push(NKRouter.productCategory.list()),
                              //   },
                              //       ],
                              //   },
                              //   {
                              //       key: 'service',
                              //       icon: <AppstoreOutlined rev="" />,
                              //       label: 'Service',
                              //       children: [
                              //   {
                              //       key: 'service-list',
                              //       label: 'List',
                              //       onClick: () => router.push(NKRouter.service.list()),
                              //   },

                              //           {
                              //               key: 'user-sale-booking',
                              //               label: 'User Sale Booking',
                              //               onClick: () => router.push(NKRouter.userSaleBooking.list()),
                              //           },
                              //       ],
                              //   },
                              {
                                  key: 'user-sale-booking',
                                  label: 'Freelance Booking',
                                  icon: <MoneyCollectOutlined rev="" />,
                                  onClick: () => router.push(NKRouter.userSaleBooking.list()),
                              },
                              {
                                  icon: <AppstoreOutlined rev="" />,
                                  key: 'service-category',
                                  label: 'Freelance Category',
                                  onClick: () => router.push(NKRouter.serviceCategory.list()),
                              },
                              {
                                  key: 'user-wallet',
                                  label: 'User Wallet',
                                  icon: <CreditCardOutlined rev="" />,
                                  onClick: () => router.push(NKRouter.user.userWallet.list()),
                              },

                              {
                                  key: 'user-wallet-transaction',
                                  label: 'User Wallet Transaction',
                                  icon: <CreditCardOutlined rev="" />,
                                  onClick: () => router.push(NKRouter.userWalletTransaction.list()),
                              },
                              //   {
                              //       key: 'payment',
                              //       icon: <CreditCardOutlined rev="" />,
                              //       label: 'Payment',
                              //       children: [
                              //           {
                              //               key: 'user-wallet',
                              //               label: 'User Wallet',
                              //               onClick: () => router.push(NKRouter.user.userWallet.list()),
                              //           },
                              //           {
                              //               key: 'payment-capture',
                              //               label: 'Payment Capture',
                              //               onClick: () => router.push(NKRouter.paymentCapture.list()),
                              //           },
                              //           {
                              //               key: 'user-wallet-transaction',
                              //               label: 'User Wallet Transaction',
                              //               onClick: () => router.push(NKRouter.userWalletTransaction.list()),
                              //           },
                              //       ],
                              //   },
                              //   {
                              //       key: 'order',
                              //       icon: <Tag strokeWidth={2} size={16} />,
                              //       label: 'Order',
                              //       children: [
                              //           {
                              //               key: 'order-list',
                              //               label: 'List',

                              //               onClick: () => router.push(NKRouter.order.list()),
                              //           },
                              //           {
                              //               key: 'discount',
                              //               label: 'Discount',

                              //               onClick: () => router.push(NKRouter.order.discount.list()),
                              //           },
                              //       ],
                              //   },
                              //   {
                              //       key: 'user-ticket',
                              //       icon: <InboxOutlined rev="" />,
                              //       label: 'Customer Support',
                              //       onClick: () => router.push(NKRouter.userTicket.list()),
                              //   },
                              //   {
                              //       key: 'chat',
                              //       icon: <ChatDots className="h-[14px] w-[14px]" />,
                              //       label: 'Chat',
                              //       onClick: () => router.push(NKRouter.chat.list()),
                              //   },
                              {
                                  key: 'feedback-anonymous',
                                  icon: <InboxOutlined rev="" />,
                                  label: 'Contact',
                                  onClick: () => router.push(NKRouter.feedbackAnonymous.list()),
                              },
                              //   {
                              //       key: 'setting',
                              //       icon: <SettingOutlined rev="" />,
                              //       label: 'Setting',
                              //       onClick: () => router.push(NKRouter.userTicket.list()),
                              //   },
                              //   {
                              //       key: 'Podcast',
                              //       icon: <MusicAlbum strokeWidth={2} size={16} />,
                              //       label: 'Podcast',
                              //       children: [
                              //           {
                              //               key: 'podcast-list',
                              //               label: 'List',

                              //               onClick: () => router.push(NKRouter.podcast.list()),
                              //           },
                              //           {
                              //               key: 'podcast-author',
                              //               label: 'Podcast Author',

                              //               onClick: () => router.push(NKRouter.podcast.author.list()),
                              //           },
                              //           {
                              //               key: 'podcast-category',
                              //               label: 'Podcast Category',

                              //               onClick: () => router.push(NKRouter.podcast.category.list()),
                              //           },
                              //       ],
                              //   },
                              //   {
                              //       key: 'feedback',
                              //       icon: <Newspaper strokeWidth={2} size={16} />,
                              //       label: 'Test',
                              //       children: [
                              //           {
                              //               key: 'feedback-list',
                              //               label: 'List',

                              //               onClick: () => router.push(NKRouter.feedback.list()),
                              //           },
                              //       ],
                              //   },
                              {
                                  key: 'user-post',
                                  icon: <ChatQuestion strokeWidth={2} size={16} />,
                                  label: 'Forum',
                                  onClick: () => router.push(NKRouter.userPost.list()),
                              },
                              //   {
                              //       key: 'user-group',
                              //       icon: <PeopleGroup className="h-[14px] w-[14px]" />,
                              //       label: 'User Group',
                              //       onClick: () => router.push(NKRouter.userGroup.list()),
                              //   },
                              //   {
                              //       key: 'subscription',
                              //       icon: <Diamond className="h-[14px] w-[14px]" />,
                              //       label: 'Subscription',
                              //       onClick: () => router.push(NKRouter.subscription.list()),
                              //   },
                              //   {
                              //       key: 'userSubscription',
                              //       icon: <Sparkles className="h-[14px] w-[14px]" />,
                              //       label: 'User Subscription',
                              //       onClick: () => router.push(NKRouter.userSubscription.list()),
                              //   },
                              {
                                  key: 'advertising',
                                  icon: <Coin className="h-[14px] w-[14px]" />,
                                  label: 'Banner',
                                  onClick: () => router.push(NKRouter.advertising.list()),
                              },
                              //   {
                              //       key: 'analytics',
                              //       icon: <Fire className="h-[14px] w-[14px]" />,
                              //       label: 'Analytics',
                              //       onClick: () => window.location.assign(NKConfig.GOOGLE_ANALYTICS_URL),
                              //   },
                              {
                                  key: 'single',
                                  icon: <SettingsHorizontal strokeWidth={2} size={16} />,
                                  label: 'Settings',
                                  onClick: () => router.push(NKRouter.single.list()),
                              },
                          ]
                        : []),
                    ...(isDisplayExpert
                        ? [
                              {
                                  key: 'chart',
                                  icon: <AreaChartOutlined rev="" />,
                                  label: 'Chart',
                                  onClick: () => router.push(NKRouter.expert.chart.list()),
                              },
                              {
                                  key: 'booking',
                                  icon: <Calendar strokeWidth={2} size={16} />,
                                  label: 'Booking',
                                  onClick: () => router.push(NKRouter.expert.booking.list()),
                              },
                          ]
                        : []),
                ] as any,
            }}
        >
            {children}
        </MenuDashboardContext.Provider>
    );
};

export const useMenuDashboard = () => React.useContext(MenuDashboardContext);
