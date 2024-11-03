import React from 'react';

const Button = ({ label, background }) => {
    return (
        <button className={`w-full bg-${background ? background : 'black'} text-white py-1 px-2 rounded-md`} type='submit'>{label}</button>
    );
};

export default Button;