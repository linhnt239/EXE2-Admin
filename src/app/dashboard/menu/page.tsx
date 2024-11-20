'use client';

import * as React from 'react';

import { NKConfig } from '@/core/NKConfig';
import { useMenuDashboard } from '@/core/contexts/MenuDashboardContext';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const { menu } = useMenuDashboard();
    return (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
            {menu.map((item) => {
                return (
                    <div key={item.key} className="rounded-xl border bg-white p-4 text-black">
                        <h2 className="flex gap-4">
                            <div className="flex h-5 w-5 items-center justify-center">{item.icon}</div>
                            {item.label}
                        </h2>
                        <div className="my-4 h-[1px] w-full bg-gray-600"></div>
                        <div className="pl-2 ">
                            {item.children?.map((child) => {
                                return (
                                    <div
                                        key={child.key}
                                        onClick={() => {
                                            child.onClick?.();
                                        }}
                                        className="cursor-pointer"
                                    >
                                        <h3 className="flex gap-4 hover:text-blue-700">
                                            {child.icon}
                                            {child.label}
                                        </h3>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Page;
