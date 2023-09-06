import gql from 'graphql-tag';

const userTypeDefs = gql`
    type User {
        id: String
        username: String
    }
    
    type Query {
        searchUsers(username: String): [User]
    }
    
    type Mutation {
        createUsername(username: String): CreateUsernameResponse
    }
    
    type CreateUsernameResponse {
        success: Boolean
        error: String
    }
`;

export default userTypeDefs;