import InputBox from "../Common/InputBox";
import TopHeader from "../Common/TopHeader";
import UsersList from "./UsersList";


function Dashboard() {
    const users = [{ name: 'Harkirat Singh' }, { name: 'Niket Singh' }, { name: 'Abhay Singh' }];
    return (
        <div className="m-5">
            <TopHeader />
            <div className="mx-10">
                <h3 className="font-bold text-md mb-5">Your balance Rs 10,000</h3>
                <InputBox placeholder={'Search user...'} label={'Users'} labelFontStrength={true} />
                <UsersList users={users} />
            </div>
        </div>
    );
}

export default Dashboard;