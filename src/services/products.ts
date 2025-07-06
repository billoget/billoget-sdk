import { HttpClient } from "../utils/http-client";
import {
  Product,
  ProductVariant,
  CreateProductDto,
  CreateProductVariantDto,
  CreateProductWithVariantsDto,
  UpdateProductDto,
  UpdateProductVariantDto,
  ProductQuery,
  ProductVariantQuery,
  PaginatedResponse,
} from "../types";
import { ApiResponse } from "../types";

export class ProductsService {
  private readonly basePath = "/api/public/products";

  constructor(private httpClient: HttpClient) {}

  /**
   * Get all products with pagination and filters
   */
  async list(query: ProductQuery = {}): Promise<PaginatedResponse<Product>> {
    const params = new URLSearchParams();

    if (query.page) params.append("page", query.page.toString());
    if (query.limit) params.append("limit", query.limit.toString());
    if (query.category) params.append("category", query.category);
    if (query.search) params.append("search", query.search);
    if (query.type) params.append("type", query.type);
    if (query.isActive !== undefined)
      params.append("isActive", query.isActive.toString());

    const url = `${this.basePath}${params.toString() ? `?${params.toString()}` : ""}`;
    const response = await this.httpClient.get<PaginatedResponse<Product>>(url);
    return response.data;
  }

  /**
   * Get a specific product by ID
   */
  async get(id: number): Promise<Product> {
    const response = await this.httpClient.get<Product>(
      `${this.basePath}/${id}`
    );
    return response.data;
  }

  /**
   * Create a new product
   */
  async create(data: CreateProductDto): Promise<Product> {
    const response = await this.httpClient.post<Product>(this.basePath, data);
    return response.data;
  }

  /**
   * Create a product with variants
   */
  async createWithVariants(
    data: CreateProductWithVariantsDto
  ): Promise<Product> {
    const response = await this.httpClient.post<Product>(
      `${this.basePath}/with-variants`,
      data
    );
    return response.data;
  }

  /**
   * Update an existing product
   */
  async update(id: number, data: UpdateProductDto): Promise<Product> {
    const response = await this.httpClient.put<Product>(
      `${this.basePath}/${id}`,
      data
    );
    return response.data;
  }

  /**
   * Delete a product
   */
  async delete(id: number): Promise<void> {
    await this.httpClient.delete<void>(`${this.basePath}/${id}`);
  }

  /**
   * Search products by name, description, SKU or category
   */
  async search(
    searchTerm: string,
    query: Omit<ProductQuery, "search"> = {}
  ): Promise<PaginatedResponse<Product>> {
    return this.list({
      ...query,
      search: searchTerm,
    });
  }

  /**
   * Get products by category
   */
  async getByCategory(
    category: string,
    query: Omit<ProductQuery, "category"> = {}
  ): Promise<PaginatedResponse<Product>> {
    return this.list({
      ...query,
      category,
    });
  }

  /**
   * Get products with pagination (alias for list)
   */
  async paginate(
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Product>> {
    return this.list({ page, limit });
  }

  // Product Variants methods

  /**
   * Get all variants for a product
   */
  async getVariants(
    productId: number,
    query: ProductVariantQuery = {}
  ): Promise<PaginatedResponse<ProductVariant>> {
    const params = new URLSearchParams();

    if (query.page) params.append("page", query.page.toString());
    if (query.limit) params.append("limit", query.limit.toString());
    if (query.isActive !== undefined)
      params.append("isActive", query.isActive.toString());

    const url = `${this.basePath}/${productId}/variants${params.toString() ? `?${params.toString()}` : ""}`;
    const response =
      await this.httpClient.get<PaginatedResponse<ProductVariant>>(url);
    return response.data;
  }

  /**
   * Get active variants for a product
   */
  async getActiveVariants(
    productId: number,
    query: Omit<ProductVariantQuery, "isActive"> = {}
  ): Promise<PaginatedResponse<ProductVariant>> {
    return this.getVariants(productId, {
      ...query,
      isActive: true,
    });
  }

  /**
   * Get a specific product variant by ID
   */
  async getVariant(variantId: number): Promise<ProductVariant> {
    const response = await this.httpClient.get<ProductVariant>(
      `/api/public/product-variants/${variantId}`
    );
    return response.data;
  }

  /**
   * Create a new product variant
   */
  async createVariant(data: CreateProductVariantDto): Promise<ProductVariant> {
    const response = await this.httpClient.post<ProductVariant>(
      "/api/public/product-variants",
      data
    );
    return response.data;
  }

  /**
   * Update an existing product variant
   */
  async updateVariant(
    variantId: number,
    data: UpdateProductVariantDto
  ): Promise<ProductVariant> {
    const response = await this.httpClient.put<ProductVariant>(
      `/api/public/product-variants/${variantId}`,
      data
    );
    return response.data;
  }

  /**
   * Delete a product variant
   */
  async deleteVariant(variantId: number): Promise<void> {
    await this.httpClient.delete<void>(
      `/api/public/product-variants/${variantId}`
    );
  }
}
