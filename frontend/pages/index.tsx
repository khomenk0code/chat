import { Box } from "@chakra-ui/react";
import type { NextPage, NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import Chat from "@/components/chat/chat";
import Auth from "@/components/auth/auth";


const Home: NextPage = () => {
    const { data: session } = useSession();


    const reloadSession = () => {};


    return (
        <Box>
            {session && session?.user?.username ? (
                <Chat  />
            ) : (
                <Auth session={session} reloadSession={reloadSession} />
            )}
        </Box>
    );
};


export async function getServerSideProps(ctx: NextPageContext) {
    const session = await getSession(ctx);

    return {
        props: {
            session,
        },
    };
}

export default Home;