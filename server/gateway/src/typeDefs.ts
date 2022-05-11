import { gql } from 'apollo-server-express';

export default gql`
    type Category {
        _id: ID
        name: String!
        slug: String!
        products: [String]
    }

    type Product {
        _id: ID
        name: String!
        slug: String!
        category: String!
        variants:[Variant]
    }

    type Variant {
        _id: ID
        name: String!
        slug: String!
        price: Float!
        stock: Int!
        commited: Int!
        availability: Int!
        category: String!
        product: String!

    }

    type Query {
        hello: String!,
        categories: [Category]
        products: [Product]
        variants: [Variant]
    }

`;