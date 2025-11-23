# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useAddCategory, useListProductsByCategory, useUpdateProductPrice, useListOrdersForBuyer } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useAddCategory(addCategoryVars);

const { data, isPending, isSuccess, isError, error } = useListProductsByCategory(listProductsByCategoryVars);

const { data, isPending, isSuccess, isError, error } = useUpdateProductPrice(updateProductPriceVars);

const { data, isPending, isSuccess, isError, error } = useListOrdersForBuyer();

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { addCategory, listProductsByCategory, updateProductPrice, listOrdersForBuyer } from '@dataconnect/generated';


// Operation AddCategory:  For variables, look at type AddCategoryVars in ../index.d.ts
const { data } = await AddCategory(dataConnect, addCategoryVars);

// Operation ListProductsByCategory:  For variables, look at type ListProductsByCategoryVars in ../index.d.ts
const { data } = await ListProductsByCategory(dataConnect, listProductsByCategoryVars);

// Operation UpdateProductPrice:  For variables, look at type UpdateProductPriceVars in ../index.d.ts
const { data } = await UpdateProductPrice(dataConnect, updateProductPriceVars);

// Operation ListOrdersForBuyer: 
const { data } = await ListOrdersForBuyer(dataConnect);


```