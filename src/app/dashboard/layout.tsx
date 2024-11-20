import DashboardLayout from '@/core/components/layout/DashboardLayout';
import AuthWrapper from '@/core/components/wrapper/AuthWrapper';
import RoleWrapper from '@/core/components/wrapper/RoleWrapper';
import { MenuDashboardProvider } from '@/core/contexts/MenuDashboardContext';
import { UserRoleIndex } from '@/core/models/userRole';

export default function RootLayout({ children, params: { locale } }: { children: React.ReactNode; params: Record<string, any> }) {
    return (
        <MenuDashboardProvider>
            <AuthWrapper>
                <RoleWrapper userRoleIndex={UserRoleIndex.SUPER_ADMIN}>
                    <DashboardLayout>{children}</DashboardLayout>
                </RoleWrapper>
            </AuthWrapper>
        </MenuDashboardProvider>
    );
}
