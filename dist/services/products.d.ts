import { HttpClient } from "../utils/http-client";
import { Product, CreateProductRequest, UpdateProductRequest, ProductQueryParams } from "../types/product";
import { ApiResponse } from "../types";
export declare class ProductsService {
    private httpClient;
    private readonly basePath;
    constructor(httpClient: HttpClient);
    list(params?: ProductQueryParams): Promise<ApiResponse<Product[]>>;
    getById(id: string): Promise<ApiResponse<Product>>;
    create(data: CreateProductRequest): Promise<ApiResponse<Product>>;
    update(id: string, data: UpdateProductRequest): Promise<ApiResponse<Product>>;
    delete(id: string): Promise<ApiResponse<void>>;
}
//# sourceMappingURL=products.d.ts.map