import { AddCategoryData, AddCategoryVariables, ListProductsByCategoryData, ListProductsByCategoryVariables, UpdateProductPriceData, UpdateProductPriceVariables, ListOrdersForBuyerData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useAddCategory(options?: useDataConnectMutationOptions<AddCategoryData, FirebaseError, AddCategoryVariables>): UseDataConnectMutationResult<AddCategoryData, AddCategoryVariables>;
export function useAddCategory(dc: DataConnect, options?: useDataConnectMutationOptions<AddCategoryData, FirebaseError, AddCategoryVariables>): UseDataConnectMutationResult<AddCategoryData, AddCategoryVariables>;

export function useListProductsByCategory(vars: ListProductsByCategoryVariables, options?: useDataConnectQueryOptions<ListProductsByCategoryData>): UseDataConnectQueryResult<ListProductsByCategoryData, ListProductsByCategoryVariables>;
export function useListProductsByCategory(dc: DataConnect, vars: ListProductsByCategoryVariables, options?: useDataConnectQueryOptions<ListProductsByCategoryData>): UseDataConnectQueryResult<ListProductsByCategoryData, ListProductsByCategoryVariables>;

export function useUpdateProductPrice(options?: useDataConnectMutationOptions<UpdateProductPriceData, FirebaseError, UpdateProductPriceVariables>): UseDataConnectMutationResult<UpdateProductPriceData, UpdateProductPriceVariables>;
export function useUpdateProductPrice(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateProductPriceData, FirebaseError, UpdateProductPriceVariables>): UseDataConnectMutationResult<UpdateProductPriceData, UpdateProductPriceVariables>;

export function useListOrdersForBuyer(options?: useDataConnectQueryOptions<ListOrdersForBuyerData>): UseDataConnectQueryResult<ListOrdersForBuyerData, undefined>;
export function useListOrdersForBuyer(dc: DataConnect, options?: useDataConnectQueryOptions<ListOrdersForBuyerData>): UseDataConnectQueryResult<ListOrdersForBuyerData, undefined>;
