const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();

app.engine('hbs', hbs());
app.set('view engine', 'hbs');


app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/user', (req, res) => {
  res.render('warning');
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { layout: false, name: req.params.name });
});

app.post('/contact/send-message', upload.single('fileName'), (req, res) => {
  const { author, sender, title, message } = req.body;
  const image = (req.file)?req.file.originalname: null;
  console.log(image);

  if(author && sender && title && message && image) {
    res.render('contact', { isSent: true, image });
  }
  else {
    res.render('contact', { isError: true });
  }
});

app.use((req, res) => {
  res.status(404).send('404 Not found');
});
app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});