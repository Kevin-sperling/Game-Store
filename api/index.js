const apiRouter = require('express').Router();
const {getLoginDetails} = require("./services/userService")

apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});


// place your routers here
apiRouter.post('/login', async(req, res, next) => {

const {userName, password} = req.body;

if(!userName || !password) return res.status(400).json({error: "Username or password are required"});

try {
  
  const user = await getLoginDetails(userName, password);

  return res.status(200).json({user});

} catch (error) {
  return res.status(500).json({error})
}
})

apiRouter.post('/users', async(req, res, next) => {

  const {userName, password} = req.body;
  
  if(!userName || !password) return res.status(400).json({error: "Username or password are required"});
  
  try {
    
    const user = await insertUser(userName, password);
  
    return res.status(201).json({user});
  
  } catch (error) {
    return res.status(500).json({error})
  }
  })

module.exports = apiRouter;
