# Category Management Services

This document describes the category management functionality for the BXDP application.

## Overview

The category management system provides comprehensive CRUD operations for categories that can be used across different entity types (events, programs, resources, videos, etc.).

## Services Created

### 1. Get Categories Service
- **File**: `src/services/categories/getCategories.jsx`
- **Function**: `getCategories()`
- **Method**: GET
- **Endpoint**: `/categories`
- **Description**: Fetches all available categories

### 2. Add Category Service
- **File**: `src/services/categories/addCategory.jsx`
- **Function**: `addCategory({ name, description, type })`
- **Method**: POST
- **Endpoint**: `/categories`
- **Parameters**:
  - `name` (string, required): Category name
  - `description` (string, optional): Category description
  - `type` (string, optional): Category type (general, event, program, resource, video)

### 3. Delete Category Service
- **File**: `src/services/categories/deleteCategory.jsx`
- **Function**: `deleteCategory({ category_id })`
- **Method**: DELETE
- **Endpoint**: `/categories/{category_id}`
- **Parameters**:
  - `category_id` (string, required): ID of the category to delete

### 4. Update Category Service
- **File**: `src/services/categories/updateCategory.jsx`
- **Function**: `updateCategory({ category_id, name, description, type })`
- **Method**: PUT
- **Endpoint**: `/categories/{category_id}`
- **Parameters**:
  - `category_id` (string, required): ID of the category to update
  - `name` (string, optional): New category name
  - `description` (string, optional): New category description
  - `type` (string, optional): New category type

## Redux Integration

### Redux Slices Created

#### 1. Get Categories Slice
- **File**: `src/redux/categories/getCategoriesSlice.jsx`
- **Actions**:
  - `fetchCategories()`: Async thunk to fetch all categories
  - `clearCategoriesStatus()`: Clear status and error
  - `clearCategoriesError()`: Clear error only
- **State**:
  - `status`: Loading/success/failed status
  - `categories`: Array of category objects
  - `error`: Error message if any

#### 2. Add Category Slice
- **File**: `src/redux/categories/addCategorySlice.jsx`
- **Actions**:
  - `createCategory({ name, description, type })`: Async thunk to create a category
  - `clearAddCategoryStatus()`: Clear status and data
  - `clearAddCategoryError()`: Clear error only
- **State**:
  - `status`: Loading/success/failed status
  - `addedCategory`: The newly created category
  - `error`: Error message if any

#### 3. Delete Category Slice
- **File**: `src/redux/categories/deleteCategorySlice.jsx`
- **Actions**:
  - `removeCategory({ category_id })`: Async thunk to delete a category
  - `clearDeleteCategoryStatus()`: Clear status and data
  - `clearDeleteCategoryError()`: Clear error only
- **State**:
  - `status`: Loading/success/failed status
  - `deletedCategoryId`: ID of the deleted category
  - `error`: Error message if any

#### 4. Update Category Slice
- **File**: `src/redux/categories/updateCategorySlice.jsx`
- **Actions**:
  - `editCategory({ category_id, name, description, type })`: Async thunk to update a category
  - `clearUpdateCategoryStatus()`: Clear status and data
  - `clearUpdateCategoryError()`: Clear error only
- **State**:
  - `status`: Loading/success/failed status
  - `updatedCategory`: The updated category data
  - `error`: Error message if any

### Store Integration
All category reducers have been added to the main Redux store in `src/redux/store.jsx`:
- `getCategories`: getCategoriesReducer
- `addCategory`: addCategoryReducer
- `deleteCategory`: deleteCategoryReducer
- `updateCategory`: updateCategoryReducer

## Components

### Category Management Component
- **File**: `src/components/sharedComponents/CategoryManagement.jsx`
- **Features**:
  - Display all categories in a list
  - Add new categories with form validation
  - Edit existing categories
  - Delete categories with confirmation
  - Real-time status updates
  - Automatic list refresh after operations
  - Responsive design with Tailwind CSS

## Usage Examples

### Basic Usage in a Component

```javascript
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, createCategory } from "../../redux/categories/getCategoriesSlice";

const MyComponent = () => {
  const dispatch = useDispatch();
  const { categories, status } = useSelector((state) => state.getCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddCategory = () => {
    dispatch(createCategory({
      name: "New Category",
      description: "Category description",
      type: "general"
    }));
  };

  return (
    <div>
      {status === "loading" && <p>Loading...</p>}
      {categories.map(category => (
        <div key={category.category_id}>
          <h3>{category.name}</h3>
          <p>{category.description}</p>
          <span>{category.type}</span>
        </div>
      ))}
    </div>
  );
};
```

### Using the Category Management Component

```javascript
import CategoryManagement from "../sharedComponents/CategoryManagement";

const AdminPage = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <CategoryManagement />
    </div>
  );
};
```

## API Endpoints

### Base URL
All endpoints use the `VITE_BXDP_DEV_SERVER` environment variable as the base URL.

### Endpoints
- `GET /categories` - Get all categories
- `POST /categories` - Create a new category
- `PUT /categories/{category_id}` - Update a category
- `DELETE /categories/{category_id}` - Delete a category

### Request/Response Format

#### Create Category Request
```json
{
  "name": "Category Name",
  "description": "Category description",
  "type": "general"
}
```

#### Category Response
```json
{
  "category_id": "123",
  "name": "Category Name",
  "description": "Category description",
  "type": "general",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

## Error Handling

All services include comprehensive error handling:
- Network errors are caught and returned
- Validation errors are handled appropriately
- Redux slices track error states
- Components display error messages to users

## Best Practices

1. **Always clear status after operations**: Use the clear status actions to reset state
2. **Refresh data after mutations**: Call `fetchCategories()` after add/update/delete operations
3. **Handle loading states**: Check status before rendering data
4. **Validate input**: Ensure required fields are provided before making API calls
5. **Confirm destructive actions**: Always confirm before deleting categories

## Future Enhancements

Potential improvements for the category system:
- Category hierarchy (parent/child relationships)
- Category icons/images
- Category usage statistics
- Bulk operations (bulk delete, bulk update)
- Category search and filtering
- Category permissions and access control 