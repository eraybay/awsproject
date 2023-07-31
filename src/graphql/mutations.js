/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRestaurant = /* GraphQL */ `
  mutation CreateRestaurant(
    $input: CreateRestaurantInput!
    $condition: ModelRestaurantConditionInput
  ) {
    createRestaurant(input: $input, condition: $condition) {
      id
      title
      content
      username
      generalImages
      comments {
        items {
          id
          message
          restaurantID
          createdAt
          updatedAt
          postedBy
          __typename
        }
        nextToken
        __typename
      }
      rates {
        items {
          id
          rate_value
          restaurantID
          createdAt
          updatedAt
          ratedBy
          __typename
        }
        nextToken
        __typename
      }
      lat
      lng
      price
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateRestaurant = /* GraphQL */ `
  mutation UpdateRestaurant(
    $input: UpdateRestaurantInput!
    $condition: ModelRestaurantConditionInput
  ) {
    updateRestaurant(input: $input, condition: $condition) {
      id
      title
      content
      username
      generalImages
      comments {
        items {
          id
          message
          restaurantID
          createdAt
          updatedAt
          postedBy
          __typename
        }
        nextToken
        __typename
      }
      rates {
        items {
          id
          rate_value
          restaurantID
          createdAt
          updatedAt
          ratedBy
          __typename
        }
        nextToken
        __typename
      }
      lat
      lng
      price
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteRestaurant = /* GraphQL */ `
  mutation DeleteRestaurant(
    $input: DeleteRestaurantInput!
    $condition: ModelRestaurantConditionInput
  ) {
    deleteRestaurant(input: $input, condition: $condition) {
      id
      title
      content
      username
      generalImages
      comments {
        items {
          id
          message
          restaurantID
          createdAt
          updatedAt
          postedBy
          __typename
        }
        nextToken
        __typename
      }
      rates {
        items {
          id
          rate_value
          restaurantID
          createdAt
          updatedAt
          ratedBy
          __typename
        }
        nextToken
        __typename
      }
      lat
      lng
      price
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      message
      restaurant {
        id
        title
        content
        username
        generalImages
        comments {
          nextToken
          __typename
        }
        rates {
          nextToken
          __typename
        }
        lat
        lng
        price
        createdAt
        updatedAt
        __typename
      }
      restaurantID
      createdAt
      updatedAt
      postedBy
      __typename
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      message
      restaurant {
        id
        title
        content
        username
        generalImages
        comments {
          nextToken
          __typename
        }
        rates {
          nextToken
          __typename
        }
        lat
        lng
        price
        createdAt
        updatedAt
        __typename
      }
      restaurantID
      createdAt
      updatedAt
      postedBy
      __typename
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      message
      restaurant {
        id
        title
        content
        username
        generalImages
        comments {
          nextToken
          __typename
        }
        rates {
          nextToken
          __typename
        }
        lat
        lng
        price
        createdAt
        updatedAt
        __typename
      }
      restaurantID
      createdAt
      updatedAt
      postedBy
      __typename
    }
  }
`;
export const createRate = /* GraphQL */ `
  mutation CreateRate(
    $input: CreateRateInput!
    $condition: ModelRateConditionInput
  ) {
    createRate(input: $input, condition: $condition) {
      id
      rate_value
      restaurant {
        id
        title
        content
        username
        generalImages
        comments {
          nextToken
          __typename
        }
        rates {
          nextToken
          __typename
        }
        lat
        lng
        price
        createdAt
        updatedAt
        __typename
      }
      restaurantID
      createdAt
      updatedAt
      ratedBy
      __typename
    }
  }
`;
export const updateRate = /* GraphQL */ `
  mutation UpdateRate(
    $input: UpdateRateInput!
    $condition: ModelRateConditionInput
  ) {
    updateRate(input: $input, condition: $condition) {
      id
      rate_value
      restaurant {
        id
        title
        content
        username
        generalImages
        comments {
          nextToken
          __typename
        }
        rates {
          nextToken
          __typename
        }
        lat
        lng
        price
        createdAt
        updatedAt
        __typename
      }
      restaurantID
      createdAt
      updatedAt
      ratedBy
      __typename
    }
  }
`;
export const deleteRate = /* GraphQL */ `
  mutation DeleteRate(
    $input: DeleteRateInput!
    $condition: ModelRateConditionInput
  ) {
    deleteRate(input: $input, condition: $condition) {
      id
      rate_value
      restaurant {
        id
        title
        content
        username
        generalImages
        comments {
          nextToken
          __typename
        }
        rates {
          nextToken
          __typename
        }
        lat
        lng
        price
        createdAt
        updatedAt
        __typename
      }
      restaurantID
      createdAt
      updatedAt
      ratedBy
      __typename
    }
  }
`;
