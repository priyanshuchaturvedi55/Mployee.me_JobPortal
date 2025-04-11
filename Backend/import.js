import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Job from './models/Job.js';
import jobs from './data/jobs.json' assert { type: 'json' };

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Job.deleteMany(); 

  await Job.insertMany(
    jobs.map((j) => {
      let jobId = j["Job ID (Numeric)"];
      if (typeof jobId === 'object' && jobId.$numberLong) {
        jobId = jobId.$numberLong.toString();
      } else {
        jobId = jobId.toString();
      }

      
      let companyImageUrl = '';
      if (typeof j.companyImageUrl === 'string') {
        companyImageUrl = j.companyImageUrl;
      } else if (j.companyImageUrl?.$numberDouble) {
       
        companyImageUrl = isNaN(j.companyImageUrl.$numberDouble) ? '' : j.companyImageUrl.$numberDouble;
      }

      return {
        jobId,
        title: j.title,
        company: j.company,
        location: j.location,
        job_link: j.job_link,
        employment_type: j.employment_type,
        experience: j.experience,
        source: j.source,
        country: j.country,
        postedDateTime: j.postedDateTime?.$date || new Date(),
        companyImageUrl: companyImageUrl, 
        min_exp: j.min_exp,
        max_exp: j.max_exp,
      };
    })
  );

  console.log('Job data imported successfully!');
  process.exit();
}).catch((err) => {
  console.error('Error:', err);
});