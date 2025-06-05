import express from 'express';
import { changeJobApplicationStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController.js';
import upload from '../config/multer.js';
import protectCompany from '../middleware/authMiddleware.js';

const router = express.Router();

//register a company
router.post('/register',upload.single('image'),registerCompany);

//company login
router.post('/login', loginCompany);

//Get company data 
router.get('/company',protectCompany ,getCompanyData);

// post a job
router.post('/post-job',protectCompany, postJob);

//get Applicants data of company
router.get('/applicants',protectCompany ,getCompanyJobApplicants);

// Get Company Job list
router.get('/list-jobs',protectCompany ,getCompanyPostedJobs);

// Change Application status
router.post('/change-status',protectCompany ,changeJobApplicationStatus);

// Change Application's visibility
router.post('/change-visibility',protectCompany ,changeVisibility);

export default router;