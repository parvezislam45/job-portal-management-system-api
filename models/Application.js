const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const valid = require("validator");

// schema design
const applicationSchema = mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "Please provide a title for this job."],
      trim: true,
      // unique: [true, "Title must be unique"],
      lowercase: true,
      minLength: [3, "Title must be at least 3 characters."],
      maxLenght: [100, "Title is too large"],
    },
    managerName: {
      type: String,
      required: [true, "Please provide a position for this job."],
      trim: true,
      // unique: [true, "Position must be unique"],
      lowercase: true,
      minLength: [3, "Name must be at least 3 characters."],
      maxLenght: [100, "Name is too large"],
    },
    location: {
      type: Number,
      required: true,
      min: [0, "Salary must be greater than or equal to zero"],
    },
    companyWebsite: {
      type: String,
      required: [true, "Please provide a company website."],
    },
    jobNature: {
      type: String,
      required: [true, "Please provide the nature of the job."],
      enum: ["remote", "onsite"],
    },
    companyName: {
      type: String,
      required: [true, "Please provide the name of your company."],
      trim: true,
      // unique: [true, "Position must be unique"],
      lowercase: true,
      minLength: [3, "Name must be at least 3 characters."],
      maxLenght: [100, "Name is too large"],
    },
    jobDescription: {
      type: String,
      required: true,
    },

    imageURLs: [
      {
        type: String,
        required: true,
        validate: [valid.isURL, "wrong url"],
      },
    ],

    category: {
      type: String,
      required: true,
    },

    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

// applicationSchema.pre("save", function (next) {
//   //this ->
//   console.log(" Before saving data");
//   if (this.quantity == 0) {
//     this.status = "out-of-stock";
//   }

//   next();
// });

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
