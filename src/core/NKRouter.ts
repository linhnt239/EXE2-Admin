export const NKRouter = {
    dashboard: () => '/dashboard',
    menu: {
        list: () => '/dashboard/menu',
    },
    account: {
        profile: () => '/dashboard/account/profile',
        changePassword: () => '/dashboard/account/change-password',
        updateProfile: () => '/dashboard/account/update-profile',
    },
    setting: {},
    user: {
        user: {
            list: () => '/dashboard/user',
            edit: (id: string) => `/dashboard/user/${id}/edit`,
            detail: (id: string) => `/dashboard/user/${id}/detail`,
        },
        userRole: {
            list: () => '/dashboard/user-role',
            create: () => '/dashboard/user-role/create',
            edit: (id: string) => `/dashboard/user-role/${id}/edit`,
            detail: (id: string) => `/dashboard/user-role/${id}/detail`,
        },
        userWallet: {
            list: () => '/dashboard/user-wallet',
            detail: (id: string) => `/dashboard/user-wallet/${id}/detail`,
        },
    },
    userPost: {
        list: () => '/dashboard/user-post',
        create: () => '/dashboard/user-post/create',
        detail: (id: string) => `/dashboard/user-post/${id}/detail`,
        edit: (id: string) => `/dashboard/user-post/${id}/edit`,
    },
    feedback: {
        list: () => '/dashboard/feedback',
        detail: (id: string) => `/dashboard/feedback/${id}/detail`,
        edit: (id: string) => `/dashboard/feedback/${id}/edit`,
        create: () => '/dashboard/feedback/create',
        userFeedback: {
            list: () => '/dashboard/user-feedback',
            detail: (id: string) => `/dashboard/user-feedback/${id}/detail`,
            edit: (id: string) => `/dashboard/user-feedback/${id}/edit`,
        },
    },

    expert: {
        account: {
            profile: () => '/expert/dashboard/account/profile',
        },
        chart: {
            list: () => '/expert/dashboard/chart',
        },
        booking: {
            list: () => '/expert/dashboard/booking',
            detail: (id: string) => `/expert/dashboard/booking/${id}/detail`,
            edit: (id: string) => `/expert/dashboard/booking/${id}/edit`,
        },
    },
    booking: {
        list: () => '/dashboard/booking',
        detail: (id: string) => `/dashboard/booking/${id}/detail`,
        edit: (id: string) => `/dashboard/booking/${id}/edit`,
        create: () => '/dashboard/booking/create',
    },
    podcast: {
        list: () => '/dashboard/podcast',
        create: () => '/dashboard/podcast/create',
        edit: (id: string) => `/dashboard/podcast/${id}/edit`,
        detail: (id: string) => `/dashboard/podcast/${id}/detail`,
    },
    podcastCategory: {
        list: () => '/dashboard/podcast-category',
        create: () => '/dashboard/podcast-category/create',
        edit: (id: string) => `/dashboard/podcast-category/${id}/edit`,
        detail: (id: string) => `/dashboard/podcast-category/${id}/detail`,
    },
    podcastAuthor: {
        list: () => '/dashboard/podcast-author',
        create: () => '/dashboard/podcast-author/create',
        edit: (id: string) => `/dashboard/podcast-author/${id}/edit`,
        detail: (id: string) => `/dashboard/podcast-author/${id}/detail`,
    },
    order: {
        list: () => '/dashboard/order',
        detail: (id: string) => `/dashboard/order/${id}/detail`,
    },
    orderDiscount: {
        list: () => '/dashboard/discount',
        create: () => '/dashboard/discount/create',
        edit: (id: string) => `/dashboard/discount/${id}/edit`,
        detail: (id: string) => `/dashboard/discount/${id}/detail`,
    },
    userTicket: {
        list: () => '/dashboard/user-ticket',
        detail: (id: string) => `/dashboard/user-ticket/${id}/detail`,
    },
    feedbackAnonymous: {
        list: () => '/dashboard/feedback-anonymous',
        detail: (id: string) => `/dashboard/feedback-anonymous/${id}/detail`,
        edit: (id: string) => `/dashboard/feedback-anonymous/${id}/edit`,
    },
    product: {
        list: () => '/dashboard/product',
        create: () => '/dashboard/product/create',
        edit: (id: string) => `/dashboard/product/${id}/edit`,
        detail: (id: string) => `/dashboard/product/${id}/detail`,
    },
    productCategory: {
        list: () => '/dashboard/product-category',
        create: () => '/dashboard/product-category/create',
        edit: (id: string) => `/dashboard/product-category/${id}/edit`,
        detail: (id: string) => `/dashboard/product-category/${id}/detail`,
    },
    serviceCategory: {
        list: () => '/dashboard/service-category',
        create: () => '/dashboard/service-category/create',
        edit: (id: string) => `/dashboard/service-category/${id}/edit`,
        detail: (id: string) => `/dashboard/service-category/${id}/detail`,
    },
    paymentCapture: {
        list: () => '/dashboard/payment-capture',
        detail: (id: string) => `/dashboard/payment-capture/${id}/detail`,
    },
    userSaleBooking: {
        list: () => '/dashboard/user-sale-booking',
        detail: (id: string) => `/dashboard/user-sale-booking/${id}/detail`,
        edit: (id: string) => `/dashboard/user-sale-booking/${id}/edit`,
    },
    userWalletTransaction: {
        list: () => '/dashboard/user-wallet-transaction',
        detail: (id: string) => `/dashboard/user-wallet-transaction/${id}/detail`,
    },
    userSale: {
        list: () => '/dashboard/user-sale',
        edit: (id: string) => `/dashboard/user-sale/${id}/edit`,
        detail: (id: string) => `/dashboard/user-sale/${id}/detail`,
    },

    chat: {
        list: () => '/dashboard/chat',
        detail: (id: string) => `/dashboard/chat/${id}/detail`,
    },
    userGroup: {
        list: () => '/dashboard/user-group',
        detail: (id: string) => `/dashboard/user-group/${id}/detail`,
    },

    advertising: {
        list: () => '/dashboard/advertising',
        detail: (id: string) => `/dashboard/advertising/${id}/detail`,
        edit: (id: string) => `/dashboard/advertising/${id}/edit`,
        create: () => '/dashboard/advertising/create',
    },
    userSubscription: {
        list: () => '/dashboard/user-subscription',
        detail: (id: string) => `/dashboard/user-subscription/${id}/detail`,
    },
    subscription: {
        list: () => '/dashboard/subscription',
        create: () => '/dashboard/subscription/create',
        edit: (id: string) => `/dashboard/subscription/${id}/edit`,
        detail: (id: string) => `/dashboard/subscription/${id}/detail`,
    },
    single: {
        list: () => '/dashboard/single',
    },
};
