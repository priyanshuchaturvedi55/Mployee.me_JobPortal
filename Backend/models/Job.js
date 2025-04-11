import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  jobId: { type: String, required: true, unique: true }, 
  title: { type: String },
  company: { type: String },
  location: { type: String },
  job_link: { type: String },
  employment_type: { type: String },
  experience: { type: String },
  source: { type: String },
  country: { type: String }, 
  postedDateTime: { type: Date },
  companyImageUrl: { type: String },
  min_exp: { type: Number },
  max_exp: { type: Number },
  seniority_level: { type: String }, 
  company_url: { type: String },  
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);
