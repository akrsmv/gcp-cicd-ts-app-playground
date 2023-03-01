import express, { Express } from 'express';
import dotenv from 'dotenv';
import { generateSampleFiles, getPrices, initServiceClients, rebuildIndex } from '@gctapp/core'
import { handleGctErrors } from './errorHandling';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded())
// Parse JSON bodies (as sent by API clients)
app.use(express.json())
app.use(express.text())
app.use(cors({
    origin: '*'
}))

app.get('/electricity/prices/:year?/:month?/:day?', async (req, res, next) => {
    const prices = await getPrices({
        daysBack: req.query.d as string,
        monthsBack: req.query.m as string,
        yearsBack: req.query.y as string,
        range: req.query.r as string,
        ...req.params
    }).catch(next)
    res.send(prices)
})

app.post('/admin/electricity/prices/index/rebuild', async (req, res, next) => {
    const prices = await rebuildIndex('prices')
    res.send(prices)
})

app.post('/admin/sampledata/generate', async (req, res, next) => {
    const prices = await generateSampleFiles(req.body)
    res.send(prices)
})

app.use(handleGctErrors)

initServiceClients.then(() => app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
}))
