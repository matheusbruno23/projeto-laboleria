import  express  from "express";
import dotenv from "dotenv"
import router from "./routes/index.routes.js";

dotenv.config()

const app = express()
app.use(express.json())
app.use(router)


const PORT = 5000 || process.env.PORT
app.listen(PORT, () => console.log(`Running server on PORT ${PORT}`))