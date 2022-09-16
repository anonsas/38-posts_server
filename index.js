const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

// Routers -----------------------------------
const postsRouter = require('./routes/Posts');
app.use('/posts', postsRouter);

const commentsRouter = require('./routes/Comments');
app.use('/comments', commentsRouter);

const usersRouter = require('./routes/Users');
app.use('/auth', usersRouter);

// Database with Server ----------------------
db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT:${process.env.PORT}`);
  });
});
