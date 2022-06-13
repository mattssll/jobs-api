import { consumeApiService } from './services/jobsAPIService'
import { searchTerms } from './params'
import { connectToDatabase } from "../database/database";
//import { oneRequestByMs } from "./utils/utils"

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


// kickstart - in jobsAPIService this function is called again after scraping all categories and countries
startConsumingJobApi()

