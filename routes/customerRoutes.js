const express = require('express');
const Customer = require('../models/Customer');
const router = express.Router();
// Create a customer
router.post('/', async (req, res) => {
    try {
        const customer = new Customer(req.body);
        await customer.save();
        res.status(201).json(customer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all customers
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/customers/:id', async (req, res) => {
    try {
        console.log('Received request to delete customer with ID:', req.params.id); // Debugging line
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json({ message: 'Customer deleted successfully', customer });
    } catch (err) {
        console.error('Error deleting customer:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
