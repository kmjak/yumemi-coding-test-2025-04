/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../types/models/graphql/GraphqlSchema";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createYumemiCodingTest202504 = /* GraphQL */ `mutation CreateYumemiCodingTest202504(
  $input: CreateYumemiCodingTest202504Input!
) {
  createYumemiCodingTest202504(input: $input) {
    roomId
    prefCodes
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateYumemiCodingTest202504MutationVariables,
  APITypes.CreateYumemiCodingTest202504Mutation
>;
export const updateYumemiCodingTest202504 = /* GraphQL */ `mutation UpdateYumemiCodingTest202504(
  $input: UpdateYumemiCodingTest202504Input!
) {
  updateYumemiCodingTest202504(input: $input) {
    roomId
    prefCodes
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateYumemiCodingTest202504MutationVariables,
  APITypes.UpdateYumemiCodingTest202504Mutation
>;
export const deleteYumemiCodingTest202504 = /* GraphQL */ `mutation DeleteYumemiCodingTest202504(
  $input: DeleteYumemiCodingTest202504Input!
) {
  deleteYumemiCodingTest202504(input: $input) {
    roomId
    prefCodes
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteYumemiCodingTest202504MutationVariables,
  APITypes.DeleteYumemiCodingTest202504Mutation
>;
