const Category = require("../../models/book.model");
const Product = require("../../models/product.model");
const SubCategory = require("../../models/subCategory.model");
const { checkDuplicate } = require("../../../config/errors");
const { cloudinary } = require("../../utils/cloudinary");

// API to create category
exports.createCategory = async (req, res, next) => {
  try {
    let payload = req.body;
    if (req.files)
      for (const key in req.files) {
        const image = req.files[key][0];
        payload[`${key}`] = image.filename;
      }
    const category = await Category.create(payload);
    return res.send({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    if (error.code === 11000 || error.code === 11001)
      checkDuplicate(error, res, "Grant Category");
    else return next(error);
  }
};
// API to create product
exports.product = async (req, res, next) => {
  try {
    let payload = req.body;
    if (req.files) payload.image = [];
    for (const key in req.files) {
      if (Array.isArray(req.files[key])) {
        const images = req.files[key].map((file) => {
          payload.image.push(file.originalname);
          return file.path;
        });
      } else {
        payload.image.push(req.files[key].originalname);
        req.files[key] = req.files[key].path;
      }
    }
    const category = await Product.create(payload);
    return res.send({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    if (error.code === 11000 || error.code === 11001)
      checkDuplicate(error, res, "Grant Category");
    else return next(error);
  }
};
// API to create Sub Category
exports.subCategory = async (req, res, next) => {
  try {
    let payload = req.body;
    if (req.files)
      for (const key in req.files) {
        const image = req.files[key][0];
        payload[`${key}`] = image.filename;
      }
    const category = await SubCategory.create(payload);
    return res.send({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    if (error.code === 11000 || error.code === 11001)
      checkDuplicate(error, res, "Grant Category");
    else return next(error);
  }
};
// API to get a grant category
exports.getProductDetail = async (req, res, next) => {
  try {
    const { productID } = req.params;
    if (productID) {
      const product = await Product.findOne({ _id: productID })
        .populate("categoryId subCategoryId")
        .lean(true);

      if (product) {
        return res.json({
          success: true,
          message: "Product retrieved successfully",
          product,
        });
      } else {
        return res.status(400).send({
          success: false,
          message: "Product not found for the given ID",
        });
      }
    } else {
      return res
        .status(400)
        .send({ success: false, message: "Product ID is required" });
    }
  } catch (error) {
    return next(error);
  }
};
// API to get grant categories list
exports.listCategories = async (req, res, next) => {
  try {
    let pipeline = [
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "categoryId",
          as: "products",
        },
      },
      {
        $unwind: "$products",
      },
      {
        $lookup: {
          from: "subcategories",
          localField: "products.subCategoryId",
          foreignField: "_id",
          as: "products.subcategory",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          products: {
            productID: "$products._id",
            productName: "$products.title",
            productImage: "$products.image",
            productTag: "$products.tag",
            productIsSold: "$products.isSold",
            productDescription: "$products.description",
            subcategory: { $arrayElemAt: ["$products.subcategory", 0] },
            // Include other fields from the product and subcategory collections as needed
          },
        },
      },
    ];
    const queryParams = req.query;
    if (Object.keys(queryParams).length > 0) {
      var page = parseInt(queryParams.page) || 1;
      var limit = 4;
      var skip = (page - 1) * limit;
      pipeline = pipeline.concat([{ $skip: skip }, { $limit: limit }]);
    }

    const [categoriesData, totalCount] = await Promise.all([
      Category.aggregate(pipeline),
      Product.countDocuments(),
    ]);

    const hasMore = (queryParams.page || 1) * limit <= totalCount;

    const obj = {
      hasMore,
      categoriesData,
    };
    return res.send({
      success: true,
      message: "Categories fetched successfully",
      obj,
    });
  } catch (error) {
    return next(error);
  }
};
// API to get featured products
exports.getCurrentBooks = async (req, res, next) => {
  // try {
  //   const queryParams = req.query;

  //   let pipeline = [
  //     {
  //       $lookup: {
  //         from: "products",
  //         localField: "_id",
  //         foreignField: "categoryId",
  //         as: "products",
  //       },
  //     },
  //     {
  //       $unwind: "$products",
  //     },
  //     {
  //       $lookup: {
  //         from: "subcategories",
  //         localField: "products.subCategoryId",
  //         foreignField: "_id",
  //         as: "products.subcategory",
  //       },
  //     },
  //     {
  //       $match: {
  //         "products.tag": { $regex: "reading", $options: "i" }, // Case-insensitive match for the "tag" field in the products collection to filter products by the "featured" tag
  //         "products.status": true, // Filter based on the status field of the products to get only those with status true
  //       },
  //     },
  //     {
  //       $project: {
  //         _id: 1,
  //         name: 1,
  //         products: {
  //           productID: "$products._id",
  //           productName: "$products.title",
  //           productImage: "$products.image",
  //           productTag: "$products.tag",
  //           productIsSold: "$products.isSold",
  //           productDescription: "$products.description",
  //           subcategory: { $arrayElemAt: ["$products.subcategory", 0] },
  //           // Include other fields from the product and subcategory collections as needed
  //         },
  //       },
  //     },
  //   ];
  //   // const queryParams = req.query;

  //   if (Object.keys(queryParams).length > 0) {
  //     var page = parseInt(queryParams.page) || 1;
  //     var limit = 2;
  //     var skip = (page - 1) * limit;
  //     pipeline = pipeline.concat([{ $skip: skip }, { $limit: limit }]);
  //   }

  //   const [categoriesData, totalCount] = await Promise.all([
  //     Category.aggregate(pipeline),
  //     Product.countDocuments({
  //       tag: { $regex: "completed", $options: "i" },
  //       status: true,
  //     }), // Count only those products with status true
  //   ]);
  //   const hasMore = (queryParams.page || 1) * limit <= totalCount;
  //   const obj = {
  //     hasMore,
  //     categoriesData,
  //   };
  //   return res.send({
  //     success: true,
  //     message: "Categories fetched successfully",
  //     obj,
  //   });
  //   // });
  // } catch (error) {
  //   return next(error);
  // }

  try {
    const queryParams = req.query;

    let pipeline = [
      {
        $match: {
          tag: { $regex: /^reading$/i }, // Match "wishlist" tag (case-insensitive)
          status: true, // Filter products by status true
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          image: 1,
          tag: 1,
          isSold: 1,
          description: 1,
        },
      },
    ];

    // Handle pagination
    var limit=2;
    if (Object.keys(queryParams).length > 0) {
      var page = parseInt(queryParams.page) || 1;
       limit = 4;
      var skip = (page - 1) * limit;
      pipeline = pipeline.concat([{ $skip: skip }, { $limit: limit }]);
    }

    const [productsData, totalCount] = await Promise.all([
      Product.aggregate(pipeline),
      Product.countDocuments({
        tag: { $regex: /^reading$/i }, // Count documents with "wishlist" tag (case-insensitive)
        status: true, // Count documents with status true
      }),
    ]);
    const hasMore = (queryParams.page || 1) * limit < totalCount;
    console.log("hasMore", hasMore);
    const obj = {
      hasMore,
      productsData,
    };

    return res.send({
      success: true,
      message: "Products fetched successfully",
      obj,
    });
  } catch (error) {
    return next(error);
  }
};

// API to get completed products
exports.getCompletedBooks = async (req, res, next) => {
  // try {
  //   const queryParams = req.query;
  //   let pipeline = [
  //     {
  //       $lookup: {
  //         from: "products",
  //         localField: "_id",
  //         foreignField: "categoryId",
  //         as: "products",
  //       },
  //     },
  //     {
  //       $unwind: "$products",
  //     },
  //     {
  //       $lookup: {
  //         from: "subcategories",
  //         localField: "products.subCategoryId",
  //         foreignField: "_id",
  //         as: "products.subcategory",
  //       },
  //     },
  //     {
  //       $match: {
  //         "products.tag": { $regex: "completed", $options: "i" }, // Case-insensitive match for the "tag" field in the products collection to filter products by the "featured" tag
  //         "products.status": true, // Filter based on the status field of the products to get only those with status true
  //       },
  //     },
  //     {
  //       $project: {
  //         _id: 1,
  //         name: 1,
  //         products: {
  //           productID: "$products._id",
  //           productName: "$products.title",
  //           productImage: "$products.image",
  //           productTag: "$products.tag",
  //           productIsSold: "$products.isSold",
  //           productDescription: "$products.description",
  //           subcategory: { $arrayElemAt: ["$products.subcategory", 0] },
  //           // Include other fields from the product and subcategory collections as needed
  //         },
  //       },
  //     },
  //   ];
  //   if (Object.keys(queryParams).length > 0) {
  //     var page = parseInt(queryParams.page) || 1;
  //     var limit = 2;
  //     var skip = (page - 1) * limit;
  //     pipeline = pipeline.concat([{ $skip: skip }, { $limit: limit }]);
  //   }

  //   const [categoriesData, totalCount] = await Promise.all([
  //     Category.aggregate(pipeline),
  //     Product.countDocuments({
  //       tag: { $regex: "completed", $options: "i" },
  //       status: false,
  //     }), // Count only those products with status true
  //   ]);
  //   const hasMore = (queryParams.page || 1) * limit <= totalCount;
  //   const obj = {
  //     hasMore,
  //     categoriesData,
  //   };
  //   return res.send({
  //     success: true,
  //     message: "Categories fetched successfully",
  //     obj,
  //   });
  // } catch (error) {
  //   return next(error);
  // }

  try {
    const queryParams = req.query;

    let pipeline = [
      {
        $match: {
          tag: { $regex: /^completed$/i }, // Match "wishlist" tag (case-insensitive)
          status: true, // Filter products by status true
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          image: 1,
          tag: 1,
          isSold: 1,
          description: 1,
        },
      },
    ];

    // Handle pagination
    var limit=2;
    if (Object.keys(queryParams).length > 0) {
      var page = parseInt(queryParams.page) || 1;
       limit = 4;
      var skip = (page - 1) * limit;
      pipeline = pipeline.concat([{ $skip: skip }, { $limit: limit }]);
    }

    const [productsData, totalCount] = await Promise.all([
      Product.aggregate(pipeline),
      Product.countDocuments({
        tag: { $regex: /^completed$/i }, // Count documents with "wishlist" tag (case-insensitive)
        status: true, // Count documents with status true
      }),
    ]);
    console.log("productsData", productsData);
    console.log("totalCount", totalCount);
    console.log("limit", limit);
    const hasMore = (queryParams.page || 1) * limit <= totalCount;
    console.log("hasMore", hasMore);
    const obj = {
      hasMore,
      productsData,
    };

    return res.send({
      success: true,
      message: "Products fetched successfully",
      obj,
    });
  } catch (error) {
    return next(error);
  }
};

// API to get plan to read products
exports.getPlanToRead = async (req, res, next) => {
  try {
    const queryParams = req.query;

    let pipeline = [
      {
        $match: {
          tag: { $regex: /^wishlist$/i }, // Match "wishlist" tag (case-insensitive)
          status: true, // Filter products by status true
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          image: 1,
          tag: 1,
          isSold: 1,
          description: 1,
        },
      },
    ];

    // Handle pagination
    var limit=2;
    if (Object.keys(queryParams).length > 0) {
      var page = parseInt(queryParams.page) || 1;
       limit = 4;
      var skip = (page - 1) * limit;
      pipeline = pipeline.concat([{ $skip: skip }, { $limit: limit }]);
    }

    const [productsData, totalCount] = await Promise.all([
      Product.aggregate(pipeline),
      Product.countDocuments({
        tag: { $regex: /^wishlist$/i }, // Count documents with "wishlist" tag (case-insensitive)
        status: true, // Count documents with status true
      }),
    ]);
    console.log("productsData", productsData);
    console.log("totalCount", totalCount);
    console.log("limit", limit);
    const hasMore = (queryParams.page || 1) * limit <= totalCount;
    console.log("hasMore", hasMore);
    const obj = {
      hasMore,
      productsData,
    };

    return res.send({
      success: true,
      message: "Products fetched successfully",
      obj,
    });
  } catch (error) {
    return next(error);
  }
};

exports.changeStatus = async (req, res, next) => {
  const { bookId, bookTag } = req.body; // Assuming bookId and bookTag are sent in the request body
  try {
    if (bookTag === "reading") {
      // Find the product by productId and update its status from reading to completed
      const product = await Product.findOneAndUpdate(
        { _id: bookId, tag: "reading" },
        { tag: "completed" },
        { new: true }
      );
      if (!product) {
        return res
          .status(400)
          .json({ error: "Product not found or not in reading status" });
      }
      return res
        .status(200)
        .json({ message: "Product status updated to completed", product });
    } else if (bookTag === "wishlist") {
      console.log("enter");
      // Find the product by productId and update its status from wishlist to reading
      const product = await Product.findOneAndUpdate(
        { _id: bookId, tag: "wishlist" },
        { tag: "reading" },
        { new: true }
      );
      console.log("product", product);
      if (!product) {
        return res
          .status(400)
          .json({ error: "Product not found or not in wishlist status" });
      }
      return res
        .status(200)
        .json({ message: "Product status updated to reading", product });
    } else {
      return res.status(400).json({ error: "Invalid bookTag" });
    }
  } catch (error) {
    console.error("Error occurred while changing product status:", error);
    next(error);
  }
};

exports.deleteBook = async (req, res, next) => {
  console.log("req.body", req.body);
  const { bookId, bookTag } = req.body; // Assuming bookId and bookTag are sent in the request body
  console.log("bookTag", bookTag);
  console.log("bookId", bookId);
  try {
    // Find the book by its ID and update its status to false
    const deletedBook = await Product.findByIdAndUpdate(
      bookId,
      { status: false },
      { new: true }
    );

    if (!deletedBook) {
      return res
        .status(400)
        .json({ success: false, message: "Book not found or not deleted" });
    }

    // Now that the status is updated, delete the book from the database
    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Product status updated to completed",
      deletedBook,
    });
  } catch (error) {
    console.error("Error occurred while changing product status:", error);
    next(error);
  }
};

exports.addBook = async (req, res, next) => {
  const { title, description } = req.body;
  console.log("title", title);
  let image;
  if (req.files?.image) {
    image = req.files.image[0]?.path;
    console.log("image", image);
    // Handle the uploaded image response as needed
    console.log("cloudinary", cloudinary);
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "book_shelf", // Specify the folder name
      upload_preset: "book_shelf_images",
    });
    const parts = uploadResponse?.secure_url?.split("/");
    var extractedImagePath = "/" + parts.slice(6).join("/");
    const obj = {
      title,
      description,
      image:"https://res.cloudinary.com/book-shelf/image/upload"+ extractedImagePath,
      tag: "wishlist",
    };
    console.log("obj", obj);
    const addBookDetail = await Product.create(obj);
    const bookDetail = await addBookDetail.save();
    return res.send({
      statusCode: 201,
      bookDetail,
      success: true,
      message: "Book created successfully",
    });
  }
};
