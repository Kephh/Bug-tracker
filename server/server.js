const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./db/connectDB');
const bugRouter = require('./routes/bugRouter');

dotenv.config();

const app = express();
const { PORT, MONGODB_URI } = process.env;

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Test server connection!');
});

app.use('/bug', bugRouter);

const startServer = async () => {
  try {
    await connectDB(MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`✅ Server listening on PORT: ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to DB:', err);
    process.exit(1);
  }
};

startServer();
