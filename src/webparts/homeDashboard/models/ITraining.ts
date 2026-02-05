export interface ITraining {
    Id: number;
    Title: string; // Course Name
    CourseName: string;
    Description?: string;
    StartDate: string;
    EndDate: string;
    TrainingStatus: string;
    AssignedUsers?: any[];
    Status: string;
}
