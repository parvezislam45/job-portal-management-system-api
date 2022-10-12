const {
  //   getStocksService,
  //   createStockService,
  //   getStockByIdService,
  createCompanyService,
  getCompanyByIdService,
  getCompaniesService,
} = require("../services/company.service");

exports.getCompanies = async (req, res, next) => {
  try {
    let filters = { ...req.query };
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);

    //gt ,lt ,gte .lte
    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    filters = JSON.parse(filtersString);

    const queries = {};

    if (req.query.sort) {
      // price,qunatity   -> 'price quantity'
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
      console.log(sortBy);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
      console.log(fields);
    }

    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;

      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const stocks = await getCompaniesService(filters, queries);

    res.status(200).json({
      status: "success",
      data: stocks,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get the data",
      error: error.message,
    });
  }
};

exports.getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    let company = await getCompanyByIdService(id);

    if (!company) {
      return res.status(400).json({
        status: "fail",
        error: "can't get the stock with this id",
      });
    }

    // stock = {
    //   ...stock,
    //   brand: stock.brand.id,
    //   store: stock.store.id
    // }

    res.status(400).json({
      status: "success",
      data: company,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get the company with this id",
      error: error.message,
    });
  }
};

// exports.createStock = async (req, res, next) => {
//   try {
//     // save or create

//     const result = await createStockService(req.body);

//     res.status(200).json({
//       status: "success",
//       messgae: "Stock created successfully!",
//       data: result,
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       message: " Data is not inserted ",
//       error: error.message,
//     });
//   }
// };

// exports.updateProductById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await updateProductByIdService(id, req.body);

//     res.status(200).json({
//       stauts: "success",
//       message: "Successfully updated the product"
//     })
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       message: "Couldn't update the product",
//       error: error.message,
//     });
//   }
// };

// exports.bulkUpdateProduct = async (req, res, next) => {
//   try {
//     console.log(req.body)
//     const result = await bulkUpdateProductService(req.body);

//     res.status(200).json({
//       stauts: "success",
//       message: "Successfully updated the product",
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       message: "Couldn't update the product",
//       error: error.message,
//     });
//   }
// };

// exports.deleteProductById = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const result = await deleteProductByIdService(id);

//     if (!result.deletedCount) {
//       return res.status(400).json({
//         status: "fail",
//         error: "Couldn't delete the product"
//       })
//     }

//     res.status(200).json({
//       status: "success",
//       message: "Successfully deleted the product",
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       message: "Couldn't delete the product",
//       error: error.message,
//     });
//   }
// };

// exports.bulkDeleteProduct = async (req, res, next) => {
//   try {
//     console.log(req.body)
//     const result = await bulkDeleteProductService(req.body.ids);

//     res.status(200).json({
//       stauts: "success",
//       message: "Successfully deleted the given products",
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       message: "Couldn't delete the given products",
//       error: error.message,
//     });
//   }
// };

// exports.fileUpload = async (req, res) => {
//   try {
//     res.status(200).json(req.files)
//   } catch (error) {

//   }
// }

exports.createCompany = async (req, res, next) => {
  try {
    // save or create

    const result = await createCompanyService(req.body);

    res.status(200).json({
      status: "success",
      messgae: "Company created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: " Data is not inserted ",
      error: error.message,
    });
  }
};
