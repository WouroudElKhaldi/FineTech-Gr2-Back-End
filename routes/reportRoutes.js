import express from "express";
import { getReportInfo } from "../controller/reportController.js";

const reportRouter = express.Router()

reportRouter.post('/report', getReportInfo)

export default reportRouter ;