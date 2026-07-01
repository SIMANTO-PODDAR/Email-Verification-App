"use client"

import { authClient } from "@/lib/auth-client";
import Image from "next/image";

const ProfilePage = () => {

    const { data: session } = authClient.useSession()
    const user = session?.user

    return (
        <div>
            <div>
                <h1 className='text-center text-2xl my-2 underline'>Profile</h1>

                <div className="flex justify-center mt-5">
                    <div>
                        {
                            user?.emailVerified && <Image className='rounded-full my-2' loading="eager" src={user?.image} alt='user img' width={100} height={100} />
                        }
                        {
                            !user?.emailVerified && <h1 className="text-3xl">👤</h1>
                        }
                        <h1>Name:  <span>{user?.name.toUpperCase()}</span> </h1>
                        <h1>Email: <span className='italic'>{user?.email.toLowerCase()}</span> </h1>
                        <h1>Verified User: <span className={`${user?.emailVerified ? 'text-green-500' : 'text-yellow-400'}`}>
                            {user?.emailVerified ? 'Yes' : 'No'}</span>
                        </h1>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;