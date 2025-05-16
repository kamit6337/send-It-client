import { gql } from "graphql-request";

export const updateUserProfileDataQuery = "updateUserProfile";

const updateUserProfileSchema = gql`
  mutation UpdateUserProfile(
    $name: String!
    $photo: String!
    $bg_photo: String!
    $bio: String!
    $location: String!
    $website: String!
  ) {
    updateUserProfile(
      name: $name
      photo: $photo
      bg_photo: $bg_photo
      bio: $bio
      location: $location
      website: $website
    ) {
      _id
      name
      email
      photo
      bg_photo
      bio
      location
      website
      createdAt
      updatedAt
    }
  }
`;

export default updateUserProfileSchema;
