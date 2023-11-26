import db from '../models/index.js';

const { CompanyModel } = db;



export const addCompany = async (req, res) => {
    try {
      const { name, address, capital, editedCapital } = req.body;
  
      if (!(name && address && capital && editedCapital)) {
        throw new Error('Please provide all the required information for adding a company');
      }
  
      const newCompany = await CompanyModel.create({ name, address, capital, editedCapital });
  
      res.status(200).json({ msg: 'Company added successfully', data: newCompany });
    } catch (error) {
      console.error('Failed to add company:', error.message);
      res.status(500).json({ msg: 'Failed', error: error.message });
    }
  };

  export const deleteCompany = async (req, res) => {
    try {
      const id = req.body.id;

      const company = await CompanyModel.findByPk(id);

      if (!company) {
        return res.status(404).json({
          msg: 'Company not found',
        });
      }

      await company.destroy();

      return res.status(200).json({
        msg: 'Company deleted successfully',
      });
    } catch (error) {
      console.error('Failed to delete company:', error);
      return res.status(500).json({
        msg: 'Failed',
        error: error.message,
      });
    }
};


export const getCompany = async (req, res) => {
    try {
      const companyId = req.body.id; 
  
      if (!companyId || isNaN(companyId)) {
        return res.status(400).json({
          msg: 'Invalid company ID',
        });
      }
  
      const company = await CompanyModel.findByPk(companyId);
  
      if (!company) {
        return res.status(404).json({
          msg: 'Company not found',
        });
      }
  
      return res.status(200).json({
        msg: 'Company retrieved successfully',
        data: company,
      });
    } catch (error) {
      console.error('Failed to get company:', error.message);
      return res.status(500).json({
        msg: 'Failed',
        error: error.message,
      });
    }
  };

export const editCompany = async (req, res) => {
    try {
      const { id, name, address, capital, editedCapital } = req.body;
  
      if (!id || !name || !address || !capital || !editedCapital) {
        return res.status(400).json({
          msg: 'Please provide all the required information for updating the company',
        });
      }
  
      const [updatedCount] = await CompanyModel.update(
        {
          name,
          address,
          capital,
          editedCapital,
        },
        {
          where: { id },
        }
      );
  
      if (updatedCount === 0) {
        return res.status(404).json({
          msg: 'Company not found or no changes were made',
        });
      }
  
      const updatedCompany = await CompanyModel.findByPk(id);
  
      return res.status(200).json({
        msg: 'Company updated successfully',
        data: updatedCompany,
      });
    } catch (error) {
      console.error('Failed to edit company:', error);
      return res.status(500).json({
        msg: 'Failed',
        error: error.message,
      });
    }
  };