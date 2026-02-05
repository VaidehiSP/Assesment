
import * as React from "react";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { getAllTrainings } from "../../services/TrainingService";


import { IHomeDashboardProps } from "../../components/IHomeDashboardProps";



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
