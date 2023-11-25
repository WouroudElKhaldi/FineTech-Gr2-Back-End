import db from "../models/index.js";
const {CategoryModel} = db ;


// add category 
export const addCategory = async (req, res) => {
    try {
      const { name, type } = req.body;
  
      if (!name || !type) {
        return res.status(400).json({
          error: 'Please provide name and type for the category',
        });
      }
  
      const newCategory = await CategoryModel.create({
        name,
        type,
      });
  
      return res.status(200).json({
        msg: 'Category added successfully',
        data: newCategory,
      });
    } catch (error) {
      console.error('Failed to add category:', error);
      return res.status(500).json({
        msg: 'Failed',
        error: error.message,
      });
    }
  };
  

// get all category without pagination
export const getAllCategories = async (req, res) => {
    try {
      const categories = await CategoryModel.findAll();
  
      return res.status(200).json({
        msg: 'Fetched all categories successfully',
        data: categories,
      });
    } catch (error) {
      console.error('Failed to get all categories:', error);
      return res.status(500).json({
        msg: 'Failed',
        error: error.message,
      });
    }
};

 
// delete category 
export const deleteCategory = async (req, res) => {
    try {
      const id = req.body.id;
  
      const category = await CategoryModel.findByPk(id);
  
      if (!category) {
        return res.status(404).json({
          msg: 'Category not found',
        });
      }
  
      await category.destroy();
  
      return res.status(200).json({
        msg: 'Category deleted successfully',
      });
    } catch (error) {
      console.error('Failed to delete category:', error);
      return res.status(500).json({
        msg: 'Failed',
        error: error.message,
      });
    }
};

 
// update category 
export const editCategory = async (req, res) => {
    try {
      const id = req.body.id;
      const { name, type } = req.body;
  
      const category = await CategoryModel.findByPk(id);
  
      if (!category) {
        return res.status(404).json({
          msg: 'Category not found',
        });
      }
  
      // Update category attributes
      category.name = name || category.name;
      category.type = type || category.type;
  
      await category.save();
  
      return res.status(200).json({
        msg: 'Category updated successfully',
        data: category,
      });
    } catch (error) {
      console.error('Failed to edit category:', error);
      return res.status(500).json({
        msg: 'Failed',
        error: error.message,
      });
    }
};
  

// pagination for get category 
export const paginationCategory = async (req, res) => {
    try {
      const page = req.query.page || 1;
      const pageSize = parseInt(req.query.pageSize) || 5;
  
      const offset = (page - 1) * pageSize;
  
      const categories = await CategoryModel.findAll({
        limit: pageSize,
        offset: offset,
      });

      return res.status(200).json({
        msg: 'Fetched categories successfully',
        data: categories,
        pageInfo: {
          page: page,
          pageSize: pageSize,
        },
      });
    } catch (error) {
      console.error('Failed to paginate categories:', error);
      return res.status(500).json({
        msg: 'Failed',
        error: error.message,
      });
    }
};


//get category by type 
export const getCategoriesByType = async (req, res) => {
    try {
      const { type } = req.params;
  
      if (!type || !['Income', 'Outcome'].includes(type)) {
        return res.status(400).json({
          error: 'Invalid category type. Please provide "Income" or "Outcome".',
        });
      }
  
      const categories = await CategoryModel.findAll({
        where: { type: type },
      });
  
      return res.status(200).json({
        msg: `Fetched categories of type "${type}" successfully`,
        data: categories,
      });
    } catch (error) {
      console.error(`Failed to get categories of type "${type}":`, error);
      return res.status(500).json({
        msg: 'Failed',
        error: error.message,
      });
    }
  };