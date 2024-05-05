import {Router} from 'express';
import {body, oneOf, validationResult} from 'express-validator';
import { handleInputErros } from './modules/middleware';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from './handlers/products';
import { createUpdate, deleteUpdate, getUpdate, getUpdates, updateUpdate } from './handlers/update';

export const router = Router();

/**
 * User
 */

router.get("/products", getProducts)
router.post("/product", body("name").isString(), handleInputErros, createProduct)
router.get("/product/:id", handleInputErros, getProduct)
router.put("/product/:id", body("name").isString(), handleInputErros, updateProduct)
router.delete("/product/:id", deleteProduct)

/**
 * Update
 */

router.get("/updates", getUpdates)
router.post("/update", 
    body("title").optional(), 
    body("body").optional(),
    body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
    body("version").optional(),
    createUpdate)
router.get("/update/:id", getUpdate)
router.put("/update/:id", 
    body("title").optional(), 
    body("body").optional(),
    body("productId").exists().isString(),
    updateUpdate)
router.delete("/update/:id", deleteUpdate)

/**
 * Update point
 */

router.get("/updatepoint", (req, res) => {})
router.post("/updatepoint", 
    body("name").isString(), 
    body("description").isString(),
    body("updateId").isString(),
    (req, res) => {
        
    })
router.get("/updatepoint/:id", (req, res) => {})
router.put("/updatepoint/:id", 
    body("name").optional().isString(), 
    body("description").optional().isString(),
    (req, res) => {
        
    })
router.delete("/updatepoint/:id", (req, res) => {})

/**
* Error handler
*/

router.use((err, req, res, next) => {
    if (err.type === "auth") {
      res.status(401).json({message: "Unauthorized"});
    } else if (err.type === "input") {
      res.status(400).json({message: "Invalid input"});
    } else {
      res.status(500).json({message: "Internal Server Error"});
    }
  })