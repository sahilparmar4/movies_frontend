import React from 'react'

interface customButtonProps {
    type: "button" | "submit" | "reset";
    title: string;
    customClasses?: string;
    isDisabled?: boolean;
}

const CustomButton:React.FC<customButtonProps> = ({type, title, customClasses, isDisabled}) => {
  return (
    <>
      <button type={type} disabled={isDisabled} className={`p-2 body-sm rounded-[10px] bg-bg-btn-primary text-text-primary w-auto disabled:opacity-50 ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"} ${customClasses}`}>
        {title}
      </button>
    </>
  )
}

export default CustomButton
