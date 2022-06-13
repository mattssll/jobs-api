import { consumeApiService } from './services/jobsAPIService'
import { connectToDatabase } from "./database/database";
import { searchTerms } from './params'


export const startConsumingJobApi : Function = async () => { 
  connectToDatabase().then(async () => { 
    console.log("starting api consuming cycle")
    await consumeApiService(searchTerms.jobCategories, searchTerms.countries);
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
}


// kickstart for first time then will loop this fx in jobsAPIService this function, so app keeps consuming
startConsumingJobApi()

