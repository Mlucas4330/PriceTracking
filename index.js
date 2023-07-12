import express from 'express';
import cors from 'cors';
import getPrices from './getPrices.js';

const app = express();
app.use(cors());


app.get("/", async (_req, res) => {
    const prices = getPrices();

    if (!prices) {
        res.send({
            ok: false,
            msg: "Erro ao atualizar preço"
        })
        return;
    }

    res.send({
        ok: true,
        msg: "Preço atualizado",
        data: await prices
    });
})


app.listen(3000, () => {
    console.log("Server on...")
})