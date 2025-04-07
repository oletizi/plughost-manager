import express, {type Request, type Response} from 'express'
import {newConfig} from '@/config.ts'
import {updateAvailableResources} from '@/plughost.ts'

const port = 3000
const app = express()
app.use(express.json())


app.get('/api/hello', (req: Request, res: Response) => {
    res.send({msg: 'Hello World!'})
})

app.get('/api/config', async (req: Request, res: Response) => {
    res.send({
            timestamp: Date.now(),
            config: await newConfig()
        }
    )
})

app.post('/api/config/update', async (req: Request, res: Response) => {
    res.send({
        config: await updateAvailableResources(await newConfig()),
        timestamp: Date.now(),
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})