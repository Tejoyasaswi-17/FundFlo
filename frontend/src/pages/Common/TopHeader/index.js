import React from 'react';
import ProfileIcon from '../ProfileIcon';

const TopHeader = () => {
    return (
        <div>
            <div className='flex flex-row items-center justify-between'>
                <div>PayTM App</div>
                <div className='flex flex-row items-center justify-center'>
                    <div className='pr-3'>Hello</div>
                    <ProfileIcon label={'UT'} />
                </div>
            </div>
            <div className='bg-black w-full h-1 my-3 opacity-10'></div>
        </div>
    );
};

export default TopHeader;