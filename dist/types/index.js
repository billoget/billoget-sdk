"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductType = exports.ApprovalAction = exports.ApprovalStatus = exports.BudgetState = void 0;
// Budget types
var BudgetState;
(function (BudgetState) {
    BudgetState[BudgetState["GENERATED"] = 0] = "GENERATED";
    BudgetState[BudgetState["APPROVED"] = 1] = "APPROVED";
    BudgetState[BudgetState["REJECTED"] = 2] = "REJECTED";
})(BudgetState || (exports.BudgetState = BudgetState = {}));
// Budget Approval types
var ApprovalStatus;
(function (ApprovalStatus) {
    ApprovalStatus["PENDING"] = "pending";
    ApprovalStatus["APPROVED"] = "approved";
    ApprovalStatus["REJECTED"] = "rejected";
    ApprovalStatus["CANCELLED"] = "cancelled";
})(ApprovalStatus || (exports.ApprovalStatus = ApprovalStatus = {}));
var ApprovalAction;
(function (ApprovalAction) {
    ApprovalAction["SUBMITTED"] = "submitted";
    ApprovalAction["APPROVED"] = "approved";
    ApprovalAction["REJECTED"] = "rejected";
    ApprovalAction["CANCELLED"] = "cancelled";
    ApprovalAction["RESUBMITTED"] = "resubmitted";
})(ApprovalAction || (exports.ApprovalAction = ApprovalAction = {}));
// Product types
var ProductType;
(function (ProductType) {
    ProductType["PRODUCT"] = "product";
    ProductType["SERVICE"] = "service";
})(ProductType || (exports.ProductType = ProductType = {}));
// Re-export query types
__exportStar(require("./query"), exports);
//# sourceMappingURL=index.js.map