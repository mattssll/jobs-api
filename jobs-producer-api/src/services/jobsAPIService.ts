import axios from 'axios'
import { JobPosition } from '../models/domain';
import { APIResponse } from '../models/responses';
import { parseJobPosition } from './parser'
import { sendArrayToDB } from '../controller/index'
import { apiSettings } from '../params';
import { buildFinalUrl, reqLimiter } from '../utils/utils';
import Bottleneck from "bottleneck";
import { startConsumingJobApi } from '../index'


// Flow: ConsumeApiService() -> fetchApiSaveDB() > BuildFinalUrl() 

export const consumeApiService = async (searchTerms: string[], countries: string[]) => {
    /* this fx will fetch data for 
   each country, for all of the 
   passed jobCategories          */
   countries.forEach(country => {
      console.log(`starting to consume data from api to country - ${country}`)
      searchTerms.map(jobCategory => fetchAPISaveDB(
        apiSettings.baseUrl, 
        country,
        apiSettings.nrOfRecorsPerPage, 
        jobCategory, 
        reqLimiter)
      );      
    })
    
}
    


// Fetch data from api, get number of pages, send data to db
const fetchAPISaveDB = async (baseUrl: string, 
                                    country: string,
                                    nrOfRecords: number,
                                    jobPositionName: string, 
                                    limiter: Bottleneck
                                    ) => {
    console.log(`starting to scrape process for ${country} and ${jobPositionName}`)
    const finalUrl = buildFinalUrl(baseUrl, country, nrOfRecords, jobPositionName, 1);
    let nrOfPages = null;
    try {
        const response = await limiter.schedule(() => axios.get<APIResponse>(`${finalUrl}`));
        nrOfPages = Math.floor((await response.data.count)/nrOfRecords);
        const jobPositions : JobPosition[] = await parseJobPosition(response.data.results, jobPositionName, country);
        if (jobPositions.length != 0) {
            sendArrayToDB(jobPositions);
        }
        console.log(`Number of pages to fetch is ${await nrOfPages}, country is ${country}, category is ${jobPositionName}`)
        if (nrOfPages >= 2) {
            for (let page = 2 ; page <= nrOfPages; page++) {
                const finalUrl = buildFinalUrl(baseUrl, country, nrOfRecords, jobPositionName, page);
                const response = await limiter.schedule(() => axios.get<APIResponse>(`${finalUrl}`));
                const jobPositions : JobPosition[] = await parseJobPosition(response.data.results, jobPositionName, country);
                if (jobPositions.length != 0) {
                    sendArrayToDB(jobPositions);
                }
            }
        }
        console.log("not finished again, sorry")
        // TO-DO: If not in DB POST IT, else PUT it
        // TO-DO: Cleaning Routine: if updated_at < today, set to inactive
    } catch(err) {
        console.error(err);
    }
    
    // After everything finishes it will start again
    console.log(`Finished One Loop for Every Country and Category, Starting again at ${new Date()}`)
    startConsumingJobApi()
};


