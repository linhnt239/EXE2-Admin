import * as React from 'react';

import { useQuery } from '@tanstack/react-query';
import { Tag } from 'antd/lib';
import { kebabCase } from 'lodash';
import _get from 'lodash/get';

import { useLangContext } from '@/core/contexts/LangContext';

interface FieldBadgeApiProps {
    value: any;
    apiAction?: (...value: any) => any;
}

const FieldBadgeApi: React.FC<FieldBadgeApiProps> = ({ value, apiAction }) => {
    const [label, setLabel] = React.useState<string>('undefined');
    const [color, setColor] = React.useState<string>('red');
    const { locale } = useLangContext();
    const options = useQuery(['options', kebabCase(apiAction?.toString()), value], async () => {
        return apiAction ? apiAction('', true) : Promise.resolve([]);
    });

    useQuery(
        ['options', kebabCase(apiAction?.toString()), value],
        async () => {
            return apiAction ? apiAction() : Promise.resolve([]);
        },
        {
            cacheTime: Infinity,
            onSuccess: (data) => {
                const option = data.find((item: any) => item.value === value);
                if (option) {
                    setLabel(_get(option, `name.${locale}`) || option.name);
                    setColor(option.color);
                }
            },
        },
    );

    return (
        <div
            style={{
                color,
            }}
            className="font-semibold tracking-wide"
        >
            {label}
        </div>
    );
    // return <Tag color={color}>{label}</Tag>;
};

export default FieldBadgeApi;
