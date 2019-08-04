import { buildSchema } from "graphql";

export default buildSchema(`
type Booking {
    _id: ID!
    eventItem: EventItem!
    user: User!
    quantity: Int!
    amount: Float!
    status: String!
    booking_description: String!
    pickup_date: String!
    return_date: String!
    warranty: Boolean!;
}
input BookingInput {
    itemID: String!
    quantity: Int!
    amount: Float!
    booking_description: String!
    pickup_date: String!
    return_date: String!
    warranty: Boolean!;
}
        type EventItem {
          _id: ID!
          item_title: String!
          description: String!
          price: Float!
          item_available:Int!
          store_address: String!
          pay_option: String!
          image_url:[String!]!
          createdAt: String
          modifiedAt: String
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
          item_available:Int!
          store_address: String!
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
          bookings:[Booking!]!
        }

        type RootMutation{
          createEvent(itemInput:ItemInput):EventItem,
          createUser(userInput:UserInput):User
          bookItem(bookingInput:BookingInput):Booking!
          cancelBooking(bookingId:ID!):EventItem!
        }

        schema{
          query: RootQuery,
          mutation: RootMutation
        }
      `);
