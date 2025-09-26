const express = require('express');
const app = express();
const PORT = 3000;

// walay muna db
let cases = [];
let nextCaseId = 1;
app.use(express.json());

app.get('/', (req, res) => {
	res.send('testing testing');
});

// create
app.post('/api/cases', (req, res) => {
	const { Name, CaseDescription } = req.body;
	const ContactInfo = req.body.ContactInfo || 'optional are';
	//check
	if (!Name || !CaseDescription) {
		return res.status(400).json({ 
			error: 'required Name and CaseDescription' 
		});
	}

	const newCase = {
		id: nextCaseId++, // array muna eh, edi garne
		Name: Name,
		CaseDescription: CaseDescription,
		DateInputed: new Date().toISOString(),
		ContactInfo: ContactInfo
	};

	cases.push(newCase);
    
	res.status(201).json({ 
		message: 'Case created', 
		data: newCase 
	});
});

//general get
app.get('/api/cases', (req, res) => {
	res.status(200).json(cases);
});

app.get('/api/cases/:id', (req, res) => {
	const caseId = parseInt(req.params.id); 
	const foundCase = cases.find(c => c.id === caseId);
	if (!foundCase) {
		return res.status(404).json({ error: 'not found.' });
	}
    
	res.status(200).json(foundCase);
});

module.exports = app;

