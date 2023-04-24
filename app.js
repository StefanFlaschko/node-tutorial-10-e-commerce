require('dotenv').config();
require('express-async-errors');

//express
const express = require('express');
const app = express();

//rest of the packages
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');

const mongoSanitize = require('express-mongo-sanitize');

// cors is needet if frontend and backend is on a different domain(see video 295 around 10min)
const cors = require('cors');

//database
const connectDB = require('./db/connect');

//routes
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const orderRouter = require('./routes/orderRoutes');

//middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1);
app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 60 }));

app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

//helps with debugging
app.use(morgan('tiny'));

app.use(express.json());

// with JWT_SECRET, the cookies getting signed, wich is needet if in cookies option secure is set to true
app.use(cookieParser(process.env.JWT_SECRET));

// needet for making the public/upload folder available to the outer world
app.use(express.static('./public'));
app.use(fileUpload());

// making a frontend excessable
// app.use(express.static('./public'))

app.use(cors());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/orders', orderRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
