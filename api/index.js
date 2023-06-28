const router = require('express').Router();


const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const { getUserById } = require('../db/users')



router.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);


      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch (error) {
      next(error);
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${prefix}`
    });
  }
});

router.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

router.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

//////////// moved to api/users.js //////////

// // place your routers here
// router.post('/login', async (req, res, next) => {

//   const { userName, password } = req.body;

//   if (!userName || !password) return res.status(400).json({ error: "Username or password are required" });

//   try {

//     const user = await getLoginDetails(userName, password);

//     return res.status(200).json({ user });

//   } catch (error) {
//     return res.status(500).json({ error })
//   }
// })

// apiRouter.post('/users', async (req, res, next) => {

//   const { userName, password } = req.body;

//   if (!userName || !password) return res.status(400).json({ error: "Username or password are required" });

//   try {

//     const user = await insertUser(userName, password);

//     return res.status(201).json({ user });

//   } catch (error) {
//     return res.status(500).json({ error })
//   }
// })

const usersRouter = require('./users');
router.use('/users', usersRouter);

const gamesRouter = require('./games');
router.use('/games', gamesRouter);

const cartRouter = require('./cart');
router.use('/cart', cartRouter);



module.exports = router;
