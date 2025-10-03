const express = require('express');
 const app = express();

const PORT = 3000;

const getInvRoute = require('./src/routes/InventoryGet');
const createInvRoute = require('./src/routes/InventoryCreate');
const updateInvRoute = require('./src/routes/InventoryUpdate');
const deleteInvRoute = require('./src/routes/InventoryDelete');


app.use(express.json());
app.get('/', (req, res) => {
	res.send('testing testing');
});



app.use('/api', getInvRoute);
app.use('/api', createInvRoute);
app.use('/api', updateInvRoute);
app.use('/api', deleteInvRoute);


app.listen(PORT, () => {
    console.log(`goto http://localhost:${PORT}`);
});
