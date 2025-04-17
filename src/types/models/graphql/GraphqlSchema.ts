/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateYumemiCodingTest202504Input = {
  roomId: string,
  prefCodes: Array< number | null >,
};

export type YumemiCodingTest202504 = {
  __typename: "YumemiCodingTest202504",
  roomId: string,
  prefCodes: Array< number | null >,
};

export type UpdateYumemiCodingTest202504Input = {
  roomId: string,
  prefCodes?: Array< number | null > | null,
};

export type DeleteYumemiCodingTest202504Input = {
  roomId: string,
};

export type TableYumemiCodingTest202504FilterInput = {
  roomId?: TableStringFilterInput | null,
  prefCodes?: TableIntFilterInput | null,
};

export type TableStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  size?: ModelSizeInput | null,
};

export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type TableIntFilterInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
};

export type YumemiCodingTest202504Connection = {
  __typename: "YumemiCodingTest202504Connection",
  items?:  Array<YumemiCodingTest202504 | null > | null,
  nextToken?: string | null,
};

export type CreateYumemiCodingTest202504MutationVariables = {
  input: CreateYumemiCodingTest202504Input,
};

export type CreateYumemiCodingTest202504Mutation = {
  createYumemiCodingTest202504?:  {
    __typename: "YumemiCodingTest202504",
    roomId: string,
    prefCodes: Array< number | null >,
  } | null,
};

export type UpdateYumemiCodingTest202504MutationVariables = {
  input: UpdateYumemiCodingTest202504Input,
};

export type UpdateYumemiCodingTest202504Mutation = {
  updateYumemiCodingTest202504?:  {
    __typename: "YumemiCodingTest202504",
    roomId: string,
    prefCodes: Array< number | null >,
  } | null,
};

export type DeleteYumemiCodingTest202504MutationVariables = {
  input: DeleteYumemiCodingTest202504Input,
};

export type DeleteYumemiCodingTest202504Mutation = {
  deleteYumemiCodingTest202504?:  {
    __typename: "YumemiCodingTest202504",
    roomId: string,
    prefCodes: Array< number | null >,
  } | null,
};

export type GetYumemiCodingTest202504QueryVariables = {
  roomId: string,
};

export type GetYumemiCodingTest202504Query = {
  getYumemiCodingTest202504?:  {
    __typename: "YumemiCodingTest202504",
    roomId: string,
    prefCodes: Array< number | null >,
  } | null,
};

export type ListYumemiCodingTest202504sQueryVariables = {
  filter?: TableYumemiCodingTest202504FilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListYumemiCodingTest202504sQuery = {
  listYumemiCodingTest202504s?:  {
    __typename: "YumemiCodingTest202504Connection",
    items?:  Array< {
      __typename: "YumemiCodingTest202504",
      roomId: string,
      prefCodes: Array< number | null >,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateYumemiCodingTest202504SubscriptionVariables = {
  roomId?: string | null,
  prefCodes?: Array< number | null > | null,
};

export type OnCreateYumemiCodingTest202504Subscription = {
  onCreateYumemiCodingTest202504?:  {
    __typename: "YumemiCodingTest202504",
    roomId: string,
    prefCodes: Array< number | null >,
  } | null,
};

export type OnUpdateYumemiCodingTest202504SubscriptionVariables = {
  roomId?: string | null,
  prefCodes?: Array< number | null > | null,
};

export type OnUpdateYumemiCodingTest202504Subscription = {
  onUpdateYumemiCodingTest202504?:  {
    __typename: "YumemiCodingTest202504",
    roomId: string,
    prefCodes: Array< number | null >,
  } | null,
};

export type OnDeleteYumemiCodingTest202504SubscriptionVariables = {
  roomId?: string | null,
  prefCodes?: Array< number | null > | null,
};

export type OnDeleteYumemiCodingTest202504Subscription = {
  onDeleteYumemiCodingTest202504?:  {
    __typename: "YumemiCodingTest202504",
    roomId: string,
    prefCodes: Array< number | null >,
  } | null,
};
