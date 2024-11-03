import BottomWarning from "../Common/BottomWarning";
import Button from "../Common/Button";
import Heading from "../Common/Heading";
import InputBox from "../Common/InputBox";
import SubHeading from "../Common/SubHeading";

function SignIn() {
    return (
        <div className='flex items-center justify-center text-center bg-slate-300 h-screen'>
            <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
                <Heading label={"Sign in"} />
                <SubHeading label={"Enter your credentials to access your account"} />
                <InputBox placeholder={'saisankar@gmail.com'} label={'Email'} />
                <InputBox placeholder={'123456'} label={'Password'} />
                <div className='pt-5 pb-3'>
                    <Button label={"Sign in"} />
                </div>
                <BottomWarning label={"Don't have an account"} buttonText={'Sign up'} to={'/signup'} />
            </div>
        </div>
    );
}

export default SignIn;