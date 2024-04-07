const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(express.static('library'))

const fileUpload = require('express-fileupload')
app.use(fileUpload({ defCharset: 'utf8', defParamCharset: 'utf8' }));

cors = require('cors')
app.use(cors())

const userRoutes = require('./routes/userRouter')
app.use('/users', userRoutes);

const uploadRoutes = require('./routes/uploadRouter')
app.use('/upload', uploadRoutes);

const dbRouter = require('./routes/dbRouter');
app.use('/db', dbRouter);

const PORT = 5000
app.listen(PORT, function () {
    console.log(`server listen: http://localhost:${PORT}`);
});

/* 
добавление файла на сервер
    получить файл и айди девайса
    проверить есть ли такой девайс по айди
    добавить в бд пункт есть ли файл
    залить файл в либрари
    балдеж

*/