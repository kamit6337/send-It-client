import { gql } from "graphql-request";

export const updatePostLikeDataQuery = "updatePostLike";

const updatePostLikeSchema = gql`
  mutation UpdatePostLike($toggle: Boolean!, $id: ID!) {
    updatePostLike(toggle: $toggle, id: $id) {
      bool
      count
    }
  }
`;

export default updatePostLikeSchema;
