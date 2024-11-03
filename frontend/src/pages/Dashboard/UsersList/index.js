import React, { useState } from 'react';
import ProfileIcon from '../../Common/ProfileIcon';
import Button from '../../Common/Button';

const UsersList = ({ users = [] }) => {
    const [sendMoney, setSendMoney] = useState(false);
    const handleSendMoney = () => {

    };
    return (
        <div className='flex flex-col'>
            {users?.map((user) => {
                return (
                    <div className='flex flex-row justify-between items-center' key={user.id}>
                        <div className='flex flex-row justify-between items-center my-3'>
                            <ProfileIcon />
                            <span className='ml-2'>{user.name}</span>
                        </div>
                        <div>
                            <Button label={'Send Money'} onClick={handleSendMoney}></Button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default UsersList;