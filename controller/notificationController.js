import db from "../models/index.js";

const {NotificationModel} = db ;

export const addNotification = async (req , res) =>{
    try{
        const {message , 	transactionId} = req.body ;
        if(!message || !transactionId){
            return res.status(500).json({
                error: 'Please provide all fields'
            })
        }
        const newNotification = await NotificationModel.create({
            message,
            transactionId
        })
        console.log('Notifications added successfuly');
        return res.status(200).json({
            msg: 'Notifications added successfuly' ,
            data : newNotification
        })
        
    }catch(error){
        console.log('Failed');
        return res.status(500).json({
            msg: "Failed",
            error:  error
        })
    }
}

export const viewAllNotifications = async (req, res) => {
    try {
      const allNotifications = await NotificationModel.findAll({
        order: [['createdAt', 'DESC']],
      });
      return res.status(200).json({
        msg: 'Fetched all notifications successfully',
        data: allNotifications
      });
    } catch (error) {
      console.log('Failed');
      return res.status(500).json({
        msg: 'Failed',
        error: error
      });
    }
  };
  
  export const deleteNotification = async (req, res) => {
    try {
      const id = req.body.id;
      const deletedNotification = await NotificationModel.destroy({
        where: {
          id: id
        }
      });
      if (deletedNotification) {
        return res.status(200).json({
          msg: 'Notification deleted successfully'
        });
      } else {
        return res.status(404).json({
          msg: 'Notification not found'
        });
      }
    } catch (error) {
      console.log('Failed');
      return res.status(500).json({
        msg: 'Failed',
        error: error
      });
    }
  };

  //pagination 
export const paginationNotification = async (req , res) => {
    try {
        const page = req.query.page || 1;
        const pageSize = parseInt(req.query.pageSize) || 5   ;
    
        const offset = (page - 1) * pageSize;
    
        const allNotifications = await NotificationModel.findAll({
          limit: pageSize,
          offset: offset,
          order: [['createdAt', 'DESC']],
        });
    
        return res.status(200).json({
          msg: 'Fetched notifications successfully',
          data: allNotifications,
          pageInfo: {
            page: page,
            pageSize: pageSize,
          },
        });
      } catch (error) {
        console.log('Failed');
        return res.status(500).json({
          msg: 'Failed',
          error: error,
        });
      }
  }