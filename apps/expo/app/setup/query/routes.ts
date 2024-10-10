export const apiRoutes = {
  getMeesagesByChatId: 'messages/chat/:id',
  getBookmarksByUserId: 'bookmarks/user/:id',
  getCouponByVehicleId: 'coupons/vehicle/:id',
  getPostingById: 'postings/:id',
  createBookmark: 'bookmarks/create:id', // the userId
  removeBookmark: 'bookmarks/:bookmarkId',
}
