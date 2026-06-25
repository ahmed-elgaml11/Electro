import express from "express";
import firstResponse from "../types/firstResponse";
import something from './something/something.routes'
const router = express.Router();

router.get<{}, firstResponse>('/', (req, res) => {
    res.json({
        message: 'hello from api.'
    })
})

router.use('/something', something)
export default router