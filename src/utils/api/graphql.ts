import { GraphQLClient, RequestDocument } from "graphql-request";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import environment from "../environment";
import getAuthToken from "./getAuthToken";

const endpoint = `${environment.SERVER_URL}/graphql`;

const getGraphql = async (
  schema: RequestDocument | TypedDocumentNode<unknown, object>,
  variables?: object | undefined
) => {
  try {
    const token = getAuthToken();

    const client = new GraphQLClient(endpoint, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const response = await client.request(schema, variables);

    return response;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export default getGraphql;
