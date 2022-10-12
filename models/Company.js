const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");

// schema design
const companySchema = mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "Please provide a title for this job."],
      trim: true,
      unique: [true, "Company must be unique"],
      lowercase: true,
      minLength: [3, "Title must be at least 3 characters."],
      maxLenght: [100, "Title is too large"],
    },
    managerName: {
      type: ObjectId,
      ref: "User",
      unique: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    companyWebsite: {
      type: String,
      required: [true, "Please provide a company website."],
      validate: [validator.isURL, "Please provide a valid url"],
    },
    jobPosts: [
      {
        id: {
          type: ObjectId,
          ref: "Job",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

companySchema.pre("save", function (next) {
  //this ->
  console.log(" Before saving data");
  if (this.quantity == 0) {
    this.status = "out-of-stock";
  }

  next();
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
