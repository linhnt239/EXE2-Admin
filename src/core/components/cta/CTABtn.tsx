import * as React from 'react';

import { useMutation } from '@tanstack/react-query';
import { Button } from 'antd';
import { Popconfirm } from 'antd/lib';
import _get from 'lodash/get';
import { toast } from 'react-toastify';

interface CTAButtonProps {
    ctaApi: () => any;
    children: React.ReactNode;
    locale?: string;
    isConfirm?: boolean;
    confirmMessage?: string;
    extraOnSuccess?: () => void;
    extraOnError?: () => void;
}

const CTAButton: React.FC<CTAButtonProps> = ({
    children,
    extraOnSuccess,
    extraOnError,
    ctaApi,
    locale = 'en',
    confirmMessage = 'Are you sure?',
    isConfirm = false,
}) => {
    const ctaMutation = useMutation(ctaApi, {
        onSuccess: (data) => {
            const message = _get(data, `translation.${locale}`, 'Call to action successfully');
            toast.success(message);
            extraOnSuccess && extraOnSuccess();
        },
        onError: (error) => {
            const message = _get(error, `data.translation.${locale}`, 'Call to action failed');
            toast.error(message);
            extraOnError && extraOnError();
        },
    });

    if (!isConfirm) {
        return <div onClick={() => ctaMutation.mutate()}>{children}</div>;
    }

    return (
        <Popconfirm title={confirmMessage} onConfirm={() => ctaMutation.mutate()}>
            {children}
        </Popconfirm>
    );
};

export default CTAButton;
