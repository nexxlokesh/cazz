const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files (e.g., CSS, JS)
app.use(express.static('public'));

// Route to check server status
async function checkServerStatus() {
    try {
        await axios.get('http://localhost:5000');
        return true;  // Server is available
    } catch (error) {
        return false; // Server is not available
    }
}

// Route to render the index page
app.get('/', async (req, res) => {
    const serverStatus = await checkServerStatus();
    res.render('index', { serverStatus });
});

// Routes to trigger functions on the C# application
app.get('/trigger/:action', async (req, res) => {
    const action = req.params.action;

    try {
        await axios.get(`http://localhost:5000/ctrl${action.toUpperCase()}`);
        res.send('Action Triggered');
    } catch (error) {
        res.status(500).send('Error triggering action');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
