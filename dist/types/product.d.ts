export interface Product {
    id: string;
    name: string;
    description?: string;
    price: number;
    sku?: string;
    category?: string;
    unit?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    metadata?: Record<string, any>;
}
export interface CreateProductRequest {
    name: string;
    description?: string;
    price: number;
    sku?: string;
    category?: string;
    unit?: string;
    isActive?: boolean;
    metadata?: Record<string, any>;
}
export interface UpdateProductRequest {
    name?: string;
    description?: string;
    price?: number;
    sku?: string;
    category?: string;
    unit?: string;
    isActive?: boolean;
    metadata?: Record<string, any>;
}
export interface ProductQueryParams {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    isActive?: boolean;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
    order?: "asc" | "desc";
}
//# sourceMappingURL=product.d.ts.map