import itemResolver from "./items";
import bookingResolver from "./bookings";
import userResolver from "./auth";

export default {
    ...itemResolver,
    ...bookingResolver,
    ...userResolver,
};
