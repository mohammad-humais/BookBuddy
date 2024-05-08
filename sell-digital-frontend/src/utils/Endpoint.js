    // user endpoints

export const signupEndpoint = "/v1/front/users/register"
export const loginEndpoint = "/v1/front/users/login"
export const forgotPasswordEndpoint = "/v1/front/users/forgot-password"
export const linkExpiredEndpoint = "/v1/front/users/link-expired"
export const verifyTokenEndpoint = "/v1/front/users/verify-token"
export const resetPasswordEndpoint = "/v1/front/users/reset-password"
export const updateProfileEndpoint = "/v1/front/users/update-profile"
export const getProfileDataEndpoint = "/v1/front/users/get-profile-data"
export const sessionManagementEndpoint= "/v1/front/users/reset-session-timer"

// Book endpoints
export const currentBooksEndpoint = "/v1/admin/category/get-current-books"
export const completedPBooksEndpoint = "/v1/admin/category/get-completed-books"
export const planToReadEndpoint = "/v1/admin/category/get-plan-to-read-books"
export const getAllBooksEndpoint = "/v1/admin/category/list"
export const searchedEndpoint = "/v1/admin/category/filter"
export const productDetailEndpoint = "/v1/admin/category/product-detail/"
export const relatedProductDetailEndpoint = "/v1/admin/category/get-related-products"
export const recentlyAddedProducts = "/v1/admin/category/recently-added-products"
export const changeStatus = "/v1/admin/category/change-status"
export const deleteBooks = "/v1/admin/category/delete-book"
export const addBook = "/v1/admin/category/add-book"