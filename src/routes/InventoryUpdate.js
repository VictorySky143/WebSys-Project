const express = require('express');
const router = express.Router();
const supabaseAPI = require('../config/supabaseconnect');

router.patch('/update/:batchId', async (req, res) => {
    const { batchId } = req.params;
    const updates = req.body; 

    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: 'cannot be empty' });
    }

    try {
        const response = await supabaseAPI.patch(
            `/inventory_table?batch_id=eq.${batchId}`, 
            updates,
            {
            
                headers: {
                    'Prefer': 'return=representation' 
                }
            }
        );

        if (response.status === 200 && response.data && response.data.length > 0) {
            res.status(200).json({ 
                message: `Batch ${batchId} updated.`,
                updatedBatch: response.data[0]
            });
        } 
  
        else if (response.status === 200 || response.status === 204) {
        
             
             if (response.data.length === 0) {
                 res.status(404).json({ message: `No batch ${batchId} matched` });
             } else {
                 res.status(200).json({ 
                     message: `Batch ${batchId} updated `,
                     updatedBatch: updates 
                 });
             }
        } 
        else {
            res.status(response.status || 500).json({ 
                error: 'Unexpected response status.',
                details: response.data
            });
        }

    } catch (error) {
   
        console.error('Error updating', error.response ? error.response.data : error.message);
        res.status(500).json({ 
            error: 'Failed to update',
            details: error.response ? error.response.data : 'Network or connection error'
        });
    }
});

module.exports = router;
