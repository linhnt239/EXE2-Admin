import * as React from 'react';

import { DeleteOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, UploadFile } from 'antd';
import { Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import { Controller, useFormContext } from 'react-hook-form';
import { PhotoProvider, PhotoView } from 'react-photo-view';

import { uploadFileApi } from '@/core/api/upload-file.api';

import NKFieldWrapper from './NKFieldWrapper';

interface NKUploadMultipleImageProps {
    name: string;
    label: string;
    isShow?: boolean;
    labelClassName?: string;
    maxCount?: number;
    fieldProps?: any;
}

const NKUploadMultipleImage: React.FC<NKUploadMultipleImageProps> = ({ label, name, isShow = true, labelClassName, fieldProps = {}, ...rest }) => {
    const [images, setImages] = React.useState<string[]>([]);
    const formMethods = useFormContext();

    React.useEffect(() => {
        if (!images.length) {
            const values = formMethods.getValues(name);
            if (values) {
                setImages(values);
            }
        }
    }, [images]);

    const uploadMutation = useMutation((file: File) => {
        return uploadFileApi.v1UploadFile(file);
    });

    const uploadButton = (
        <div>
            {uploadMutation.isLoading ? <LoadingOutlined rev="" /> : <PlusOutlined rev="" />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <NKFieldWrapper className={labelClassName} isShow={isShow} label={label} name={name}>
            <div className="flex flex-wrap gap-4">
                <div className="h-[100px] w-[100px]">
                    <Controller
                        name={name}
                        control={formMethods.control}
                        render={({ field }) => (
                            <Upload
                                name={field.name}
                                multiple
                                listType="picture-card"
                                showUploadList={false}
                                {...rest}
                                action={async (file) => {
                                    const url = await uploadMutation.mutateAsync(file);

                                    const newImages = [...images, url];
                                    setImages(newImages);
                                    field.onChange(newImages);
                                    return url;
                                }}
                            >
                                {uploadButton}
                            </Upload>
                        )}
                    />
                </div>
                <PhotoProvider speed={() => 200} maskOpacity={0.7}>
                    {images.map((image, index) => (
                        <div key={index} className="relative inline-block h-[100px] w-[100px]">
                            <div
                                className="absolute right-1 top-1 z-10"
                                onClick={() => {
                                    const newImages = [...images];
                                    newImages.splice(index, 1);
                                    setImages(newImages);
                                    formMethods.setValue(name, newImages);
                                }}
                            >
                                <Button danger type="primary" size="small" icon={<DeleteOutlined rev="" />} />
                            </div>
                            <PhotoView src={image} key={index}>
                                <img src={image} alt={`${image}`} className="h-full w-full" />
                            </PhotoView>
                        </div>
                    ))}
                </PhotoProvider>
            </div>
        </NKFieldWrapper>
    );
};

export default NKUploadMultipleImage;
