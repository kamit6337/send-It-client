import { gql } from "graphql-request";

export const updatePostSaveDataQuery = "updatePostSave";

const updatePostSaveSchema = gql`
  mutation UpdatePostSave($toggle: Boolean!, $id: ID!) {
    updatePostSave(toggle: $toggle, id: $id)
  }
`;

export default updatePostSaveSchema;
