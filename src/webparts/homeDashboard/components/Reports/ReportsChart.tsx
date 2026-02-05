// import * as React from "react";
// import { Pie } from "react-chartjs-2";
// import { ITraining } from "../../models/ITraining";

// interface IProps {
//     data: ITraining[];
// }

// const ReportsChart: React.FC<IProps> = ({ data }) => {

//     const statusMap: { [key: string]: number } = {};

//     data.forEach(item => {
//         if (item.Status) {
//             statusMap[item.Status] = (statusMap[item.Status] || 0) + 1;
//         }
//     });

//     const labels: string[] = [];
//     const values: number[] = [];

//     for (const key in statusMap) {
//         labels.push(key);
//         values.push(statusMap[key]);
//     }

//     const chartData = {
//         labels,
//         datasets: [
//             {
//                 data: values,
//                 backgroundColor: ["#0078d4", "#2d7d46", "#a4262c", "#ffb900"]
//             }
//         ]
//     };

//     return <Pie data={chartData} />;
// };

// export default ReportsChart;
import * as React from "react";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { getAllTrainings } from "../../services/TrainingService";

// import { ITraining } from "../../models/ITraining";
// import { SPHttpClient } from "@microsoft/sp-http-base";
import { IHomeDashboardProps } from "../../components/IHomeDashboardProps";

// interface IProps {
//     data: ITraining[];
//     webUrl: string;
//     spHttpClient: SPHttpClient;
// }

const ReportsChart: React.FC<IHomeDashboardProps> = (props) => {

    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllTrainings(props.webUrl, props.spHttpClient)
            .then((res: any) => {
                setData(res.value || res);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error loading trainings", err);
                setLoading(false);
            });
    }, []);


    const statusMap: { [key: string]: number } = {};

    data.forEach(item => {
        statusMap[item.Status] = (statusMap[item.Status] || 0) + 1;
    });

    const labels = Object.keys(statusMap);
    const values = labels.map(l => statusMap[l]);

    const chartData = {
        labels,
        datasets: [
            {
                data: values,
                backgroundColor: ["#0078d4", "#2d7d46", "#ffb900", "#a4262c"]
            }
        ]
    };

    if (loading) return <p>Loading reports...</p>;

    return <Pie data={chartData} />;
};

export default ReportsChart;
