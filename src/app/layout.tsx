'use client';

import { ReactNode } from 'react';

import '@/core/NKConfig';
import TanQueryClient from '@/core/components/common/TanQueryClient';
import ThemeProvider from '@/core/components/common/ThemeProvider';
import TryAuthWrapper from '@/core/components/wrapper/TryAuthWrapper';
import { LangProvider } from '@/core/contexts/LangContext';
import { Providers } from '@/core/store/provider';
import '@/styles/globals.css';

import 'antd/dist/reset.css';
import 'react-photo-view/dist/react-photo-view.css';
import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/dist/tippy.css';

type Props = {
    children: ReactNode;
    params: Record<string, any>;
};

// Even though this component is just passing its children through, the presence
// of this file fixes an issue in Next.js 13.4 where link clicks that switch
// the locale would otherwise cause a full reload.
export default function RootLayout({ children, params: { locale } }: Props) {
    return (
        <html>
            <head />
            <body className="">
                <Providers>
                    <TanQueryClient>
                        <LangProvider>
                            <TryAuthWrapper>
                                <ThemeProvider locale={locale}>
                                    <main>{children}</main>
                                </ThemeProvider>
                            </TryAuthWrapper>
                        </LangProvider>
                    </TanQueryClient>
                </Providers>
            </body>
        </html>
    );
}
