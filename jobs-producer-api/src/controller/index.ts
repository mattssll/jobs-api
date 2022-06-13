import { collections } from "../database/database";
import { JobPosition, iJobPositionMongo } from "../models/domain";
import { mongoUpsertResponse } from "../models/responses";



const dbUpsert = async (jobRecord: JobPosition) : Promise<mongoUpsertResponse> => {
    const dbConf = {
        mergeCond: {id: jobRecord.id},
        jobRecord: { $set: jobRecord},
        options:  { upsert: true }
    };
    var response: mongoUpsertResponse | any = undefined;
    collections.jobs!.updateOne(
        dbConf.mergeCond, 
        dbConf.jobRecord,
        dbConf.options,
        function(err, res) {
            if (err) throw err
        }
    )
    return response;
}



export const sendArrayToDB = async (jobsArray : JobPosition[]) => {
    // send upserts one by one to database
    jobsArray.map(jobPosition => {
        dbUpsert(jobPosition)
    })
    console.log(`upserted batch of ${jobsArray.length} records in mongo`)
}