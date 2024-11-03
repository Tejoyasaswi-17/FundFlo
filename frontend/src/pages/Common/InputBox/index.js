import React from 'react';

const InputBox = ({ placeholder, label, labelFontStrength }) => {
    return (
        <div className='flex flex-col items-start'>
            <div className={`${labelFontStrength ? 'text-md ' : 'text-sm'} 
                ${labelFontStrength ? 'font-bold ' : 'font-medium'} py-2`}>{label}</div>
            <input type='text' placeholder={placeholder} className='w-full px-2 py-1 border rounded-md' />
        </div>
    );
};

export default InputBox;