// import * as React from "react";
// import { DetailsList } from "@fluentui/react";
// import { ITraining } from "../../models/ITraining";

// interface IProps {
//     data: ITraining[];
// }

// const ReportsTable: React.FC<IProps> = ({ data }) => {
//     const columns = [
//         { key: "course", name: "Course", fieldName: "CourseName", minWidth: 100 },
//         { key: "status", name: "Status", fieldName: "Status", minWidth: 80 },
//         { key: "start", name: "Start Date", fieldName: "StartDate", minWidth: 100 },
//         { key: "end", name: "End Date", fieldName: "EndDate", minWidth: 100 }
//     ];

//     return <DetailsList items={data} columns={columns} />;
// };

// export default ReportsTable;

import * as React from "react";
import { ITraining } from "../../models/ITraining";

interface IProps {
    data: ITraining[];
}

const ReportsTable: React.FC<IProps> = ({ data }) => {
    return (
        <table style={{ width: "100%", marginTop: "20px" }}>
            <thead>
                <tr>
                    <th>Course Name</th>
                    <th>Status</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                </tr>
            </thead>
            <tbody>
                {data.map(item => (
                    <tr key={item.Id}>
                        <td>{item.CourseName}</td>
                        <td>{item.Status}</td>
                        <td>{new Date(item.StartDate).toLocaleDateString()}</td>
                        <td>{new Date(item.EndDate).toLocaleDateString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ReportsTable;
