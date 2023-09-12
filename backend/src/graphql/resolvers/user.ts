
const UserResolvers = {
    Query: {
        searchUsers: () => {

        },
    },
    Mutation: {
        createUsername: (_: any, args: {username: string}, context: any) => {
            const {username} = args;
            // console.log('username',username)
            // console.log('CONTEXT FROM MUTATION',context)
        },
    },
    // Subscription: {},
}

export default UserResolvers;