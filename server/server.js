import express from 'express';
import routes from './src/routes/routes';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const config = require(__dirname + '/config/keys');

const app = express();
const PORT = 3005;

//bodyparser setup
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(cors());

routes(app);

app.use(express.static('public'));

//fix deprecation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

//connexion au cluster mongo Atlas
mongoose.connect(config.mongoURI, config.monCFG)
.then(() => console.log('connecting to database successful'))
.catch(
    (error) => console.log(JSON.stringify(error))
);

app.get('/', (req, res) => res.send(`Serveur express sur port ${PORT}`));

app.listen(PORT, () => console.log(`Votre server est sur le port ${PORT}`));