const mongoose = require("mongoose");
const Company = require("../models/Company");
const Job = require("../models/Job");
const ObjectId = mongoose.Types.ObjectId;

exports.getJobsService = async (filters, queries) => {
  const jobs = await Job.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy)
    .populate({
      path: "managerName",
      select: "-password -__v -createdAt -updatedAt -role -status",
    });

  const total = await Job.countDocuments(filters);
  const page = Math.ceil(total / queries.limit) || 1;

  return { total, count: jobs.length, page, jobs };
};

exports.getJobByIdService = async (id) => {
  const job = await Job.findOne({ _id: id })
    // populate managerName without password
    .populate({
      path: "managerName",
      select: "-password -__v -createdAt -updatedAt -role -status",
    });
  // .populate("suppliledBy.id")
  // .populate("brand.id");
  return job;
};

exports.createJobService = async (data) => {
  const job = await Job.create(data);
  const result = await Job.findOne({ _id: job._id })
    .select("-applications")
    .populate({
      path: "companyInfo",
      select: "-jobPosts",
      populate: {
        path: "managerName",
        select:
          "-password -__v -createdAt -updatedAt -role -status -appliedJobs",
      },
    });
  const company = await Company.findOne({ _id: job.companyInfo._id });
  company.jobPosts.push(job._id);
  await company.save({
    validateBeforeSave: false,
  });
  //push the jobPost in companyInfo's Job post array

  return result;
};

exports.updateJobService = async (jobId, data) => {
  const result = await Job.updateOne(
    { _id: jobId },
    { $set: data },
    {
      runValidators: true,
    }
  );
  return result;
};

// exports.updateProductByIdService = async (productId, data) => {
//   const result = await Stock.updateOne(
//     { _id: productId },
//     { $inc: data },
//     {
//       runValidators: true,
//     }
//   );

//   // const product = await Product.findById(productId);
//   // const result = await product.set(data).save();
//   return result;
// };

// exports.bulkUpdateProductService = async (data) => {
//   // console.log(data.ids,data.data)
//   // const result = await Product.updateMany({ _id: data.ids }, data.data, {
//   //     runValidators: true
//   // });

//   const products = [];

//   data.ids.forEach((product) => {
//     products.push(Stock.updateOne({ _id: product.id }, product.data));
//   });

//   const result = await Promise.all(products);
//   console.log(result);

//   return result;
// };

// exports.deleteProductByIdService = async (id) => {
//   const result = await Stock.deleteOne({ _id: id });
//   return result;
// };

// exports.bulkDeleteProductService = async (ids) => {
//   const result = await Stock.deleteMany({ _id: ids });

//   return result;
// };
