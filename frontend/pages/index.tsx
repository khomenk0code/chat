import {NextPage} from "next";
import {signIn, signOut, useSession} from "next-auth/react";


const Home: NextPage = () => {
    const {data} = useSession();

    console.log('data', data)

    return (
        <>
            {data?.user ? (
                 <button onClick={() => signOut()}>Sign Out</button>
            ) : (
                <button onClick={() => signIn('google')}>Sign In</button>
            )}
            {data?.user?.name}
        </>
    )

};


export default Home;

