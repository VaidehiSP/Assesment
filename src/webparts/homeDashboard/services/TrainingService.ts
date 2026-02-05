
import { GetListItem, CreateItem, UpdateItem } from '../DAL/Commonfile';
import { SPHttpClient } from '@microsoft/sp-http';

// Get all events
export async function getAllTrainings(WebUrl: string, spHttpClient: SPHttpClient) {
    const filter = "";
    return await getMethod(WebUrl, spHttpClient, filter);
}



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
