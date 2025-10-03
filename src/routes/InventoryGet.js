const express = require('express');
const router = express.Router();
const supabaseAPI = require('../config/supabaseconnect'); 

router.get('/get/:drugId', async (req, res) => {
    const { drugId } = req.params;

    try {
 
        const drugResponse = await supabaseAPI.get(`/medicine_table?drug_id=eq.${drugId}`);
        const drugData = drugResponse.data;

        if (!drugData || drugData.length === 0) {
            return res.status(404).json({ error: `Drug with ID ${drugId} not found.` });
        }
        
    
        const batchResponse = await supabaseAPI.get(`/inventory_table?drug_id=eq.${drugId}&current_stock=gt.0&order=expiry_date.asc`);
        const batches = batchResponse.data;

        const totalStock = batches.reduce((sum, batch) => sum + batch.CurrentStock, 0);

        res.status(200).json({
            ...drugData[0], 
            totalStock: totalStock,
            activeBatches: batches,
        });

    } catch (error) {
        console.error('error fetching deets', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch' });
    }
});

module.exports = router;
