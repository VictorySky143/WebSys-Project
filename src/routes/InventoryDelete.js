const express = require('express');
const router = express.Router();
const supabaseAPI = require('../config/supabaseconnect');

router.delete('delete/inventory/:batchId', async (req, res) => {
    const { batchId } = req.params;

    try {
       
        const response = await supabaseAPI.delete(`/inventory_table?batch_id=eq.${batchId}`);

        if (response.status === 204 || response.data.length === 0) {
            res.status(200).json({ message: `${batchId} deleted` });
        } else {
            
             res.status(200).json({ message: `del successful, status: ${response.status}` });
        }


    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to delete' });
    }
});

module.exports = router;
