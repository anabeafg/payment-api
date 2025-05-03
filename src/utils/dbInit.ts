import fs from "fs/promises"
import path from "path"

const filePath = path.join(process.cwd(), "payments.json")
export const initDb = async (): Promise<void> => {
  try {
    await fs.access(filePath)
  } catch {
    await fs.writeFile(filePath, "[]")
    console.log("Arquivo payments.json para guardar os registros foi criado com sucesso.")
  }
};