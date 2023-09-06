import {SessionProvider} from "next-auth/react";
import type {AppProps} from "next/app";
import {ChakraProvider} from "@chakra-ui/react";
import {theme} from "@/chakra/theme";


function App({Component, pageProps: {session, ...pageProps}}: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
        </ChakraProvider>
    );
}

export default App;