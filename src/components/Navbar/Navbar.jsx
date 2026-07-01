"use client"
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { data: session } = authClient.useSession()
    const user = session?.user
    const router = useRouter();

    const funcLogOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success('Log out successfully!')
                    router.push("/login");
                },
            },
        });
    }
    return (
        <div className='flex justify-around gap-10 my-3'>
            <Link className='btn bg-blue-500' href="/">Home</Link>
            <Link className='btn bg-cyan-600' href="/profile">Profile</Link>

            <Link className={`btn bg-emerald-700`}
                href="/signup">Sign Up</Link>

            <Link className={`btn bg-green-900 ${user ? 'btn-disabled' : ''}`}
                href="/login">Log In</Link>

            <button className={`btn bg-amber-700 ${!user ? 'btn-disabled' : ''}`}
                onClick={funcLogOut} title='Click to Log Out'>Log Out</button>

        </div>
    );
};

export default Navbar;