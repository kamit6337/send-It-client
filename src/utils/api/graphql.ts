import { GraphQLClient, RequestDocument } from "graphql-request";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import environment from "../environment";
import getAuthToken from "./getAuthToken";

const endpoint = `${environment.SERVER_URL}/graphql`;

type RESULT = {
  dataQuery: object;
  [key: string]: any; // Index signature to allow any string key
};

const getGraphql = async (
  schema: RequestDocument | TypedDocumentNode<unknown, object>,
  dataQuery: string,
  variables?: object | undefined
) => {
  try {
    const token = getAuthToken();

    const client = new GraphQLClient(endpoint, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const response = (await client.request(schema, variables)) as RESULT;

    if (response[dataQuery] === undefined) {
      throw new Error(
        `Data query '${dataQuery}' not found in GraphQL response.`
      );
    }

    return response[dataQuery];
  } catch (error) {
    const parseError = JSON.parse(JSON.stringify(error));

    const err = parseError?.response?.errors[0];

    throw new Error(err?.message || err || "Something went wrong");
  }
};

export default getGraphql;
