export interface ApiResponse<T> {
    data: T;
    pagination?: {
        page: number;
        limit: number;
        total: number;
    };
}
export interface PaginationInfo {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
}
export interface ApiError {
    message: string;
    error?: string;
    statusCode?: number;
}
export declare enum BudgetState {
    GENERATED = 0,
    APPROVED = 1,
    REJECTED = 2
}
export interface BudgetItem {
    id: number;
    productId?: number;
    packageId?: number;
    quantity: number;
    unitPrice: number;
    subtotal: number;
    budgetId: number;
    product?: Product;
    package?: any;
}
export interface Budget {
    id: number;
    currency: string;
    issueDate: Date;
    expirationDate: Date;
    customerId: number;
    sellerId: number;
    businessId?: number;
    minimumPaymentToConfirm: number;
    state: BudgetState;
    subtotal: number;
    total: number;
    iva: number;
    preferenceId?: string;
    paymentUrl?: string;
    paymentData?: any;
    publicToken?: string;
    comments?: string;
    ubs_id?: string;
    ubs_version?: string;
    sign_track_id?: string;
    business_budget_id?: number;
    isArchived?: boolean;
    customer?: Customer;
    seller?: any;
    business?: any;
    items?: BudgetItem[];
    createdAt?: Date;
    updatedAt?: Date;
}
export interface CreateBudgetItemDto {
    productId?: number;
    packageId?: number;
    quantity: number;
    unitPrice: number;
}
export interface CreateBudgetDto {
    currency: string;
    issueDate: Date;
    expirationDate: Date;
    customerId: number;
    sellerId: number;
    businessId?: number;
    minimumPaymentToConfirm: number;
    subtotal: number;
    total: number;
    iva: number;
    comments?: string;
    items: CreateBudgetItemDto[];
}
export declare enum ApprovalStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected",
    CANCELLED = "cancelled"
}
export declare enum ApprovalAction {
    SUBMITTED = "submitted",
    APPROVED = "approved",
    REJECTED = "rejected",
    CANCELLED = "cancelled",
    RESUBMITTED = "resubmitted"
}
export interface BudgetApproval {
    id: number;
    budgetId: number;
    requestedBy: number;
    approvedBy?: number;
    status: ApprovalStatus;
    action: ApprovalAction;
    comments?: string;
    requestNotes?: string;
    reviewedAt?: Date;
    approvedAt?: Date;
    rejectedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    budget?: Budget;
    requestedByUser?: any;
    approvedByUser?: any;
}
export interface ApprovalConfig {
    id: number;
    businessId: number;
    requiresBudgetApproval: boolean;
    ownerCanApprove: boolean;
    adminCanApprove: boolean;
    approvalThreshold?: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface BudgetApprover {
    id: number;
    businessId: number;
    userId: number;
    isActive: boolean;
    assignedBy: number;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
    user?: any;
    assignedByUser?: any;
}
export interface CreateApprovalConfigDto {
    requiresBudgetApproval: boolean;
    ownerCanApprove: boolean;
    adminCanApprove: boolean;
    approvalThreshold?: number;
    isActive?: boolean;
}
export interface SubmitApprovalDto {
    budgetId: number;
    requestNotes?: string;
}
export interface ProcessApprovalDto {
    action: "approve" | "reject";
    comments?: string;
}
export interface AssignApproverDto {
    userId: number;
    notes?: string;
}
export interface PublicBudget {
    id: number;
    currency: string;
    issueDate: Date;
    expirationDate: Date;
    minimumPaymentToConfirm: number;
    state: BudgetState;
    subtotal: number;
    total: number;
    iva: number;
    paymentUrl?: string;
    publicToken: string;
    comments?: string;
    ubs_id?: string;
    ubs_version?: string;
    sign_track_id?: string;
    business_budget_id?: number;
    customer?: Pick<Customer, "firstName" | "lastName" | "email" | "phoneNumber">;
    seller?: {
        firstName: string;
        lastName: string;
        email: string;
    };
    business?: {
        name: string;
        email?: string;
        phoneNumber?: string;
        address?: string;
        logoUrl?: string;
    };
    items?: Array<{
        id: number;
        quantity: number;
        unitPrice: number;
        subtotal: number;
        product?: {
            description: string;
            category: string;
            sku?: string;
        };
        package?: {
            name: string;
            description?: string;
        };
    }>;
}
export interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    email?: string;
    phoneNumber?: string;
    dni?: number;
    cuit?: string;
    businessId: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface CreateCustomerDto {
    firstName: string;
    lastName: string;
    email?: string;
    phoneNumber?: string;
    dni?: number;
    cuit?: string;
    businessId?: number;
}
export interface UpdateCustomerDto {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    dni?: number;
    cuit?: string;
}
export declare enum ProductType {
    PRODUCT = "product",
    SERVICE = "service"
}
export interface Product {
    id: number;
    productCode: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    netContent?: number;
    netContentUnit?: string;
    isActive: boolean;
    sku?: string;
    barcode?: string;
    imageUrl?: string;
    type: ProductType;
    businessId?: number;
    variants?: ProductVariant[];
    createdAt: Date;
    updatedAt: Date;
}
export interface ProductVariant {
    id: number;
    name: string;
    description?: string;
    price: number;
    stock: number;
    sku?: string;
    barcode?: string;
    imageUrl?: string;
    attributes?: Record<string, any>;
    isActive: boolean;
    sortOrder: number;
    productId: number;
    product?: Product;
    createdAt: Date;
    updatedAt: Date;
}
export interface CreateProductDto {
    productCode: string;
    description: string;
    category: string;
    price: number;
    stock?: number;
    netContent?: number;
    netContentUnit?: string;
    isActive?: boolean;
    sku?: string;
    barcode?: string;
    imageUrl?: string;
    type?: ProductType;
    businessId?: number;
}
export interface CreateProductVariantDto {
    name: string;
    description?: string;
    price: number;
    stock?: number;
    sku?: string;
    barcode?: string;
    imageUrl?: string;
    attributes?: Record<string, any>;
    isActive?: boolean;
    sortOrder?: number;
    productId: number;
}
export interface CreateProductWithVariantsDto extends CreateProductDto {
    variants?: Omit<CreateProductVariantDto, "productId">[];
}
export interface UpdateProductDto {
    productCode?: string;
    description?: string;
    category?: string;
    price?: number;
    stock?: number;
    netContent?: number;
    netContentUnit?: string;
    isActive?: boolean;
    sku?: string;
    barcode?: string;
    imageUrl?: string;
    type?: ProductType;
}
export interface UpdateProductVariantDto {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    sku?: string;
    barcode?: string;
    imageUrl?: string;
    attributes?: Record<string, any>;
    isActive?: boolean;
    sortOrder?: number;
    productId?: number;
}
export interface PaginationQuery {
    page?: number;
    limit?: number;
}
export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        totalItems: number;
        itemCount: number;
        itemsPerPage: number;
        totalPages: number;
        currentPage: number;
    };
}
export interface CustomerQuery extends PaginationQuery {
    search?: string;
}
export interface ProductQuery extends PaginationQuery {
    category?: string;
    search?: string;
    type?: ProductType;
    isActive?: boolean;
}
export interface BudgetQuery extends PaginationQuery {
    status?: BudgetState;
    customerId?: number;
    search?: string;
    startDate?: string;
    endDate?: string;
}
export interface ApprovalQuery extends PaginationQuery {
    status?: ApprovalStatus;
    budgetId?: number;
    userId?: number;
}
export * from "./query";
//# sourceMappingURL=index.d.ts.map