const express = require('express')
const minify = require('express-minify')
const path = require('path');
const app = express()
const port =  process.env.PORT || 80

app.use(express.static(path.join(__dirname, './static')));
app.use(express.json());
app.set('view engine', 'ejs');


const myAuth = (req, res, next) => {
  const { user, password } = req.body;
  if (!user) {
    res.sendStatus(403);
    return;
  }
  if (!password) {
    res.sendStatus(403);
    return;
  }

  if(user != 'pijusMagnificus') {
    res.sendStatus(403);
    return;    
  }

  if (password != 'pijusMagnificusMandaLaCuagtaLeccion') {
    res.sendStatus(403);
    return;
  }
  next();
}


app.use('/esp', myAuth);
let angle = 70;
lastUpdate = new Date();

app.post('/esp', (req, res) => {
  angle = req.body.angle;
  lastUpdate = new Date();
  res.send('ok');
})

app.get('/', (req, res) => {
    res.render(path.join(__dirname, './static/index.ejs'), {
      windAngle: angle,
      lastUpdate: `${lastUpdate.getUTCDate()}/${lastUpdate.getUTCMonth() + 1}/${lastUpdate.getUTCFullYear()} ${lastUpdate.getHours()}:${lastUpdate.getMinutes()}`
    });
})

app.get('/angle', (req, res) => {
    res.json({'angle': angle})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
