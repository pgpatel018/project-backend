const express = require('express');
const cors = require("cors");
const session = require('express-session');
const { getParameters } = require('./db');
require("dotenv").config();

const fetchParameter = async () => {
  const params = await getParameters(['/myapp/session/secret']);
  const SESSION_SECRET = params['/myapp/session/secret'];
  return SESSION_SECRET;
};

const app = express();
app.use(express.json());

app.use(cors({
  origin: ["https://ditee.org"], // Update for production if needed
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

/* Routes */
const levelRouter = require('./routes/levelRouter');
const userRouter = require('./routes/userRouter');
const registerRouter = require('./routes/registerRouter');
const authRouter = require('./routes/authRouter');
const answerRouter = require('./routes/answerRouter');
const profileRouter = require('./routes/profileRouter');
const adminRouter = require('./routes/adminRouter');

app.get("/", (req, res) => {
  return res.json("Backend server");
});

const startServer = async () => {
  const SESSION_SECRET = await fetchParameter();
  if (!SESSION_SECRET) {
    throw new Error('SESSION_SECRET is undefined or empty!');
  }
  app.use(
    session({
      key: "user",
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 86400000, // 1 day
      },
    })
  );

  // Register routes after session middleware
  app.use('/level', levelRouter);
  app.use('/user', userRouter);
  app.use('/register', registerRouter);
  app.use('/auth', authRouter);
  app.use('/answer', answerRouter);
  app.use('/profile', profileRouter);
  app.use('/admin', adminRouter);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log("Backend is on port " + PORT);
  });
};

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
