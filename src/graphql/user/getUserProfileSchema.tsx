import { gql } from "graphql-request";

export const getUserProfileDataQuery = "getUserProfile";

const getUserProfileSchema = gql`
  query GetUserProfile($email: String!) {
    getUserProfile(email: $email) {
      _id
      name
      email
      photo
      bg_photo
      bio
      location
      website
      messageBy
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
