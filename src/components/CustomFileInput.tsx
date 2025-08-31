import React, { useRef } from 'react'
import { UplaodImageIcon } from './image';

interface FileInputProps {
    name: string,
    setFieldValue: (field: string, value: any) => void;
}   

const CustomFileInput: React.FC<FileInputProps> = ({name, setFieldValue}) => {

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log("Selected file:", file);
            setFieldValue(name, file);
        }
    };
    return (
        <>
            <div
                onClick={handleClick}
                className="w-full max-w-md h-64 flex flex-col justify-center items-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-800/20 transition"
            >
                <img src={UplaodImageIcon} alt="upload icon" />
                <p className="text-white mt-2 font-regular">Upload an image here</p>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                    name={name}
                />
            </div>
        </>
    )
}

export default CustomFileInput
