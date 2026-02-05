// import { SPFI } from "@pnp/sp";
// import "@pnp/sp/webs";
// import "@pnp/sp/lists";
// import "@pnp/sp/items";
// import { ITraining } from "../models/ITraining";

// export class TrainingService {

//     constructor(private sp: SPFI) { }

//     public async getAllTrainings(): Promise<ITraining[]> {
//         return await this.sp.web.lists
//             .getByTitle("TrainingData")
//             .items
//             .select(
//                 "Id",
//                 "Title",
//                 "CourseName",
//                 "Description",
//                 "Status",
//                 "StartDate",
//                 "EndDate"
//             )();
//     }
// }





import { GetListItem, CreateItem, UpdateItem } from '../DAL/Commonfile';
import { SPHttpClient } from '@microsoft/sp-http';
// import { DateFormat, Utils } from '../DAL/Utils';



// // Get active events
// export async function GetEventData(WebUrl: string, spHttpClient: SPHttpClient) {
//     const today = Utils.convertDateToFormat(new Date(), DateFormat.MMDDYYYY);
//     const filter = `(End_Date eq '${today}' or End_Date ge '${today}') or (Start_Date eq '${today}' or Start_Date ge '${today}' and All_Day_Event eq '1')`; //(Active eq '1') and 

//     return await getMethod(WebUrl, spHttpClient, filter);
// }

// Get all events
export async function getAllTrainings(WebUrl: string, spHttpClient: SPHttpClient) {
    const filter = "";
    return await getMethod(WebUrl, spHttpClient, filter);
}


// Get data by ID
// export function GetEventDatabyId(WebUrl: string, spHttpClient: SPHttpClient, ID: number) {
//     let filter = "ID eq " + ID;
//     return getMethod(WebUrl, spHttpClient, filter);
// }

// // Get all active data
// export async function GetAllData(WebUrl: string, spHttpClient: SPHttpClient) {
//     const filter = `(Active eq '1')`;
//     return await getMethod(WebUrl, spHttpClient, filter);
// }

// // Get all event data within a date range

// Common function to fetch data
export async function getMethod(WebUrl: string, spHttpClient: SPHttpClient, filter: string) {
    const option = {
        select: "ID,CourseName,StartDate,EndDate,Description,Author/Title,Created,Status,AssignedUsers/Title",
        filter: filter,
        expand: "Author,AssignedUsers",
        top: 5000,
        orderby: "ID",
    };

    return await GetListItem(WebUrl, spHttpClient, "TrainingData", option);
}

// Save an event
export async function SaveEvent(WebUrl: string, spHttpClient: SPHttpClient, eventData: any) {
    return await CreateItem(WebUrl, spHttpClient, "TrainingData", eventData);
}

// Update an event
export async function UpdateEvent(WebUrl: string, spHttpClient: SPHttpClient, eventData: any, eventId: number) {
    return await UpdateItem(WebUrl, spHttpClient, "TrainingData", eventData, eventId);
}
