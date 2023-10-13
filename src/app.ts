import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import todoRouter from './routes/todoRouters';
import onboardingRouter from './routes/onboardingRouters';
import registerRouter from './routes/registerRouters';

const app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/styles', express.static(path.join(__dirname, 'views/styles')));
app.use('/svg', express.static(path.join(__dirname, 'views/svg')));

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
	if (req.url === '/') {
		res.redirect('/onboarding');
	} else {
		next();
	}
});

app.use('/onboarding', onboardingRouter);
app.use('/tasks', todoRouter);
app.use('/register', registerRouter);

export default app;
