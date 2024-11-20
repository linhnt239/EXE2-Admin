import * as React from 'react';

interface FieldRichTextProps {
    value: any;
}

const FieldRichText: React.FC<FieldRichTextProps> = ({ value }) => {
    return (
        <div
            dangerouslySetInnerHTML={{ __html: value }}
            className="prose prose-img:rounded-xl prose-img:m-0 prose-img:w-full text-base font-normal"
        />
    );
};

export default FieldRichText;
