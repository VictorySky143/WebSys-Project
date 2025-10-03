const express = require('express');
const router = express.Router();
const supabaseAPI = require('../config/supabaseconnect');


router.post('/create', async (req, res) => {
const { drugId, batchNumber, expiryDate, stockQuantity } = req.body;

if (!drugId || !batchNumber || !expiryDate || !stockQuantity) {
        return res.status(400).json({ error: 'Missing fields.' });
    }
    
    const batchData = {
        drug_id: drugId,
        batch_number: batchNumber,
        date_received: new Date().toISOString().slice(0, 10), 
        expiry_date: expiryDate, 
       current_stock: stockQuantity,
       initial_stock : stockQuantity,
        
    };

    try {
     
        const response = await supabaseAPI.post('/inventory_table', batchData);

        res.status(201).json({ 
            message: 'New batch', 
            batch: response.data[0] 
        });

    } catch (error) {
        console.error('Error receiving batch', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to record' });
    }
});

module.exports = router;
