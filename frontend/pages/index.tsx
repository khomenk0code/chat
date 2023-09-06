import {NextPage, NextPageContext} from "next";
import {getSession, useSession} from "next-auth/react";
import {Box} from "@chakra-ui/react";
import Auth from "@/components/auth/auth";
import Chat from "@/components/chat/chat";

const Home: NextPage = () => {
    const {data: session} = useSession();

    console.log('session', session)

    const reloadSession = () => {};

    return (
       <Box>
           {session?.user.username ? <Chat/> : <Auth session={session} reloadSession={reloadSession}/>}
       </Box>
    )
};

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context)

    // if (!session) {
    //     return {
    //         redirect: {
    //             destination: '/',
    //             permanent: false,
    //         },
    //     }
    // }

    return {
        props: {
            session,
        }
    }
}


export default Home;

