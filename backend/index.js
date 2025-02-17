const express = require("express");
const PORT = 3000
const app = express();
const rootRouter = require("./routes/index")
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.use("/api/v1",rootRouter)

app.listen(PORT)