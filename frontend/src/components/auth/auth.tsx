import React, {useState} from "react";
import {Button, Center, Image, Input, Stack, Text} from "@chakra-ui/react";
import {signIn} from "next-auth/react";
import {Session} from "next-auth";
import {useMutation} from "@apollo/client";
import {CreateUsernameData, CreateUsernameVariables} from "@/utils/types";
import UserOperations from "@/graphql/operations/user";

interface IAuthProps {
    session: Session | null;
    reloadSession: () => void;
}



const Auth: React.FC<IAuthProps> = ({session, reloadSession}) => {

    const [username, setUsername] = useState<string>("");

    const [createUsername, { data, loading, error }] = useMutation<
        CreateUsernameData,
        CreateUsernameVariables
    >(UserOperations.Mutations.createUsername);

    console.log("Here is the data", data, loading, error)

    const onSubmit = async () => {
        if (!username) return;

        try {
          await  createUsername({ variables: { username } })
        } catch (e) {
            console.error("OnSubmit error", e);
        }
    };

    return (
        <Center height="100vh">
            <Stack spacing={6} align="center">
                {session ? (
                    <>
                        <Text fontSize="3xl">Create a Nickname</Text>
                        <Input
                            placeholder="Enter a nickname"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Button width="100%" onClick={onSubmit}>Chat now!</Button>
                    </>
                ) : (
                    <>
                        <Text fontSize="3xl">MessengerQL</Text>
                        <Button
                            onClick={() => signIn('google')} leftIcon={
                            <Image alt="https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/image8-2.jpg?width=595&height=400&name=image8-2.jpg" height='20px' src='/images/googlelogo.png'/>}
                        >Continue with Google</Button>
                    </>
                )}
            </Stack>
        </Center>
    );
};

export default Auth;
