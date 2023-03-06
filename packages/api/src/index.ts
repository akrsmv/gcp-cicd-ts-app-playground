import express, { Express } from 'express'
import dotenv from 'dotenv'
import { batchGetFiles, generateSampleFiles, getGctTSData, initServiceClients, rebuildIndex } from '@gctapp/core'
import { handleGctErrors } from './errorHandling'
import cors from 'cors';
import { removeSampleFiles } from '@gctapp/core'
import { tsDataKind, tsDataRange } from './mappers';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.urlencoded())
app.use(express.json())
app.use(express.text())
app.use(cors({ origin: '*' }))

app.get('/:dataKind/:dataUnit/:year?/:month?/:day?', async (req, res, next) => {
    res.send(await getGctTSData(tsDataKind(req), tsDataRange(req)).catch(next))
})

app.post('/admin/:dataKind/:dataUnit/rebuild-index', async (req, res, next) => {
    res.send(await rebuildIndex(tsDataKind(req), !!req.query.useLocalfs).catch(next))
})

app.post('/admin/sampledata/generate', async (req, res, next) => {
    res.send(await generateSampleFiles(req.body).catch(next))
})

app.post('/admin/sampledata/remove', async (req, res, next) => {
    res.send(await removeSampleFiles().catch(next))
})

app.post('/admin/gcsdata/download', async (req, res, next) => {
    res.send(await batchGetFiles().catch(next))
})

app.use(handleGctErrors)

initServiceClients.then(() => app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
}))
