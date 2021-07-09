const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads/'),

    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
	storage: storage,
});

const app = express();

app.engine('hbs', hbs());
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.urlencoded({ extended: false }));

app.post('/contact/send-message', upload.single('image'), (req, res) => {

	const { author, sender, title, message } = req.body;

	if(author && sender && title && message && req.file) {
        res.render('contact', {
			isSent: true,
			image: req.file.filename,
		});
	}
	else {
        res.render('contact', {
			isError: true
		});
	}

});

app.get('/hello/:name', (req, res) => {
	res.render('hello', {  name: req.params.name });
});

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/about', (req, res) => {
	res.render('about', { layout: 'dark' });
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

app.use((req, res) => {
	res.status(404).send('404 not found...');
})

app.listen(8000, () => {
	console.log('Server is running on port: 8000');
});