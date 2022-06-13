import Bottleneck from "bottleneck";

export const oneRequestByMs = 720000

export const sleepFx = (ms:number) => new Promise(r => setTimeout(r, ms));

export const buildFinalUrl = (baseUrl: string, country:string, nrOfRecords: number, jobPositionName: string, page: number) : string => {
    const { config } = require('dotenv');
    config();
    const APP_ID = process.env.APP_ID
    const API_KEY = process.env.API_KEY
    const paramsUrl = `jobs/${country}/search/${page}?app_id=${APP_ID}&app_key=${API_KEY}&results_per_page=${nrOfRecords}&what=${jobPositionName.split(" ").join("%20")}&content-type=application/json`
    return `${baseUrl}${paramsUrl}`
}

// Tool to help limiting the amount of requests we make
export const reqLimiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: oneRequestByMs, // ms
});
