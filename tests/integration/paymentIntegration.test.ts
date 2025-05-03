import request from "supertest";
import app from "../../src/app";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "payments.json");
const mockPayment = {
  id: "test-id",
  amount: 100,
  status: "pending",
  dueDate: "2025-12-31T00:00:00.000Z"
};

beforeAll(async () => {
  await fs.writeFile(filePath, JSON.stringify([{ ...mockPayment, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }], null, 2));
});

afterAll(async () => {
  await fs.writeFile(filePath, JSON.stringify([], null, 2));
});

describe("Integração - API de Pagamentos", () => {
  it("deve retornar todos os pagamentos", async () => {
    const response = await request(app).get("/payments/list");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("deve retornar um pagamento com base no ID", async () => {
    const response = await request(app).get(`/payments/list/${mockPayment.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", mockPayment.id);
  });

  it("deve retornar 404 se o pagamento não for encontrado", async () => {
    const response = await request(app).get("/payments/list/id-invalido");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "Pagamento não encontrado");
  });

  it("deve criar um novo pagamento", async () => {
    const payment = {
      amount: 200,
      status: "paid",
      dueDate: "2025-12-01T00:00:00.000Z"
    };
    const response = await request(app).post("/payments/create").send(payment);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("deve editar um pagamento existente", async () => {
    const updateData = {
      amount: 300,
      dueDate: "2026-01-01T00:00:00.000Z"
    };
    const response = await request(app).put(`/payments/update/${mockPayment.id}`).send(updateData);
    expect(response.status).toBe(200);
    expect(response.body.amount).toBe(updateData.amount);
    expect(response.body.dueDate).toBe(updateData.dueDate);
  });

  it("deve atualizar apenas o status do pagamento", async () => {
    const updateStatus = {
      status: "paid"
    };
    const response = await request(app).patch(`/payments/updateStatus/${mockPayment.id}`).send(updateStatus);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(updateStatus.status);
  });
});
