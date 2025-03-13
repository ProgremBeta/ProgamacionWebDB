const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const userRouter = require('./routes/user.routes');
const autRoutes = require('./routes/aut.routes');
const projectRoutes = require('./routes/project.routes');

app.use('/api/v1', userRouter);
app.use('/api/v1', authRouter);
app.use('/api/v1', projectRouter);

module.exports = app;
