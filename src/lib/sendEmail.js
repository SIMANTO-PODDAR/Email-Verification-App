export const sendEmail = async (Name, Email, EmailFor) => {

    const userInfo = {
        Name,
        Email,
        EmailFor
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/verify-email`, {
        method: "POST",
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(userInfo),
    });

};