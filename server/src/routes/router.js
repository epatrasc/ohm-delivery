const express = require('express');
const { getOhmById, nextState } = require('../controllers');

const router = express.Router();

router.get('/ohms/:id', async (req, res) => {
  const { id } = req.params;

  const ohm = await getOhmById(id);

  console.debug('GET /ohms/:id', ohm);

  if (!ohm) return res.send(404, 'Item not found');

  res.send(ohm);
});

router.post('/ohms/:id/next',
  async (req, res) => {
    const { id } = req.params;
    const { reason } = req.body;

    const ohm = await nextState(id, reason);

    res.send(ohm);
  });

module.exports = router;
