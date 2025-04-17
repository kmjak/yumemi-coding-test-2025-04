/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from '../types/models/graphql/GraphqlSchema';
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateYumemiCodingTest202504 =
  /* GraphQL */ `subscription OnCreateYumemiCodingTest202504(
  $roomId: String
  $prefCodes: [Int]
) {
  onCreateYumemiCodingTest202504(roomId: $roomId, prefCodes: $prefCodes) {
    roomId
    prefCodes
    __typename
  }
}
` as GeneratedSubscription<
    APITypes.OnCreateYumemiCodingTest202504SubscriptionVariables,
    APITypes.OnCreateYumemiCodingTest202504Subscription
  >;
export const onUpdateYumemiCodingTest202504 =
  /* GraphQL */ `subscription OnUpdateYumemiCodingTest202504(
  $roomId: String
  $prefCodes: [Int]
) {
  onUpdateYumemiCodingTest202504(roomId: $roomId, prefCodes: $prefCodes) {
    roomId
    prefCodes
    __typename
  }
}
` as GeneratedSubscription<
    APITypes.OnUpdateYumemiCodingTest202504SubscriptionVariables,
    APITypes.OnUpdateYumemiCodingTest202504Subscription
  >;
export const onDeleteYumemiCodingTest202504 =
  /* GraphQL */ `subscription OnDeleteYumemiCodingTest202504(
  $roomId: String
  $prefCodes: [Int]
) {
  onDeleteYumemiCodingTest202504(roomId: $roomId, prefCodes: $prefCodes) {
    roomId
    prefCodes
    __typename
  }
}
` as GeneratedSubscription<
    APITypes.OnDeleteYumemiCodingTest202504SubscriptionVariables,
    APITypes.OnDeleteYumemiCodingTest202504Subscription
  >;
