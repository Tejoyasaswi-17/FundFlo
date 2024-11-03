import BottomWarning from '../Common/BottomWarning';
import Button from '../Common/Button';
import Heading from '../Common/Heading';
import InputBox from '../Common/InputBox';
import SubHeading from '../Common/SubHeading';

function SignUp() {
    const headerLabel = "Sign up";
    const subHeaderLabel = "Enter your information to create an account";

    return (
        <div className='flex items-center justify-center text-center bg-slate-300 h-screen'>
            <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
                <Heading label={headerLabel} />
                <SubHeading label={subHeaderLabel} />
                <InputBox placeholder="Sai" label="First Name" />
                <InputBox placeholder="Sankar" label="Last Name" />
                <InputBox placeholder="saisankar@gmail.com" label="Email" />
                <InputBox placeholder="123456" label="Password" />
                <div className='pt-5 pb-3'>
                    <Button label={"Sign up"} />
                </div>
                <BottomWarning label={"Already have an account ?"} buttonText={"Sign in"} to={"/signin"} />
            </div>
        </div>
    );
}

export default SignUp;