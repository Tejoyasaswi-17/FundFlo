import React from 'react';

const ProfileIcon = ({ label, background }) => {
    return (
        <div className={`rounded-full w-10 h-10 bg-${background ? background : 'gray-400'} flex justify-center items-center`}>
            <div>{label}</div>
        </div>
    );
};

export default ProfileIcon;