import internal from "stream";

export type APIResponse = {
    __CLASS__ : string,
    results : [{"string" : number }],
    count: number,
    mean: number
};

export type mongoUpsertResponse = {
    acknowledged: boolean,
    modifiedCount: number,
    upsertedId: any,
    upsertedCount: number,
    matchedCount: number,
}