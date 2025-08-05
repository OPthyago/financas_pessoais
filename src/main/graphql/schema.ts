import { gql } from 'graphql-tag';

export default gql`
  "Represents a Category for a financial item."
  type Category {
    "The unique identifier of the category."
    id: ID!

    "The description of the category (e.g., Housing, Food)."
    description: String!
  }

  "Defines all available read operations (queries) in the API."
  type Query {
    "Fetches a specific category by its ID."
    category(id: ID!): Category
  }

  "Define all available write operations (mutations) in the API"
  type Mutation {
    "Add a new Category."
    addCategory(description: String!, id: ID): Category 
  }
`;
