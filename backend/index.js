const express = require('express');
const app = express();
const mongoose = require('./mongoose');
const port = 3000;
const router = express.Router();
const rootRouter = require('./routes/index');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/api/v1',rootRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = router