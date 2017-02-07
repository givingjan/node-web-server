const express = require('express');
const hbs = require('hbs'); //HandleBars
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname +'/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method}${req.path}`
  console.log(log);
  fs.appendFile('server.log',log + '\n',(err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  })

  // next(); //不寫next 網頁會一直轉轉轉，表示無法存取到下面所寫的Code
});

// 維修時 ＋這段 所有網頁都會跑到maintenance.hbs
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
//
// });
// app.get('/',(req, res) => {
//   console.log(req);
//   res.send({
//     name:'Jan',
//     likes:[
//       'football',
//       'painting',
//     ]
//   });
// });



app.get('/',(req, res) => {
  res.render('home.hbs',{
    pageTitle:'Home',
    welcomeMsg:'Welcome to my website.',
  });
});


app.get('/about',(req, res) => {
  res.render('about.hbs',{
    pageTitle:'About Page',
  });
});

app.get('/bad',(req, res) => {
  res.send({
    errorMsg:'Bad request'
  });
})

app.listen(port,() => {
  console.log(`Running on ${port} Port`);
});
