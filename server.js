const pool    = require('./db'); 
const express = require('express');
const path = require('path');
 
const app = express();
const PORT = process.env.PORT || 3000;
 
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
 
// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
 
app.get('/api/production', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                p."Date",
                p."Alberta Price $/MMCF",
                p."Historical Price Canada $/MMCF",
                p."Citygate Price NY $/MMCF",
                p."Residential Price NY $/MMCF",
                d."British Columbia-Exports",
                d."Alberta-Exports",
                d."Chippawa-export",
                d."Iroquois-export",
                d."Niagara-export",
                d."Ontario-Exports",
                d."Pensylvania Withdrawals",
                d."West-Virginia Withdrawals",
                s."British Columbia-Closing inventory",
                s."Eastern Triangle - NOL Receipts-intracanada",
                s."Chippawa-import",
                s."Iroquois-import",
                s."Niagara-import",
                s."NS",
                s."NB",
                s."Ontario",
                s."Sask",
                s."Alberta",
                s."BC",
                s."Territories",
                s."Canada",
                s."ImportsPerDay",
                s."Ontario-Residential consumption",
                s."Ontario-Closing inventory",
                s."Alberta-Closing inventory",
                s."ImportsFromUSA",
                w."temperature_2m_mean",
                w."precipitation_sum"
                
            FROM prices p
            LEFT JOIN demand d ON p."Date" = d."Date"
            LEFT JOIN supply s ON p."Date" = s."Date"
            LEFT JOIN temperature w ON p."Date" = w."Date"
            ORDER BY p."Date" ASC
        `);
        res.json(result.rows);
    } catch (err) {
        console.error('Database error details:', err.message);  // ← add this
        res.status(500).json({ error: err.message }); 
    }
});
 
// 404 handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});
 
// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
