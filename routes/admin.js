const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");

const isAuth = require("../middleware/is-auth");

const router = express.Router();

const { check, body } = require("express-validator/check");

// /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get("/products", isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post(
  "/add-product",
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("imageUrl", "image url must be a valid url")
      .isString()
      .isLength({ min: 3 })
      .trim()
      .isURL(),
    body("price", "Price must be a float").isFloat(),
    body("description", "Description must be between 5-200  characters")
      .isString()
      .isLength({ min: 5, max: 200 })
      .trim(),
  ],
  isAuth,
  adminController.postAddProduct
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("imageUrl", "image url must be a valid url")
      .isString()
      .isLength({ min: 3 })
      .trim()
      .isURL(),
    body("price", "Price must be a float").isFloat(),
    body("description", "Description must be between 5-200  characters")
      .isString()
      .isLength({ min: 5, max: 200 })
      .trim(),
  ],
  isAuth,
  adminController.postEditProduct
);

router.post("/delete-product", isAuth, adminController.postDeleteProduct);

module.exports = router;
