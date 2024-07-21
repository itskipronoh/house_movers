const express = require('express');
const {
    createItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem,
} = require('../controllers/ItemController');

const router = express.Router();

router.post('/', createItem);
router.get('/', getItems);
router.get('/:id', getItemById);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

module.exports = router;
