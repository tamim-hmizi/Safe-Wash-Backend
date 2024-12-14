// routes/commandeRoutes.js
const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/commandeController');

// Route to create a new order
router.post('/', commandeController.createCommande);

// Route to get all orders (no user filtering)
router.get('/', commandeController.getAllOrders);

// Route to get all orders for a specific user
router.get('/:email', commandeController.getUserOrders);

// Route to verify an order
router.put('/verify', commandeController.verifyCommande);

// Route to delete an order
router.delete('/:commandeId', commandeController.deleteCommande);

module.exports = router;