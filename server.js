const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the current directory
app.use(express.static(path.join(__dirname, '.')));

app.post('/generate-bilty', (req, res) => {
    const biltyData = req.body;
    // Logic to generate bilty document based on biltyData
    // For now, just send a success response
    res.send('Bilty generated successfully!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
