import app from "./app"
import { initDb } from "./utils/dbInit"
import dotenv from "dotenv"

dotenv.config();
const PORT = process.env.PORT || 3000

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`)
      console.log(`Swagger disponível em http://localhost:${PORT}/swagger`)
    })
  })
  .catch((err) => {
    console.error("Erro ao inicializar o banco de dados:", err)
  })