const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

// Routers -----------------------------------
const postRouter = require('./routes/Posts');
app.use('/posts', postRouter);

// Database with Server ----------------------
db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT:${process.env.PORT}`);
  });
});
