/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRestaurant = /* GraphQL */ `
  subscription OnCreateRestaurant(
    $filter: ModelSubscriptionRestaurantFilterInput
    $username: String
  ) {
    onCreateRestaurant(filter: $filter, username: $username) {
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
export const onUpdateRestaurant = /* GraphQL */ `
  subscription OnUpdateRestaurant(
    $filter: ModelSubscriptionRestaurantFilterInput
    $username: String
  ) {
    onUpdateRestaurant(filter: $filter, username: $username) {
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
export const onDeleteRestaurant = /* GraphQL */ `
  subscription OnDeleteRestaurant(
    $filter: ModelSubscriptionRestaurantFilterInput
    $username: String
  ) {
    onDeleteRestaurant(filter: $filter, username: $username) {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment(
    $filter: ModelSubscriptionCommentFilterInput
    $postedBy: String
  ) {
    onCreateComment(filter: $filter, postedBy: $postedBy) {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment(
    $filter: ModelSubscriptionCommentFilterInput
    $postedBy: String
  ) {
    onUpdateComment(filter: $filter, postedBy: $postedBy) {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment(
    $filter: ModelSubscriptionCommentFilterInput
    $postedBy: String
  ) {
    onDeleteComment(filter: $filter, postedBy: $postedBy) {
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
export const onCreateRate = /* GraphQL */ `
  subscription OnCreateRate(
    $filter: ModelSubscriptionRateFilterInput
    $ratedBy: String
  ) {
    onCreateRate(filter: $filter, ratedBy: $ratedBy) {
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
export const onUpdateRate = /* GraphQL */ `
  subscription OnUpdateRate(
    $filter: ModelSubscriptionRateFilterInput
    $ratedBy: String
  ) {
    onUpdateRate(filter: $filter, ratedBy: $ratedBy) {
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
export const onDeleteRate = /* GraphQL */ `
  subscription OnDeleteRate(
    $filter: ModelSubscriptionRateFilterInput
    $ratedBy: String
  ) {
    onDeleteRate(filter: $filter, ratedBy: $ratedBy) {
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
