import * as React from 'react';

import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation } from '@tanstack/react-query';
import { Button } from 'antd';
import joi from 'joi';
import { kebabCase } from 'lodash';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import NKForm, { NKFormType } from './NKForm';
import NKFormWrapper from './NKFormWrapper';

interface FormBuilderItem {
    name: string;
    label: string;
    type: NKFormType;
    span: 1 | 2 | 3;
    fieldProps?: any;
    isShow?: (value: any) => boolean;
    useAction?: (value: any) => any;
}

interface FormBuilderProps<T> {
    title: string;
    apiAction: (value: T) => any;
    fields: FormBuilderItem[];
    defaultValues: T;
    schema: Record<keyof T, joi.AnySchema>;
    btnLabel?: string;
    onExtraSuccessAction?: () => void;
    onExtraErrorAction?: () => void;
    isDebug?: boolean;
    isFetching?: boolean;
}

const FormBuilderCore = <T,>({
    fields,
    title,
    apiAction,
    schema,
    defaultValues,
    onExtraSuccessAction,
    onExtraErrorAction,
    btnLabel = 'Submit',
    isDebug,
}: FormBuilderProps<T>) => {
    const formMethods = useForm<any>({
        defaultValues,
        resolver: joiResolver(joi.object(schema)),
    });
    const watchValues = formMethods.watch();

    const mutate = useMutation(apiAction, {
        onSuccess: () => {
            toast.success('Call action successfully');
            onExtraSuccessAction?.();
        },
        onError: () => {
            toast.error('Call action failed');
            onExtraErrorAction?.();
        },
    });

    React.useEffect(() => {
        if (isDebug) {
            console.log('FormBuilder', formMethods.getValues());
            console.log('FormBuilder', formMethods.formState.errors);
        }
    }, [formMethods.getValues()]);

    return (
        <form
            className="fade-in flex flex-col gap-4 rounded-lg bg-white p-4"
            onSubmit={formMethods.handleSubmit((value) => {
                mutate.mutate(value);
            })}
        >
            <div className="sr-only col-span-1"></div>
            <div className="sr-only col-span-2"></div>
            <div className="sr-only col-span-3"></div>
            <div className="text-xl font-bold">{title}</div>
            <NKFormWrapper formMethods={formMethods} formActionError={mutate.error}>
                <div className="grid grid-cols-3 gap-4">
                    {fields
                        .filter((item) => (item.isShow ? item.isShow(watchValues) : true))
                        .map((item) => {
                            return (
                                <div key={kebabCase(`${item.name}-${item.label}`)} className={`col-span-${item.span} `}>
                                    <NKForm
                                        label={item.label}
                                        name={item.name}
                                        type={item.type}
                                        apiAction={item.useAction}
                                        fieldProps={item.fieldProps}
                                    />
                                </div>
                            );
                        })}
                </div>
            </NKFormWrapper>
            <Button type="primary" htmlType="submit" loading={mutate.isLoading}>
                {btnLabel}
            </Button>
        </form>
    );
};

const FormBuilder = <T,>(props: FormBuilderProps<T>) => {
    if (props.isFetching) {
        return <div>Loading...</div>;
    }

    return <FormBuilderCore {...props} />;
};

export default FormBuilder;
