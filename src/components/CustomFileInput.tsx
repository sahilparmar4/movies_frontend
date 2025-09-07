import React, { useEffect, useRef, useState } from 'react'
import { UplaodImageIcon } from './image';

interface FileInputProps {
    name: string,
    setFieldValue: (field: string, value: any) => void;
    existingFileUrl?: string
    disabled?: boolean
}

const CustomFileInput: React.FC<FileInputProps> = ({ name, setFieldValue, existingFileUrl, disabled }) => {
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleClick = () => {
        if (!disabled) {
            fileInputRef.current?.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        const file = event.target.files?.[0];
        if (file) {
            console.log("Selected file:", file);
            setFieldValue(name, file);
            setPreview(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        if (existingFileUrl) {
            setPreview(existingFileUrl);
        }
    }, [existingFileUrl]);

    return (
        <>
            <div
                onClick={handleClick}
                className="w-full max-w-md h-64 flex flex-col justify-center items-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-800/20 transition"
            >
                {
                    !preview && !existingFileUrl && (
                        <>
                            <img src={UplaodImageIcon} alt="upload icon" />
                            <p className="text-white mt-2 font-regular">Upload an image here</p>
                        </>
                    )
                }

                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                    name={name}
                    disabled={disabled}
                />
                {(preview || existingFileUrl) && (
                    <img
                        src={preview || existingFileUrl}
                        alt="Poster Preview"
                        className="mt-4 w-32 h-32 object-cover rounded"
                    />
                )}

            </div>
        </>
    )
}

export default CustomFileInput
