import { BudgetsService } from "../../services/budgets";
import { HttpClient } from "../../utils/http-client";
import { BillogetConfig } from "../../types/config";

// Mock HttpClient
jest.mock("../../utils/http-client");

describe("BudgetsService", () => {
  let budgetsService: BudgetsService;
  let mockHttpClient: jest.Mocked<HttpClient>;

  beforeEach(() => {
    const config: BillogetConfig = { apiKey: "bk_test_123" };
    mockHttpClient = new HttpClient(config) as jest.Mocked<HttpClient>;
    budgetsService = new BudgetsService(mockHttpClient);
  });

  describe("list", () => {
    it("should call GET with correct path and params", async () => {
      const params = { page: 1, limit: 10 };
      const mockResponse = {
        data: [],
        pagination: { page: 1, limit: 10, total: 0, hasMore: false },
      };

      mockHttpClient.get.mockResolvedValue(mockResponse);

      const result = await budgetsService.list(params);

      expect(mockHttpClient.get).toHaveBeenCalledWith(
        "/api/public/budgets",
        params
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getById", () => {
    it("should call GET with correct path", async () => {
      const id = "budget_123";
      const mockResponse = { data: { id, customerId: "customer_456" } };

      mockHttpClient.get.mockResolvedValue(mockResponse);

      const result = await budgetsService.getById(id);

      expect(mockHttpClient.get).toHaveBeenCalledWith(
        `/api/public/budgets/${id}`
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("create", () => {
    it("should call POST with correct path and data", async () => {
      const data = { customerId: "customer_456", items: [] };
      const mockResponse = { data: { id: "budget_123", ...data } };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await budgetsService.create(data);

      expect(mockHttpClient.post).toHaveBeenCalledWith(
        "/api/public/budgets",
        data
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
