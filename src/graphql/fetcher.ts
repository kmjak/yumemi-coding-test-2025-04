import { gql } from 'graphql-request';

export const createRoom = gql`
  mutation createRoom($createyumemicodingtest202504input: CreateYumemiCodingTest202504Input!) {
    createYumemiCodingTest202504(input: $createyumemicodingtest202504input) {
      roomId
      prefCodes
    }
  }
`;

export const updateRoom = gql`
  mutation updateRoom($updateyumemicodingtest202504input: UpdateYumemiCodingTest202504Input!) {
    updateYumemiCodingTest202504(input: $updateyumemicodingtest202504input) {
      prefCodes
      roomId
    }
  }
`;

export const getPrefCodes = gql`
  query GetPrefCodes($roomId: String!) {
    getYumemiCodingTest202504(roomId: $roomId) {
      prefCodes
    }
  }
`;
