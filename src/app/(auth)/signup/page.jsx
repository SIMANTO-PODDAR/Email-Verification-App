'use client'

import GoogleLogin from '@/components/GoogleLogIn/GoogleLogin';
import { authClient } from '@/lib/auth-client';
import { sendEmail } from '@/lib/sendEmail';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const SignUpPage = () => {
    const router = useRouter();

    const handleSignUp = async (e) => {
        e.preventDefault();
        const iptName = e.target.name.value;
        const iptEmail = e.target.email.value;
        const iptPassword = e.target.password.value;

        const { data, error } = await authClient.signUp.email({
            name: iptName,
            email: iptEmail,
            password: iptPassword,
        })

        if (data) {
            toast.success('Sign Up successful')
            router.push("/profile");

            sendEmail(iptName, iptEmail, 'SignUp');
        }

        if (!data) {
            toast.error(error.message)
        }

    }

    return (
        <div>
            <p className='text-center text-2xl font-bold'>Sign Up:</p>

            <div className='flex justify-center'>
                <form className='grid gap-5' onSubmit={handleSignUp}>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Name</legend>
                        <input name='name' type="text" className="input" placeholder="Name" required />
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Email</legend>
                        <input name='email' type="email" className="input" placeholder="Email" autoComplete='username' required />
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Password</legend>
                        <input name='password' type="password" className="input" placeholder="Password" autoComplete='current-password' required />
                    </fieldset>

                    <button type='submit' className='btn btn-primary'>Sign Up</button>
                </form>

            </div>

            <GoogleLogin />
        </div>
    );
};

export default SignUpPage;