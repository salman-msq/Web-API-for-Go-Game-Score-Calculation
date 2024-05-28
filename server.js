const express = require('express');
const app = express();
app.use(express.json());
const PORT = 4000;

function calculateMaxDraws(p1, p2, p3) {
    let sum = p1 + p2;
    if (sum === p3) return p3;

    if (Math.abs(sum - p3) % 2 !== 0) return -1;

    if (sum > p3) return (sum + p3) / 2;

    return sum;
}

app.get('/:p1/:p2/:p3', (req, res) => {
    const p1 = parseInt(req.params.p1);
    const p2 = parseInt(req.params.p2);
    const p3 = parseInt(req.params.p3);

    if (p1 < 0 || p1 > 30 || p2 < 0 || p2 > 30 || p3 < 0 || p3 > 30) {
        return res.status(400).json({ error: 'Invalid Point(s)' });
    }

    const max_draws = calculateMaxDraws(p1, p2, p3);

    return res.json({ max_draws });
});

app.listen(PORT, () => { console.log(`Server is running at PORT ${PORT}.` )});