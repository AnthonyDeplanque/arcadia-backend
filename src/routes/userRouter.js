const express = require('express');
const { postUser, getUsers, getOneUser,updateUser,deleteUser, loginUser } = require('../controllers/users');

const router = express.Router();
router.get('/', getUsers);
router.get('/:id', getOneUser);
router.post('/', postUser);
router.put('/:id',updateUser);
router.delete('/:id',deleteUser);
router.post('/auth/', loginUser);

module.exports = router;