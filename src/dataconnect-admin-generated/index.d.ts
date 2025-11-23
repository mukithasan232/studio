import { ConnectorConfig, DataConnect, OperationOptions, ExecuteOperationResponse } from 'firebase-admin/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export interface AddCategoryData {
  category_insert: Category_Key;
}

export interface AddCategoryVariables {
  name: string;
  description?: string | null;
}

export interface Category_Key {
  id: UUIDString;
  __typename?: 'Category_Key';
}

export interface ListOrdersForBuyerData {
  orders: ({
    id: UUIDString;
    orderDate: TimestampString;
    totalAmount: number;
    status: string;
  } & Order_Key)[];
}

export interface ListProductsByCategoryData {
  products: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    price: number;
  } & Product_Key)[];
}

export interface ListProductsByCategoryVariables {
  categoryId: UUIDString;
}

export interface OrderItem_Key {
  orderId: UUIDString;
  productId: UUIDString;
  __typename?: 'OrderItem_Key';
}

export interface Order_Key {
  id: UUIDString;
  __typename?: 'Order_Key';
}

export interface ProductImage_Key {
  id: UUIDString;
  __typename?: 'ProductImage_Key';
}

export interface Product_Key {
  id: UUIDString;
  __typename?: 'Product_Key';
}

export interface UpdateProductPriceData {
  product_update?: Product_Key | null;
}

export interface UpdateProductPriceVariables {
  productId: UUIDString;
  newPrice: number;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

/** Generated Node Admin SDK operation action function for the 'AddCategory' Mutation. Allow users to execute without passing in DataConnect. */
export function addCategory(dc: DataConnect, vars: AddCategoryVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AddCategoryData>>;
/** Generated Node Admin SDK operation action function for the 'AddCategory' Mutation. Allow users to pass in custom DataConnect instances. */
export function addCategory(vars: AddCategoryVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AddCategoryData>>;

/** Generated Node Admin SDK operation action function for the 'ListProductsByCategory' Query. Allow users to execute without passing in DataConnect. */
export function listProductsByCategory(dc: DataConnect, vars: ListProductsByCategoryVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListProductsByCategoryData>>;
/** Generated Node Admin SDK operation action function for the 'ListProductsByCategory' Query. Allow users to pass in custom DataConnect instances. */
export function listProductsByCategory(vars: ListProductsByCategoryVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListProductsByCategoryData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateProductPrice' Mutation. Allow users to execute without passing in DataConnect. */
export function updateProductPrice(dc: DataConnect, vars: UpdateProductPriceVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateProductPriceData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateProductPrice' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateProductPrice(vars: UpdateProductPriceVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateProductPriceData>>;

/** Generated Node Admin SDK operation action function for the 'ListOrdersForBuyer' Query. Allow users to execute without passing in DataConnect. */
export function listOrdersForBuyer(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListOrdersForBuyerData>>;
/** Generated Node Admin SDK operation action function for the 'ListOrdersForBuyer' Query. Allow users to pass in custom DataConnect instances. */
export function listOrdersForBuyer(options?: OperationOptions): Promise<ExecuteOperationResponse<ListOrdersForBuyerData>>;

