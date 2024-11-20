'use client';

import { PropsWithChildren, useEffect, useState } from 'react';

import { ConfigProvider, theme } from 'antd';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { useTheme } from 'next-themes';
import { ToastContainer } from 'react-toastify';

import { AntdProvider } from './AntdProvider';

export type ProviderProps = PropsWithChildren<{
    locale: string;
}>;

export function AntdConfigProvider({ children, locale }: ProviderProps) {
    const { theme: nowTheme } = useTheme();

    return (
        <ConfigProvider
            theme={{
                algorithm:
                    // nowTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
                    theme.defaultAlgorithm,
                token: {
                    borderRadius: 4,
                    colorPrimary: '#18181b',

                    colorBgBase: '#ffffff',
                    // colorBgLayout: '#ffffff',
                },
                components: {
                    Menu: {
                        itemBg: '#fff',

                        itemSelectedBg: '#C0FF00',

                        // colorBgElevated: '#ffffff',
                    },

                    Table: {
                        colorBgContainer: '#ffffff',
                        borderColor: '#121212',
                        headerBg: '#C0FF00',
                        headerSortActiveBg: '#4cd137',
                    },
                    Layout: {
                        colorBgBody: '#ffffff',
                        colorBgContainer: '#ffffff',
                        siderBg: '#171717',
                    },
                },
            }}
        >
            <AntdProvider>{children}</AntdProvider>
            <ToastContainer autoClose={2000} />
        </ConfigProvider>
    );
}

export default function ThemeProvider(props: ProviderProps) {
    const [mounted, setMounted] = useState(false);

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // use your loading page
        return <div className="hidden">{props.children}</div>;
    }

    return (
        <NextThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <AntdConfigProvider {...props} />
        </NextThemeProvider>
    );
}
