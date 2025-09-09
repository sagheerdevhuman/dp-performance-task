const {Router} = require('express')
const categoryRouter = Router()
const categoryControl = require('../controllers/category')
const corsHeader = require("../config/corsHeader");

categoryRouter.use(corsHeader)

categoryRouter.post(
  "/category/addCategory/",
  categoryControl.addCategory
)
categoryRouter.get(
  "/categories",
  categoryControl.getAllCategories
)

categoryRouter.get(
  "/category/:category_id",
  categoryControl.getCategoryId
)

categoryRouter.delete(
  "/categories/:category_id/delete",
  categoryControl.deleteCategory
);

categoryRouter.put(
  "/categories/:category_id", 
  categoryControl.updateCategory
);


module.exports = categoryRouter;




