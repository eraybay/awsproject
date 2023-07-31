/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRestaurant = /* GraphQL */ `
  query GetRestaurant($id: ID!) {
    getRestaurant(id: $id) {
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
export const listRestaurants = /* GraphQL */ `
  query ListRestaurants(
    $filter: ModelRestaurantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRestaurants(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const restaurantByUsername = /* GraphQL */ `
  query RestaurantByUsername(
    $username: String!
    $sortDirection: ModelSortDirection
    $filter: ModelRestaurantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    restaurantByUsername(
      username: $username
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        message
        restaurant {
          id
          title
          content
          username
          generalImages
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
      nextToken
      __typename
    }
  }
`;
export const commentsByRestaurantID = /* GraphQL */ `
  query CommentsByRestaurantID(
    $restaurantID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsByRestaurantID(
      restaurantID: $restaurantID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        message
        restaurant {
          id
          title
          content
          username
          generalImages
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
      nextToken
      __typename
    }
  }
`;
export const getRate = /* GraphQL */ `
  query GetRate($id: ID!) {
    getRate(id: $id) {
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
export const listRates = /* GraphQL */ `
  query ListRates(
    $filter: ModelRateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        rate_value
        restaurant {
          id
          title
          content
          username
          generalImages
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
      nextToken
      __typename
    }
  }
`;
export const ratesByRestaurantID = /* GraphQL */ `
  query RatesByRestaurantID(
    $restaurantID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ratesByRestaurantID(
      restaurantID: $restaurantID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        rate_value
        restaurant {
          id
          title
          content
          username
          generalImages
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
      nextToken
      __typename
    }
  }
`;
