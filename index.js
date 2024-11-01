const express = require('express');
const app = express();
const path = require('path')
const hbs = require('hbs'); 
const projectRouter = require('./router/projectRouter');
const userRouter = require('./router/userRouter');
const port = 4000;

app.set("view engine", "hbs"); 
app.use(express.json());
hbs.registerPartials(path.join(__dirname, 'views/partials'));
app.use(express.static(path.join(__dirname, 'assets'))); 
app.use("/views", express.static('views'))
app.use(express.urlencoded({ extended: true }));
 
app.use('/user', userRouter);
app.use('/project', projectRouter);

app.get('/register', (req, res) => {
    res.render('register.hbs');
});
app.get('/login', (req, res) => {
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
    res.render('index.hbs')
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