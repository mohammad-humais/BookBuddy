const byPassedRoutes = [
  "/v1/front/users/register",
  "/v1/front/users/login",
  "/v1/front/users/forgot-password",
  "/v1/front/users/reset-password",
  "/v1/front/users/link-expired",
  "/v1/front/users/verify-token",
  "/v1/front/users/reset-session-timer",
  "/v1/admin/category/get-data",
  "/v1/admin/category/get-related-products",
  "/v1/admin/category/get-completed-books",
  "/v1/admin/category/change-status",
  "/v1/admin/category/delete-book",
  "/v1/admin/category/get-current-books",
  "/v1/admin/category/get-plan-to-read-books",
  "/v1/admin/category/add-price",
  "/v1/admin/category/add-follower", 
  "/v1/admin/category/recently-added-products",
  "/v1/admin/category/product/create",
  "/v1/admin/category/add-book",
];
const jwt = require("jsonwebtoken");
const verifyAccessToken = async (req, res, next) => {
  if (req.originalUrl.indexOf("/v1/") > -1) {
    if (
      byPassedRoutes.indexOf(req.originalUrl) > -1 ||
      req.originalUrl.indexOf("/v1/admin/category/filter") > -1 ||
      req.originalUrl.indexOf("/v1/admin/category/product-detail") > -1 ||
      req.originalUrl.indexOf("/v1/admin/category/list") > -1 ||
      req.originalUrl.indexOf("/v1/admin/category/get-current-books") > -1 ||
      req.originalUrl.indexOf("/v1/admin/category/get-completed-books") > -1 ||
      req.originalUrl.indexOf("/v1/admin/category/get-plan-to-read-books") > -1

    ) {
      next();
    } else {
      if (req.headers["authorization"] === undefined) {
        return res.status(403).json({
          success: false,
          message: "Please login to access the data.",
        });
      }
      const authHeader = req.headers["authorization"];
      // const bearerToken = authHeader.split(" ");
      // const token = bearerToken[1];
      const token = authHeader;
      const JWT_SECRET = process.env.JWT_SECRET;
      await jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Token is not valid.",
          });
        } else {
          const { sub } = payload;
          req.payload = sub;
          next();
        }
      });
    }
  }
};
exports.verifyAccessToken = verifyAccessToken;
