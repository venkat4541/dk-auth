const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get("/self", controller.getUsers);
router.post("/", controller.addUser);
router.put("/self", controller.updateUser);


module.exports = router;