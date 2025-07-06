import { HttpClient } from "../utils/http-client";
import { Product, ProductVariant, CreateProductDto, CreateProductVariantDto, CreateProductWithVariantsDto, UpdateProductDto, UpdateProductVariantDto, ProductQuery, ProductVariantQuery, PaginatedResponse } from "../types";
export declare class ProductsService {
    private httpClient;
    private readonly basePath;
    constructor(httpClient: HttpClient);
    /**
     * Get all products with pagination and filters
     */
    list(query?: ProductQuery): Promise<PaginatedResponse<Product>>;
    /**
     * Get a specific product by ID
     */
    get(id: number): Promise<Product>;
    /**
     * Create a new product
     */
    create(data: CreateProductDto): Promise<Product>;
    /**
     * Create a product with variants
     */
    createWithVariants(data: CreateProductWithVariantsDto): Promise<Product>;
    /**
     * Update an existing product
     */
    update(id: number, data: UpdateProductDto): Promise<Product>;
    /**
     * Delete a product
     */
    delete(id: number): Promise<void>;
    /**
     * Search products by name, description, SKU or category
     */
    search(searchTerm: string, query?: Omit<ProductQuery, "search">): Promise<PaginatedResponse<Product>>;
    /**
     * Get products by category
     */
    getByCategory(category: string, query?: Omit<ProductQuery, "category">): Promise<PaginatedResponse<Product>>;
    /**
     * Get products with pagination (alias for list)
     */
    paginate(page?: number, limit?: number): Promise<PaginatedResponse<Product>>;
    /**
     * Get all variants for a product
     */
    getVariants(productId: number, query?: ProductVariantQuery): Promise<PaginatedResponse<ProductVariant>>;
    /**
     * Get active variants for a product
     */
    getActiveVariants(productId: number, query?: Omit<ProductVariantQuery, "isActive">): Promise<PaginatedResponse<ProductVariant>>;
    /**
     * Get a specific product variant by ID
     */
    getVariant(variantId: number): Promise<ProductVariant>;
    /**
     * Create a new product variant
     */
    createVariant(data: CreateProductVariantDto): Promise<ProductVariant>;
    /**
     * Update an existing product variant
     */
    updateVariant(variantId: number, data: UpdateProductVariantDto): Promise<ProductVariant>;
    /**
     * Delete a product variant
     */
    deleteVariant(variantId: number): Promise<void>;
}
//# sourceMappingURL=products.d.ts.map