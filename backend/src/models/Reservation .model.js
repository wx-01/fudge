import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    arrivalTime: {
      type: Date,
      required: true,
    },
    partySize: {
      type: Number,
      required: true,
    },
    phone: Number,
    email: String,
  },
  { timestamps: true }
);

export default mongoose.model("Reservation", reservationSchema);
