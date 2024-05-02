const UserController = require("../controllers/user.controller");
const router = require("express").Router();

router.post("/create", UserController.create);
router.get("/all", UserController.all);
router.get("/single", UserController.get);
router.delete("/delete", UserController.delete);
router.put("/update", UserController.update);

module.exports = router;
