import { BudgetsService } from "../../services/budgets";
import { HttpClient } from "../../utils/http-client";
import { BillogetConfig } from "../../types/config";

// Mock HttpClient
jest.mock("../../utils/http-client");
const MockedHttpClient = HttpClient as jest.MockedClass<typeof HttpClient>;

describe("BudgetsService", () => {
  let budgetsService: BudgetsService;
  let mockHttpClient: jest.Mocked<HttpClient>;

  beforeEach(() => {
    const config: BillogetConfig = { apiKey: "bk_test_123" };
    mockHttpClient = new MockedHttpClient(config) as jest.Mocked<HttpClient>;
    budgetsService = new BudgetsService(mockHttpClient);
  });

  describe("list", () => {
    it("should get budgets list with default parameters", async () => {
      const mockResponse = {
        data: {
          data: [
            {
              id: 1,
              currency: "USD",
              total: 100.0,
              state: 0,
              customerId: 123,
            },
          ],
          meta: {
            totalItems: 1,
            itemCount: 1,
            itemsPerPage: 10,
            totalPages: 1,
            currentPage: 1,
          },
        },
      };

      mockHttpClient.get.mockResolvedValue(mockResponse);

      const result = await budgetsService.list();

      expect(mockHttpClient.get).toHaveBeenCalledWith("/api/public/budgets");
      expect(result).toEqual(mockResponse.data);
    });

    it("should get budgets list with query parameters", async () => {
      const query = {
        page: 2,
        limit: 5,
        status: 1,
        customerId: 123,
        search: "laptop",
      };

      const mockResponse = {
        data: {
          data: [],
          meta: {
            totalItems: 0,
            itemCount: 0,
            itemsPerPage: 5,
            totalPages: 0,
            currentPage: 2,
          },
        },
      };

      mockHttpClient.get.mockResolvedValue(mockResponse);

      const result = await budgetsService.list(query);

      expect(mockHttpClient.get).toHaveBeenCalledWith(
        "/api/public/budgets?page=2&limit=5&status=1&customerId=123&search=laptop"
      );
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("get", () => {
    it("should get a specific budget by ID", async () => {
      const id = 123;
      const mockResponse = {
        data: {
          id: 123,
          currency: "USD",
          total: 150.0,
          state: 1,
          customerId: 456,
        },
      };

      mockHttpClient.get.mockResolvedValue(mockResponse);

      const result = await budgetsService.get(id);

      expect(mockHttpClient.get).toHaveBeenCalledWith(
        `/api/public/budgets/${id}`
      );
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("search", () => {
    it("should search budgets with search term", async () => {
      const searchTerm = "laptop";
      const mockResponse = {
        data: {
          data: [
            {
              id: 1,
              currency: "USD",
              total: 1200.0,
              state: 0,
              customerId: 789,
              comments: "MacBook Pro purchase",
            },
          ],
          meta: {
            totalItems: 1,
            itemCount: 1,
            itemsPerPage: 10,
            totalPages: 1,
            currentPage: 1,
          },
        },
      };

      mockHttpClient.get.mockResolvedValue(mockResponse);

      const result = await budgetsService.search(searchTerm);

      expect(mockHttpClient.get).toHaveBeenCalledWith(
        "/api/public/budgets?search=laptop"
      );
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("getByCustomer", () => {
    it("should get budgets by customer ID", async () => {
      const customerId = 456;
      const mockResponse = {
        data: {
          data: [
            {
              id: 1,
              currency: "USD",
              total: 300.0,
              state: 1,
              customerId: 456,
            },
          ],
          meta: {
            totalItems: 1,
            itemCount: 1,
            itemsPerPage: 10,
            totalPages: 1,
            currentPage: 1,
          },
        },
      };

      mockHttpClient.get.mockResolvedValue(mockResponse);

      const result = await budgetsService.getByCustomer(customerId);

      expect(mockHttpClient.get).toHaveBeenCalledWith(
        "/api/public/budgets?customerId=456"
      );
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("getByStatus", () => {
    it("should get budgets by status", async () => {
      const status = 1; // Approved
      const mockResponse = {
        data: {
          data: [
            {
              id: 1,
              currency: "USD",
              total: 500.0,
              state: 1,
              customerId: 123,
            },
          ],
          meta: {
            totalItems: 1,
            itemCount: 1,
            itemsPerPage: 10,
            totalPages: 1,
            currentPage: 1,
          },
        },
      };

      mockHttpClient.get.mockResolvedValue(mockResponse);

      const result = await budgetsService.getByStatus(status);

      expect(mockHttpClient.get).toHaveBeenCalledWith(
        "/api/public/budgets?status=1"
      );
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("getByDateRange", () => {
    it("should get budgets by date range", async () => {
      const startDate = "2024-01-01";
      const endDate = "2024-12-31";
      const mockResponse = {
        data: {
          data: [
            {
              id: 1,
              currency: "USD",
              total: 750.0,
              state: 0,
              customerId: 789,
              issueDate: "2024-06-15",
            },
          ],
          meta: {
            totalItems: 1,
            itemCount: 1,
            itemsPerPage: 10,
            totalPages: 1,
            currentPage: 1,
          },
        },
      };

      mockHttpClient.get.mockResolvedValue(mockResponse);

      const result = await budgetsService.getByDateRange(startDate, endDate);

      expect(mockHttpClient.get).toHaveBeenCalledWith(
        "/api/public/budgets?startDate=2024-01-01&endDate=2024-12-31"
      );
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("paginate", () => {
    it("should get paginated budgets", async () => {
      const page = 2;
      const limit = 5;
      const mockResponse = {
        data: {
          data: [],
          meta: {
            totalItems: 0,
            itemCount: 0,
            itemsPerPage: 5,
            totalPages: 0,
            currentPage: 2,
          },
        },
      };

      mockHttpClient.get.mockResolvedValue(mockResponse);

      const result = await budgetsService.paginate(page, limit);

      expect(mockHttpClient.get).toHaveBeenCalledWith(
        "/api/public/budgets?page=2&limit=5"
      );
      expect(result).toEqual(mockResponse.data);
    });
  });
});
