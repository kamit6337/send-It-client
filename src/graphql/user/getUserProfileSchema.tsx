import { gql } from "graphql-request";

export const getUserProfileDataQuery = "getUserProfile";

const getUserProfileSchema = gql`
  query GetUserProfile($email: String!) {
    getUserProfile(email: $email) {
      _id
      name
      email
      photo
      bio
      location
      website
      followersCount
      followingCount
      isFollowed
      userPosts
      likePosts
      replyPosts
      mediaPosts
      savePosts
      createdAt
      updatedAt
    }
  }
`;

export default getUserProfileSchema;
