import express from "express";
import {
    addNotification ,
    viewAllNotifications ,
    deleteNotification,
    paginationNotification
} from '../controller/notificationController.js'

const notificationRouter = express.Router() ;

//add notification 
notificationRouter.post('/add' , addNotification)
notificationRouter.get('/paginate' ,paginationNotification )
notificationRouter.get('/view' , viewAllNotifications)
notificationRouter.delete('/delete' , deleteNotification)

export default notificationRouter ; 