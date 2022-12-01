import express from 'express';
const PORT = process.env.PORT || 3090;;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/hello', (req: express.Request, res: express.Response) => {
    res.status(200).send({
      status: res.statusCode,
      messege: `Hollo express!`
    })
  },
);

app.listen(PORT, () => console.log(`listening on port http://localhost:${PORT}`));

// export default app;
