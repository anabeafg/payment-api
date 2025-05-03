import { PaymentService } from "../../src/services/paymentService"
import { PaymentStatus } from "../../src/models/payment"
import * as fileHandler from "../../src/utils/fileHandler"

jest.mock("../../src/utils/fileHandler")

const mockedRead = fileHandler.readPayments as jest.Mock
const mockedWrite = fileHandler.writePayments as jest.Mock

describe("PaymentService", () => {
  const service = new PaymentService()

  beforeEach(() => {
    mockedRead.mockReset();
    mockedWrite.mockReset();
  })

  it("deve criar um novo pagamento", async () => {
    mockedRead.mockResolvedValue([]);
    mockedWrite.mockResolvedValue(undefined)

    const payment = await service.create({ amount: 100, dueDate: "2025-05-02T15:23:10.354Z" })

    expect(payment.amount).toBe(100)
    expect(payment.status).toBe(PaymentStatus.PENDING)
    expect(mockedWrite).toHaveBeenCalled()
  })

  it("deve lançar uma exceção caso o pagamento não seja encontrado", async () => {
    mockedRead.mockResolvedValue([])
    await expect(service.getById("id-inexistente")).rejects.toThrow("Pagamento não encontrado")
  })

  it("deve retornar todos os pagamentos", async () => {
    const payments = [{ id: "1", amount: 50, status: PaymentStatus.PENDING, createdDate: "", updatedDate: "" }]
    mockedRead.mockResolvedValue(payments)

    const result = await service.list()
    expect(result).toEqual(payments)
  })

  it("deve retornar uma lista vazia quando não houver pagamentos", async () => {
    mockedRead.mockResolvedValue([])

    const result = await service.list()
    expect(result).toEqual([])
  })

  it("deve buscar um pagamento por ID", async () => {
    const payment = { id: "123", amount: 100, status: PaymentStatus.PENDING, createdDate: "", updupdatedDated: "" }
    mockedRead.mockResolvedValue([payment])

    const result = await service.getById("123")
    expect(result).toEqual(payment)
  });

  it("deve atualizar um pagamento", async () => {
    const payment = { id: "123", amount: 100, status: PaymentStatus.PENDING}
    mockedRead.mockResolvedValue([payment])
    mockedWrite.mockResolvedValue(undefined)

    const updated = await service.update("123", { amount: 200, dueDate: "2025-05-23T14:00:00.000Z" })

    expect(updated.amount).toBe(200)
    expect(mockedWrite).toHaveBeenCalled()
  });

  it("deve lançar uma exceção ao tentar atualizar um pagamento não existente", async () => {
    mockedRead.mockResolvedValue([])
    await expect(service.update("id-inexistente", { amount: 200, dueDate: "2025-05-23T14:00:00.000Z" })).rejects.toThrow("Pagamento não encontrado")
  });

  it("deve atualizar o status do pagamento", async () => {
    const payment = { id: "321", status: PaymentStatus.PENDING }
    mockedRead.mockResolvedValue([payment])
    mockedWrite.mockResolvedValue(undefined)

    const result = await service.updateStatus("321", PaymentStatus.PAID)

    expect(result.status).toBe(PaymentStatus.PAID)
  })
})