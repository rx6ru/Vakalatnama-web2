import express, { Request, Response , NextFunction} from 'express';

import bodyParser from 'body-parser';
import petRouter from './routes/petitioner';

const app = express();

app.use(bodyParser.json());
app.use("/petitioner", petRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err)
  res.status(500).json({ error: 'Internal Server Error' })
})
