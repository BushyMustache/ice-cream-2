import express from 'express';

const app = express();

const PORT = 3005;

app.use(express.static('public'));

app.set('view engine', 'ejs');

const orders = [];

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/submit-order', (req, res) => {
    const order = {
        name: req.body.name,
        email: req.body.email,
        flavor: req.body.flavor,
        cone: req.body.cone,
        toppings: req.body.toppings,
        comments: req.body.comments ? req.body.comments : "none",
        timestamp: new Date()
    };

    orders.push(order);
    
    res.render('confirmation', { order });
    console.log(order);
});

app.get('/admin', (req, res) => {
    res.render('admin', { orders });
});

app.listen(PORT, () => {
    console.log(`Server is running at 
        http://localhost:${PORT}`);
});