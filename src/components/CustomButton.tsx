import React from 'react'
import { useNavigate } from 'react-router-dom';

interface customButtonProps {
  type: "button" | "submit" | "reset";
  title: string;
  customClasses?: string;
  isDisabled?: boolean;
  path?: string | ""
}

const CustomButton: React.FC<customButtonProps> = ({ type, title, customClasses, isDisabled, path }) => {
  const navigate = useNavigate();
  return (
    <>
      <button type={type} disabled={isDisabled} className={`p-2 rounded-[10px] ${title === "Cancel" ? "bg-transparent border border-text-primary" : "bg-bg-btn-primary"} text-text-primary w-auto disabled:opacity-50 ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"} ${customClasses}`} onClick={() => path && navigate(`${path}`)}>
        {title}
      </button>
    </>
  )
}

export default CustomButton
