// import * as React from "react";
// import { useEffect, useState } from "react";
// import { getAllTrainings } from "../../services/TrainingService";
// // import { IHomeDashboardProps } from "../../components/IHomeDashboardProps";
// import {
//     DetailsList,
//     DetailsListLayoutMode,
//     IColumn,
//     SelectionMode
// } from "@fluentui/react/lib/DetailsList";
// import { Dropdown, IDropdownOption } from "@fluentui/react/lib/Dropdown";
// import { TextField } from "@fluentui/react/lib/TextField";
// import * as XLSX from "xlsx";
// // import { PrimaryButton } from "@fluentui/react/lib/Button";
// import { Stack } from "@fluentui/react/lib/Stack";
// import { IconButton } from "@fluentui/react/lib/Button";

// import { SPHttpClient } from "@microsoft/sp-http";

// export interface IReportsProps {
//     webUrl: string;
//     spHttpClient: SPHttpClient;
//     onBack: () => void;
// }



// const Reports: React.FC<IReportsProps> = (props) => {

//     const [data, setData] = useState<any[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [columns, setColumns] = useState<IColumn[]>([]);
//     const [filteredData, setFilteredData] = useState<any[]>([]);
//     const [statusFilter, setStatusFilter] = useState<string | undefined>();
//     const [searchText, setSearchText] = useState("");



//     useEffect(() => {
//         const url = "https://ascenworktech.sharepoint.com/sites/Vaidehi/"
//         getAllTrainings(url, props.spHttpClient)

//             .then((res: any) => {
//                 const result = res.value || res;
//                 setData(result);
//                 setFilteredData(result);
//                 setLoading(false);
//             })
//             .catch(err => {
//                 console.error("Error loading trainings", err);
//                 setLoading(false);
//             });
//     }, []);

//     useEffect(() => {

//         const cols: IColumn[] = [
//             {
//                 key: "srno",
//                 name: "Sr No",
//                 minWidth: 50,
//                 maxWidth: 60,
//                 isResizable: false,
//                 onRender: (_item, index) => {
//                     return <span>{index! + 1}</span>;
//                 }
//             },
//             {
//                 key: "course",
//                 name: "Course",
//                 fieldName: "CourseName",
//                 minWidth: 120,
//                 maxWidth: 220,
//                 isResizable: true,
//                 isSorted: false,
//                 // onColumnClick: onClickColumn
//             },
//             {
//                 key: "status",
//                 name: "Status",
//                 fieldName: "Status",
//                 minWidth: 80,
//                 maxWidth: 120
//                 // onColumnClick: onClickColumn
//             },
//             {
//                 key: "start",
//                 name: "Start Date",
//                 fieldName: "StartDate",
//                 minWidth: 100,
//                 onRender: (item: any) => {
//                     if (!item.StartDate) return "-";

//                     const date = new Date(item.StartDate);
//                     const day = ("0" + date.getDate()).slice(-2);
//                     const month = ("0" + (date.getMonth() + 1)).slice(-2);
//                     const year = date.getFullYear();

//                     return `${day}-${month}-${year}`;
//                 }
//             },
//             {
//                 key: "end",
//                 name: "End Date",
//                 fieldName: "EndDate",
//                 minWidth: 100,
//                 onRender: (item: any) => {
//                     if (!item.StartDate) return "-";

//                     const date = new Date(item.StartDate);
//                     const day = ("0" + date.getDate()).slice(-2);
//                     const month = ("0" + (date.getMonth() + 1)).slice(-2);
//                     const year = date.getFullYear();

//                     return `${day}-${month}-${year}`;
//                 }
//             }
//         ];

//         setColumns(cols);

//     }, []);

//     const onSearchChange = (
//         ev?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
//         value?: string
//     ) => {

//         const text = value || "";
//         setSearchText(text);

//         let filtered = data;

//         if (statusFilter) {
//             filtered = filtered.filter(item => item.Status === statusFilter);
//         }

//         if (text) {
//             filtered = filtered.filter(item =>
//                 item.CourseName?.toLowerCase().includes(text.toLowerCase()) ||
//                 item.Status?.toLowerCase().includes(text.toLowerCase())
//             );
//         }

//         setFilteredData(filtered);
//     };

//     const exportToExcel = () => {

//         const exportData = filteredData.map(item => ({
//             Course: item.CourseName,
//             Status: item.Status,
//             StartDate: item.StartDate?.substring(0, 10),
//             EndDate: item.EndDate?.substring(0, 10)
//         }));

//         const worksheet = XLSX.utils.json_to_sheet(exportData);
//         const workbook = XLSX.utils.book_new();

//         XLSX.utils.book_append_sheet(workbook, worksheet, "Training Reports");
//         XLSX.writeFile(workbook, "TrainingReports.xlsx");
//     };

//     // const onClickColumn = (
//     //     ev?: React.MouseEvent<HTMLElement>,
//     //     column?: IColumn
//     // ) => {

//     //     if (!column) return;

//     //     const isSortedDescending = column.isSorted ? !column.isSortedDescending : false;

//     //     const sortedItems = [...filteredData].sort((a, b) => {
//     //         if (a[column.fieldName!] < b[column.fieldName!]) {
//     //             return isSortedDescending ? 1 : -1;
//     //         }
//     //         if (a[column.fieldName!] > b[column.fieldName!]) {
//     //             return isSortedDescending ? -1 : 1;
//     //         }
//     //         return 0;
//     //     });

//     //     const newColumns = columns.map(col => ({
//     //         ...col,
//     //         isSorted: col.key === column.key,
//     //         isSortedDescending: col.key === column.key ? isSortedDescending : false
//     //     }));

//     //     setColumns(newColumns);
//     //     setFilteredData(sortedItems);
//     // };

//     const statusOptions: IDropdownOption[] = [
//         { key: "All", text: "All" },
//         { key: "Completed", text: "Completed" },
//         { key: "Ongoing", text: "Ongoing" },
//         { key: "Upcoming", text: "Upcoming" }
//     ];

//     const onStatusChange = (
//         event: any,
//         option?: IDropdownOption
//     ) => {

//         if (!option || option.key === "All") {
//             setFilteredData(data);
//             setStatusFilter(undefined);
//             return;
//         }

//         setStatusFilter(option.text);
//         setFilteredData(data.filter(item => item.Status === option.text));
//     };



//     if (loading) return <p>Loading reports...</p>;


//     return (
//         <div style={{
//             padding: "12px",
//             maxWidth: "100%",
//             boxSizing: "border-box"
//         }}>
//             <h2>Training Reports</h2>


//             <Stack
//                 horizontal
//                 wrap
//                 horizontalAlign="space-between"
//                 verticalAlign="end"
//                 tokens={{ childrenGap: 12 }}
//                 styles={{ root: { marginBottom: 12 } }}
//             >

//                 {/* LEFT SIDE */}
//                 <Dropdown
//                     label="Filter by Status"
//                     options={statusOptions}
//                     selectedKey={statusFilter || "All"}
//                     styles={{
//                         root: { minWidth: 180, maxWidth: 220 },
//                         dropdown: { width: "100%" }
//                     }}
//                     onChange={onStatusChange}
//                 />

//                 {/* RIGHT SIDE */}
//                 <Stack horizontal wrap tokens={{ childrenGap: 8 }} verticalAlign="end">
//                     <TextField
//                         placeholder="Search by Course or Status"
//                         value={searchText}
//                         onChange={onSearchChange}
//                         // styles={{ root: { width: 260 } }}
//                         styles={{
//                             root: {
//                                 minWidth: 220,
//                                 maxWidth: 280
//                             }
//                         }}
//                     />

//                     <IconButton
//                         iconProps={{ iconName: "ExcelDocument" }}
//                         title="Export to Excel"
//                         ariaLabel="Export to Excel"
//                         onClick={exportToExcel}
//                         styles={{
//                             root: {
//                                 height: 32,
//                                 width: 32,
//                                 background: "#f3f2f1",
//                                 borderRadius: 4
//                             }
//                         }}
//                     />
//                 </Stack>
//             </Stack>

//             <div style={{ overflowX: "auto" }}>
//                 <DetailsList
//                     items={filteredData}
//                     columns={columns}
//                     setKey="set"
//                     layoutMode={DetailsListLayoutMode.fixedColumns}
//                     selectionMode={SelectionMode.none}
//                 />
//             </div>

//         </div>
//     );
// };

// export default Reports;


/* eslint-disable */
import * as React from "react";
import { useEffect, useState } from "react";
import { SPHttpClient } from "@microsoft/sp-http";
import {
    PieChart, Pie, Cell, Tooltip,
    BarChart, Bar, XAxis, YAxis,
    CartesianGrid, LineChart, Line,
    ResponsiveContainer, Legend
} from "recharts";
import styles from "./Reports.module.scss";

interface IReportsProps {
    context: any;
}

// const COLORS = ["#4CAF50", "#FF9800", "#2196F3"];

const Reports: React.FC<IReportsProps> = ({ context }) => {

    const [data, setData] = useState<any[]>([]);
    const [kpi, setKpi] = useState<any>({});

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        // const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('TrainingData')/items?$expand=AssignedUsers`;
        const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('TrainingData')/items?$select=*,Id,Title,StartDate,Status,AssignedUsers/Id,AssignedUsers/Title&$expand=AssignedUsers`;


        const response = await context.spHttpClient.get(
            url,
            SPHttpClient.configurations.v1
        );

        const result = await response.json();
        setData(result.value);
        calculateKPI(result.value);
    };

    const calculateKPI = (items: any[]) => {
        const total = items.length;
        const completed = items.filter(i => i.Status === "Completed").length;
        const ongoing = items.filter(i => i.Status === "Ongoing").length;
        const upcoming = items.filter(i => i.Status === "Upcoming").length;

        setKpi({
            total,
            completed,
            ongoing,
            upcoming,
            completionPercent: total ? ((completed / total) * 100).toFixed(0) : 0
        });
    };

    // 📊 Status Pie Data
    const statusData = [
        { name: "Completed", value: kpi.completed || 0 },
        { name: "Ongoing", value: kpi.ongoing || 0 },
        { name: "Upcoming", value: kpi.upcoming || 0 }
    ];

    // 👥 Trainings Per User
    // const getUserData = () => {
    //     const userMap: any = {};

    //     if (!data || data.length === 0) return;

    //     data.forEach(item => {
    //         if (item.AssignedUsers) {
    //             item.AssignedUsers.forEach((user: any) => {
    //                 userMap[user.Title] = (userMap[user.Title] || 0) + 1;
    //             });
    //         }
    //     });

    //     return Object.keys(userMap).map(name => ({
    //         name,
    //         value: userMap[name]
    //     }));
    // };

    const getUserData = () => {
        if (!data || data.length === 0) return [];

        const userMap: { [key: string]: number } = {};

        data.forEach(item => {
            if (!item.AssignedUsers) return;

            // Multi-person field
            if (Array.isArray(item.AssignedUsers)) {
                item.AssignedUsers.forEach((user: any) => {
                    if (!user?.Title) return;
                    userMap[user.Title] = (userMap[user.Title] || 0) + 1;
                });
            }
            // Single-person field
            else {
                const user = item.AssignedUsers;
                if (!user?.Title) return;
                userMap[user.Title] = (userMap[user.Title] || 0) + 1;
            }
        });

        return Object.keys(userMap).map(name => ({
            name,
            value: userMap[name]
        }));
    };


    // 📈 Monthly Trend
    // const getMonthlyData = () => {
    //     const monthMap: any = {};

    //     // data.forEach(item => {
    //     //     const month = new Date(item.StartDate).toLocaleString("default", { month: "short" });
    //     //     monthMap[month] = (monthMap[month] || 0) + 1;
    //     // });

    //     data.forEach(item => {
    //         if (!item.StartDate) return;

    //         const month = new Date(item.StartDate)
    //             .toLocaleString("default", { month: "short" });

    //         monthMap[month] = (monthMap[month] || 0) + 1;
    //     });


    //     return Object.keys(monthMap).map(month => ({
    //         month,
    //         value: monthMap[month]
    //     }));
    // };

    const getMonthlyData = () => {
        if (!data || data.length === 0) return [];

        const monthMap: { [key: number]: number } = {};

        data.forEach(item => {
            if (!item.StartDate) return;

            const date = new Date(item.StartDate);
            const monthIndex = date.getMonth(); // 0–11

            monthMap[monthIndex] = (monthMap[monthIndex] || 0) + 1;
        });

        // Convert to sorted array
        return Object.keys(monthMap)
            .map(m => Number(m))
            .sort((a, b) => a - b)
            .map(monthIndex => ({
                month: new Date(0, monthIndex).toLocaleString("default", { month: "short" }),
                value: monthMap[monthIndex]
            }));
    };



    return (
        <div className="dashboardContainer">
            <div className={styles.dashboard}>

                {/* 🔷 KPI Section */}
                <div className="kpiWrapper">
                    <div className={styles.kpiContainer}>
                        <div className={styles.card}>Total Trainings: {kpi.total}</div>
                        <div className={styles.card}>Completed: {kpi.completed}</div>
                        <div className={styles.card}>Ongoing: {kpi.ongoing}</div>
                        <div className={styles.card}>Completion %: {kpi.completionPercent}%</div>
                    </div>
                </div>

                {/* 🔷 Charts Section */}
                <div className="chartsWrapper">
                    <div className={styles.chartRow}>

                        {/* 📊 Pie Chart */}
                        <div className={styles.chartBox}>
                            <h3>Status Overview</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                {/* <PieChart>
                            <Pie data={statusData} dataKey="value" outerRadius={100}>
                                {statusData.map((entry, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart> */}
                                <PieChart>
                                    <Pie
                                        data={statusData}
                                        dataKey="value"
                                        nameKey="name"
                                        outerRadius={100}
                                    >
                                        <Cell fill="#0070AD" />   {/* Completed */}
                                        <Cell fill="#00D4CF" />   {/* Ongoing */}
                                        <Cell fill="#214554" />   {/* Upcoming */}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>

                            </ResponsiveContainer>
                        </div>
                    </div>


                    <div className="chartCard">
                        {/* 👥 Bar Chart */}
                        <div className={styles.chartBox}>
                            <h3>Trainings Per Employee</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                {/* <BarChart data={getUserData()}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#1976D2" />
                        </BarChart> */}
                                <BarChart data={getUserData()}>
                                    <CartesianGrid stroke="#F1F6FD" />
                                    {/* <XAxis dataKey="name" stroke="#214554" /> */}
                                    <XAxis
                                        dataKey="name"
                                        stroke="#214554"
                                        angle={-45}
                                        textAnchor="end"
                                        interval={0}
                                        height={80}
                                    />

                                    <YAxis stroke="#214554" />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#00D4CF" />
                                </BarChart>

                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div className="chartCard">
                    {/* 📈 Line Chart */}
                    <div className={styles.chartBox}>
                        <h3>Monthly Training Trend</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            {/* <LineChart data={getMonthlyData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#4CAF50" />
                    </LineChart> */}
                            <LineChart data={getMonthlyData()}>
                                <CartesianGrid stroke="#F1F6FD" />
                                <XAxis dataKey="month" stroke="#214554" />
                                <YAxis stroke="#214554" />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#0070AD"
                                    strokeWidth={3}
                                />
                            </LineChart>

                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
