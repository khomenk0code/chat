import {NextPage} from "next";
import {signIn, useSession} from "next-auth/react";


const Home: NextPage = () => {
    const { data} = useSession();

    console.log('data',data)

    return(
        <>
            <button onClick={() => signIn('google')}>Sign In</button>
        </>
    )

};


export default Home;

