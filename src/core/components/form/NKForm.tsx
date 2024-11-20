import * as React from 'react';

import _ from 'lodash';

import NKBooleanInput from './NKBooleanInput';
import NKDatePicker from './NKDatePicker';
import NKInputNumber from './NKInputNumber';
import NKRichText from './NKRichText';
import NKSelectApiOption from './NKSelectApiOption';
import NKTextField from './NKTextField';
import NKTextareaField from './NKTextareaField';
import NKUploadImage from './NKUploadImage';
import NKUploadMultipleImage from './NKUploadMultipleImage';
import NKWatchDisplay from './NKWatchDislay';

export enum NKFormType {
    TEXT = 'text',
    PASSWORD = 'password',
    TEXTAREA = 'textarea',
    DATE = 'date',
    DATE_TIME = 'date_time',
    DATE_WEEK = 'date_week',
    DATE_MONTH = 'date_month',
    DATE_QUARTER = 'date_quarter',
    DATE_YEAR = 'date_year',
    SELECT_API_OPTION = 'select_api_option',
    UPLOAD_IMAGE = 'upload_image',
    MULTI_UPLOAD_IMAGE = 'multi_upload_image',
    NUMBER = 'number',
    BOOLEAN = 'boolean',
    RICH_TEXT = 'rich_text',
    WATCH_DISPLAY = 'watch_display',
}

interface NKFormProps {
    type: NKFormType;
    name: string;
    label: string;
    isShow?: boolean;
    fieldProps?: any;
    apiAction?: (value: any) => any;
}

const NKForm: React.FC<NKFormProps> = ({ label, name, type, apiAction, fieldProps, isShow }) => {
    switch (type) {
        case NKFormType.TEXT:
            return <NKTextField name={name} label={label} fieldProps={fieldProps} isShow={isShow} />;
        case NKFormType.TEXTAREA:
            return <NKTextareaField name={name} label={label} fieldProps={fieldProps} isShow={isShow} />;
        case NKFormType.PASSWORD:
            return <NKTextField name={name} label={label} type="password" fieldProps={fieldProps} isShow={isShow} />;
        case NKFormType.DATE:
            return <NKDatePicker name={name} label={label} fieldProps={fieldProps} isShow={isShow} />;
        case NKFormType.DATE_TIME:
            return <NKDatePicker name={name} label={label} showTime fieldProps={fieldProps} isShow={isShow} />;
        case NKFormType.DATE_WEEK:
            return <NKDatePicker name={name} label={label} picker="week" fieldProps={fieldProps} isShow={isShow} />;
        case NKFormType.DATE_MONTH:
            return <NKDatePicker name={name} label={label} picker="month" fieldProps={fieldProps} isShow={isShow} />;
        case NKFormType.DATE_QUARTER:
            return <NKDatePicker name={name} label={label} picker="quarter" fieldProps={fieldProps} isShow={isShow} />;
        case NKFormType.DATE_YEAR:
            return <NKDatePicker name={name} label={label} picker="year" fieldProps={fieldProps} isShow={isShow} />;
        case NKFormType.UPLOAD_IMAGE:
            return <NKUploadImage name={name} label={label} maxCount={1} fieldProps={fieldProps} accept="image/*" isShow={isShow} />;
        case NKFormType.NUMBER:
            return <NKInputNumber name={name} label={label} fieldProps={fieldProps} isShow={isShow} />;
        case NKFormType.MULTI_UPLOAD_IMAGE:
            return <NKUploadMultipleImage name={name} label={label} fieldProps={fieldProps} isShow={isShow} />;
        case NKFormType.BOOLEAN:
            return <NKBooleanInput name={name} label={label} fieldProps={fieldProps} isShow={isShow} />;
        case NKFormType.RICH_TEXT:
            return <NKRichText name={name} label={label} isShow={isShow} />;
        case NKFormType.WATCH_DISPLAY:
            return <NKWatchDisplay name={name} label={label} apiAction={apiAction} isShow={isShow} />;

        case NKFormType.SELECT_API_OPTION:
            return (
                <NKSelectApiOption
                    isShow={isShow}
                    name={name}
                    label={label}
                    apiAction={apiAction}
                    fieldProps={{
                        isAllOption: false,
                        ...fieldProps,
                    }}
                />
            );

        default:
            return <NKTextField name={name} label={label} />;
    }
};

export default NKForm;
