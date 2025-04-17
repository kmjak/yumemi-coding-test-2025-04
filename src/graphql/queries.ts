/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../types/models/graphql/GraphqlSchema";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getYumemiCodingTest202504 = /* GraphQL */ `query GetYumemiCodingTest202504($roomId: String!) {
  getYumemiCodingTest202504(roomId: $roomId) {
    roomId
    prefCodes
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetYumemiCodingTest202504QueryVariables,
  APITypes.GetYumemiCodingTest202504Query
>;
export const listYumemiCodingTest202504s = /* GraphQL */ `query ListYumemiCodingTest202504s(
  $filter: TableYumemiCodingTest202504FilterInput
  $limit: Int
  $nextToken: String
) {
  listYumemiCodingTest202504s(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      roomId
      prefCodes
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListYumemiCodingTest202504sQueryVariables,
  APITypes.ListYumemiCodingTest202504sQuery
>;
