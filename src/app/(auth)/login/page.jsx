"use client"
import GoogleLogin from '@/components/GoogleLogIn/GoogleLogin';
import { authClient } from '@/lib/auth-client';
import { sendEmail } from '@/lib/sendEmail';
import { toast } from 'react-toastify';

const LogInPage = () => {

    const handleLogIn = async (e) => {

        e.preventDefault();
        const iptEmail = e.target.email.value;
        const iptPassword = e.target.password.value;

        const { data, error } = await authClient.signIn.email({
            email: iptEmail,
            password: iptPassword,
            callbackURL: '/profile'
        })
        if (data) {
            toast.success('Log In Successfully!')

            sendEmail(undefined, iptEmail, 'LogIn');
        }

        if (!data) {
            toast.error(error.message)
        }

    }

    return (
        <div>
            <p className="text-center text-2xl font-bold">Log In:</p>
            <p className='text-center font-bold text-green-300 text-[12px]'>You must be logged in to view Profile!</p>

            <div className='flex justify-center'>
                <form className='grid gap-5' onSubmit={handleLogIn}>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Email</legend>
                        <input name='email' type="email" className="input" placeholder="Email" autoComplete='username' required />
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Password</legend>
                        <input name='password' type="password" className="input" placeholder="Password" autoComplete='current-password' required />
                    </fieldset>

                    <button type='submit' className='btn btn-primary'>Log In</button>
                </form>

            </div>

            <GoogleLogin />
        </div>
    );
};

export default LogInPage;