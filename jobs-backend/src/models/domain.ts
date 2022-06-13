import { ObjectId } from "mongodb";


export interface iJobPosition {
    id: number,
    redirect_url: string,
    category: string,
    title: string,
    description: string,
    location: TLocation,
    salary_min: number | undefined,
    salary_max: number | undefined,
    company: string,
    latitude: number,
    longitude: number,
    created: Date;
};


export interface iJobPositionMongo 
    extends iJobPosition {
        _id: ObjectId
}

export type TLocation = {
    display_name: string,
    country: string,
    area: [string]
};


export class JobPosition implements iJobPosition {
    constructor(
    public id: number,
    public redirect_url: string,
    public category: string,
    public title: string,
    public description: string,
    public location: TLocation,
    public salary_min: number | undefined,
    public salary_max: number | undefined,
    public company: string,
    public latitude: number,
    public longitude: number,
    public created: Date
      ) {
        this.id = id;
        this.redirect_url = redirect_url;
        this.category = category;
        this.title = title;
        this.description = description;
        this.location = location;
        this.salary_min = salary_min;
        this.salary_max = salary_max;
        this.company = company;
        this.latitude = latitude;
        this.longitude = longitude;
        this.created = created;
    }
}