const express = require('express');
const cors = require('cors');
const investLogic = require('./invest-logic');

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

app.post('/investment-suggestion', async (req, res) => {
    try {
        const { monthlyIncome, monthlyExpenses, investmentVision } = req.body;
        const result = await investLogic.processPrompts(monthlyIncome, monthlyExpenses, investmentVision);
        res.json({ suggestion: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});