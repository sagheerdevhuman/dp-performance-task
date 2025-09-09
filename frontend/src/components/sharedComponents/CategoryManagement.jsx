import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchCategories, 
  createCategory, 
  removeCategory, 
  editCategory,
  clearCategoriesStatus,
  clearAddCategoryStatus,
  clearDeleteCategoryStatus,
  clearUpdateCategoryStatus
} from "../../redux/categories/getCategoriesSlice";

const CategoryManagement = () => {
  const dispatch = useDispatch();
  const { categories, status: fetchStatus } = useSelector((state) => state.getCategories);
  const { status: addStatus, addedCategory } = useSelector((state) => state.addCategory);
  const { status: deleteStatus, deletedCategoryId } = useSelector((state) => state.deleteCategory);
  const { status: updateStatus, updatedCategory } = useSelector((state) => state.updateCategory);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "general"
  });

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle add category
  const handleAddCategory = (e) => {
    e.preventDefault();
    dispatch(createCategory(formData));
    setFormData({ name: "", description: "", type: "general" });
    setShowAddForm(false);
  };

  // Handle edit category
  const handleEditCategory = (e) => {
    e.preventDefault();
    dispatch(editCategory({
      category_id: editingCategory.category_id,
      ...formData
    }));
    setFormData({ name: "", description: "", type: "general" });
    setShowEditForm(false);
    setEditingCategory(null);
  };

  // Handle delete category
  const handleDeleteCategory = (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(removeCategory({ category_id: categoryId }));
    }
  };

  // Handle edit button click
  const handleEditClick = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || "",
      type: category.type || "general"
    });
    setShowEditForm(true);
  };

  // Clear status messages
  useEffect(() => {
    if (addStatus === "success") {
      setTimeout(() => {
        dispatch(clearAddCategoryStatus());
        dispatch(fetchCategories()); // Refresh the list
      }, 2000);
    }
  }, [addStatus, dispatch]);

  useEffect(() => {
    if (deleteStatus === "success") {
      setTimeout(() => {
        dispatch(clearDeleteCategoryStatus());
        dispatch(fetchCategories()); // Refresh the list
      }, 2000);
    }
  }, [deleteStatus, dispatch]);

  useEffect(() => {
    if (updateStatus === "success") {
      setTimeout(() => {
        dispatch(clearUpdateCategoryStatus());
        dispatch(fetchCategories()); // Refresh the list
      }, 2000);
    }
  }, [updateStatus, dispatch]);

  const categoryTypes = [
    { value: "general", label: "General" },
    { value: "event", label: "Event" },
    { value: "program", label: "Program" },
    { value: "resource", label: "Resource" },
    { value: "video", label: "Video" }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Category Management</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Add New Category
        </button>
      </div>

      {/* Status Messages */}
      {addStatus === "success" && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          Category added successfully!
        </div>
      )}
      {deleteStatus === "success" && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          Category deleted successfully!
        </div>
      )}
      {updateStatus === "success" && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          Category updated successfully!
        </div>
      )}

      {/* Add Category Form */}
      {showAddForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
          <form onSubmit={handleAddCategory} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categoryTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={addStatus === "loading"}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {addStatus === "loading" ? "Adding..." : "Add Category"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setFormData({ name: "", description: "", type: "general" });
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Category Form */}
      {showEditForm && editingCategory && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Edit Category</h2>
          <form onSubmit={handleEditCategory} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categoryTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={updateStatus === "loading"}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {updateStatus === "loading" ? "Updating..." : "Update Category"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowEditForm(false);
                  setEditingCategory(null);
                  setFormData({ name: "", description: "", type: "general" });
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories List */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {fetchStatus === "loading" ? (
            <div className="p-6 text-center text-gray-500">Loading categories...</div>
          ) : fetchStatus === "failed" ? (
            <div className="p-6 text-center text-red-500">Failed to load categories</div>
          ) : categories && categories.length > 0 ? (
            categories.map((category) => (
              <div key={category.category_id} className="p-6 flex justify-between items-center">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-800">{category.name}</h3>
                  {category.description && (
                    <p className="text-gray-600 mt-1">{category.description}</p>
                  )}
                  <div className="flex gap-2 mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {category.type || "general"}
                    </span>
                    <span className="text-sm text-gray-500">
                      ID: {category.category_id}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(category)}
                    className="px-3 py-1 text-sm bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.category_id)}
                    disabled={deleteStatus === "loading"}
                    className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    {deleteStatus === "loading" ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">No categories found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryManagement; 