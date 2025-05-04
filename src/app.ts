import cors from "cors"
import swaggerUi from "swagger-ui-express"
import path from "path"
import fs from "fs"
import paymentRoutes from "./routes/paymentRoutes"
import express from "express"
import { invalidJsonHandler } from "./middleware/invalidJsonHandler"
import { errorHandler } from "./middleware/errorHandler"

const app = express()
const swaggerPath = path.resolve(__dirname, "..", "swagger.json")
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, "utf-8"))

app.use(cors())
app.use(express.json())
app.use(invalidJsonHandler)
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(paymentRoutes)
app.use(errorHandler)

export default app
