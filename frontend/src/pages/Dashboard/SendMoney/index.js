import Button from "../../Common/Button";
import Heading from "../../Common/Heading";
import InputBox from "../../Common/InputBox";
import ProfileIcon from "../../Common/ProfileIcon";

function SendMoney() {
    return (
        <div className="bg-gray-400 flex items-center justify-center h-screen">
            <div className="bg-white w-80 text-center h-max p-5 rounded-lg">
                <Heading label={"Send Money"} />
                <div className="flex flex-row items-center m-5">
                    <ProfileIcon label={'U'} background={"green-500"} />
                    <div className="ml-3">Friends Name</div>
                </div>
                <InputBox placeholder={"Enter amount"} label={"Amount (in Rs)"} />
                <div className="mt-5">
                    <Button label={"Initiate transfer"} background={"green-500"} />
                </div>
            </div>
        </div>
    );
}

export default SendMoney;