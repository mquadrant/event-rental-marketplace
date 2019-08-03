import { buildSchema } from "graphql";

export default buildSchema(`
        type EventItem {
          _id: ID!
          item_title: String!
          description: String!
          price: Float!
          store_address: String!
          service_type: String!
          pay_option: String!
          image_url:[String!]!
          createdAt: String!
          modifiedAt: String!
          creator: User!
        }

        type AddressDetail  {
          address: String
          country: String
          state: String
          city: String
      }

        type Social {
          facebook: String
          twitter: String
          instagram: String
      }

        type User {
          _id: ID!
          firstName: String!
          lastName: String!
          email: String!
          password: String
          phone: String!
          bio: String
          website: String
          image_url: String
          isProvider: String!
          createdAt: String
          addressDetail: AddressDetail,
          social: Social
          createdItems:[EventItem!]
        }

        input ItemInput {
          item_title: String!
          description: String!
          price: Float!
          store_address: String!
          service_type: String!
          pay_option: String!
          image_url:[String!]!
          creator: String!
        }

        input AddressDetailInput  {
          address: String
          country: String
          state: String
          city: String
      }

        input SocialInput {
          facebook: String
          twitter: String
          instagram: String
      }
        input UserInput {
          firstName: String!
          lastName: String!
          email: String!
          password: String!
          phone: String!
          bio: String
          website: String
          isProvider: Boolean!
          image_url: String
          social: SocialInput
          addressDetail: AddressDetailInput
        }

        type RootQuery {
          eventItems:[EventItem!]!
        }

        type RootMutation{
          createEvent(itemInput:ItemInput):EventItem,
          createUser(userInput:UserInput):User
        }

        schema{
          query: RootQuery,
          mutation: RootMutation
        }
      `);
