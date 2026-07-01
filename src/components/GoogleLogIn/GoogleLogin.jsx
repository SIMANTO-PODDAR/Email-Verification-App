"use client"

import { authClient } from '@/lib/auth-client';

const GoogleLogin = () => {
    const handleGoogleLogIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
    }

    return (
        <div className='flex justify-center my-3'>
            <button className='btn w-f text-green-950 bg-indigo-400' onClick={handleGoogleLogIn}>Log In With Google</button>
        </div>
    );
};

export default GoogleLogin;