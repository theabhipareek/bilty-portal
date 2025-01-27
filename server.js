const express = require('express');
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '.')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/generate-bilty', (req, res) => {
    const biltyData = req.body;
    
    // Create a PDF document
    const doc = new PDFDocument();
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
        let pdfData = Buffer.concat(buffers);
        res.writeHead(200, {
            'Content-Length': Buffer.byteLength(pdfData),
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=bilty.pdf',
        }).end(pdfData);
    });

    // Add content to the PDF
    doc.text('Bilty Document');
    doc.text(`Consignor: ${biltyData.consignor}`);
    doc.text(`Consignee: ${biltyData.consignee}`);
    // Add more fields as needed

    doc.end();
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
