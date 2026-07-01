"use client"

import Link from "next/link";

const notFound = () => {
    return (
        <div>
            <div className="mt-20">
                <h1 className="text-center font-bold text-2xl">Page Not Found 404!</h1>
            </div>
            <Link href='/' className="flex mt-5 justify-center"><button className="btn btn-primary">Home</button></Link>
        </div>
    );
};

export default notFound;