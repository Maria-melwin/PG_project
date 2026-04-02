import mongoose from "mongoose"; //http://localhost:3000/add-hostel

const hostelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    facilities: {
      type: String,
    },
    price: {
      type: String,
    },
    image: {
      type: String,
    },
    ownerId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Hostel", hostelSchema);
