import { JobPosition } from '../models/domain';


export const parseJobPosition = (payload: [JobPosition | any], jobPositionName: string) : any => {
  //console.log(payload);  
  
    const myPositionsJsonArray = payload.map(item=>{
        const jobPosObj = new JobPosition(
          parseInt(item.id),
          item.redirect_url,
          jobPositionName,
          item.title,
          item.description,
          item.location,
          item.salary_min,
          item.salary_max,
          item.company.display_name,
          item.latitude,
          item.longitude,
          item.created
        );
        const jsonString: string = JSON.stringify(jobPosObj);
        const parsedJson: JobPosition = JSON.parse(jsonString);
        return parsedJson
  })
  // console.log(myPositionsJsonArray[0]); // to see one record
  if (myPositionsJsonArray.length != 0) {
    console.log(`Just parsed category - ${myPositionsJsonArray[0].category} at ${new Date()} `)
  }
  console.log(myPositionsJsonArray[0])
  return myPositionsJsonArray;
}
