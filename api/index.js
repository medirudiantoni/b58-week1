const express = require('express');
const app = express();
const path = require('path')
const hbs = require('hbs'); 
const projectRouter = require('../router/projectRouter');
const userRouter = require('../router/userRouter');
const session = require('express-session');
const flash = require('express-flash');
const port = 4000;

app.set("view engine", "hbs"); 
app.use(express.json());
hbs.registerPartials(path.join(__dirname, '../views/partials'));
app.use(express.static(path.join(__dirname, '../assets'))); 
app.use("/views", express.static('../views'))
app.use(express.urlencoded({ extended: true }));

app.use(session({
    name: "jaIyb8YWb8q", 
    secret: "korewakaizokuogininaruatokoda",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 // 24 jam
    },
}));
app.use(flash())

app.use((req, res, next) => {
    res.locals.navData = {
        user: req.session.user      
    };
    next();
  });
  
 
app.use('/user', userRouter);
app.use('/project', projectRouter);

app.get('/register', (req, res) => {
    res.render('register.hbs');
});
app.get('/login', (req, res) => {
    req.flash("Success", "Login success!")
    res.render('login.hbs');
});
app.post('/register', (req, res) => {
    const { name, email, password }= req.body;
    const data = {
        name, email, password
    }
    console.log(data);
    res.render('register.hbs');
});
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) return console.error('logout failed!', err);

        console.log('log out success');
        res.redirect('/')
    })
})


app.get('/', home);
app.get('/project', project); 
app.get('/project/:id', project); 
app.get('/blog', blog);
app.get('/contact', contact);
app.get('/testimonials', testimonials);
app.get('/test/', test);
app.get('/test/:id', test);

app.post('/project', project);

function home(req, res){
    console.log(req.session.user)
    res.render('index.hbs', { user: req.session.user })
}

function project(req, res){
    if(req.method === "GET"){
        return res.render('project.hbs', { project: projectData });
    }
}

function blog(req, res){
    res.render('blog.hbs');
}

function contact(req, res){
    res.render('contact.hbs') 
}

function testimonials(req, res){
    res.render('testimonials.hbs')
}

function test(req, res){
    const { id } = req.params;
    console.log(`params id: ${id}`);
    res.render('testing.hbs', {id: id ? `: ${id}` : null})
} 

app.listen(port, () => console.log('Running on port: ' + port));