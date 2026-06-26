import pg from 'pg';
import bodyParser from 'body-parser';
import axios from 'axios';
import express from 'express';
import ejs from 'ejs';

const app = express();
const port = 3000;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')


const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'library',
    password: 'admin123',
    port: 5432
});

db.connect();
const user = 1;
async function getBooks(status) {
    const results = await db.query('select id, name,author, coverid from readbooks where status = $1 and userid = $2 order by author', [status, user]);
    return results.rows;
}


const books = [
    {
        id: 1,
        name: 'Abc',
        cover: '10473609'
    },
    {
        id: 2,
        name: 'Abc',
        cover: '12749873'
    },
    {
        id: 3,
        name: 'Abc',
        cover: '14425197'
    },
    {
        id: 4,
        name: 'Abc',
        cover: '12821465'
    },
];

app.get('/', async (req, res) => {
    const finished = await getBooks('finished');
    const current = await getBooks('current');
    const next = await getBooks('next');
    const result = (await db.query('select name from users where id = $1', [user]));
    const name = result.rows[0].name
    console.log(name)
    res.render('index.ejs', {f:finished, c:current, n:next, user:name});
})

app.post('/add', async (req, res) => {
    console.log(req.body);
    const sec = req.body.section;
    const name = req.body.bookName;
    const auth = req.body.author;
    let query = name.split(' ');
    query = query.join('+');
    console.log(query);
    try {
        const results = await axios.get(`https://openlibrary.org/search.json?q=${query}`);
    const op = results.data.docs[0];
    const obj = {
        a: op.title,
        b: op.author_name[0],
        c: op.first_publish_year,
        d: op.cover_i
        }
        db.query('insert into readbooks(name, userid, coverid,status, author) values($1, $2, $3, $4, $5)', [obj.a, user, obj.d, sec, obj.b]);
        res.redirect('/');
    console.log(obj)
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
    
})

app.post('/del', async (req, res) => {
    console.log(req.body);
    try {
        db.query('delete from readbooks where id = $1', [req.body.bookid]);
        res.redirect('/');
    } catch (e) {
        console.log(e);
    }
})

app.listen(port, () => {
    console.log('server started at port ' + port);
    
})