const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const setupSwagger = require('./swaggerSetup');

const config = require('./config');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/users', userRoutes);

app.use(errorHandler);

setupSwagger(app);

mongoose.connect(config.dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(config.port, () => console.log(`Server running on port ${config.port}`));
  })
  .catch(err => {
    console.error("Could not connect to MongoDB...", err);
  });
