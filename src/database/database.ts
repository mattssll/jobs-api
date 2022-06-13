import { MongoClient, Collection, Db } from "mongodb";
import { config } from "dotenv";


export const collections: { jobs?: Collection } = {}


export async function connectToDatabase() {
    config();
    const client: MongoClient = new MongoClient(process.env.DB_CONN_STRING!);
    await client.connect();
    const db: Db = client.db(process.env.DB_NAME);
    const jobsCollection: Collection = db.collection(process.env.COLLECTION_NAME!);
    collections.jobs = jobsCollection;   
    console.log(`Success connecting to db: ${db.databaseName},\nto collection: ${jobsCollection.collectionName}`);
 }