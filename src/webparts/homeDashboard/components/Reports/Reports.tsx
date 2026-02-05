import * as React from "react";
import { useEffect, useState } from "react";
import { getAllTrainings } from "../../services/TrainingService";
import { IHomeDashboardProps } from "../../components/IHomeDashboardProps";
import {
    DetailsList,
    DetailsListLayoutMode,
    IColumn,
    SelectionMode
} from "@fluentui/react/lib/DetailsList";
import { Dropdown, IDropdownOption } from "@fluentui/react/lib/Dropdown";
import { TextField } from "@fluentui/react/lib/TextField";
import * as XLSX from "xlsx";
// import { PrimaryButton } from "@fluentui/react/lib/Button";
import { Stack } from "@fluentui/react/lib/Stack";
import { IconButton } from "@fluentui/react/lib/Button";




const Reports: React.FC<IHomeDashboardProps> = (props) => {

    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [columns, setColumns] = useState<IColumn[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [statusFilter, setStatusFilter] = useState<string | undefined>();
    const [searchText, setSearchText] = useState("");



    useEffect(() => {
        getAllTrainings(props.webUrl, props.spHttpClient)

            .then((res: any) => {
                const result = res.value || res;
                setData(result);
                setFilteredData(result);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error loading trainings", err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {

        const cols: IColumn[] = [
            {
                key: "srno",
                name: "Sr No",
                minWidth: 50,
                maxWidth: 60,
                isResizable: false,
                onRender: (_item, index) => {
                    return <span>{index! + 1}</span>;
                }
            },
            {
                key: "course",
                name: "Course",
                fieldName: "CourseName",
                minWidth: 120,
                maxWidth: 220,
                isResizable: true,
                isSorted: false,
                // onColumnClick: onClickColumn
            },
            {
                key: "status",
                name: "Status",
                fieldName: "Status",
                minWidth: 80,
                maxWidth: 120
                // onColumnClick: onClickColumn
            },
            {
                key: "start",
                name: "Start Date",
                fieldName: "StartDate",
                minWidth: 100,
                onRender: (item: any) => {
                    if (!item.StartDate) return "-";

                    const date = new Date(item.StartDate);
                    const day = ("0" + date.getDate()).slice(-2);
                    const month = ("0" + (date.getMonth() + 1)).slice(-2);
                    const year = date.getFullYear();

                    return `${day}-${month}-${year}`;
                }
            },
            {
                key: "end",
                name: "End Date",
                fieldName: "EndDate",
                minWidth: 100,
                onRender: (item: any) => {
                    if (!item.StartDate) return "-";

                    const date = new Date(item.StartDate);
                    const day = ("0" + date.getDate()).slice(-2);
                    const month = ("0" + (date.getMonth() + 1)).slice(-2);
                    const year = date.getFullYear();

                    return `${day}-${month}-${year}`;
                }
            }
        ];

        setColumns(cols);

    }, []);

    const onSearchChange = (
        ev?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
        value?: string
    ) => {

        const text = value || "";
        setSearchText(text);

        let filtered = data;

        if (statusFilter) {
            filtered = filtered.filter(item => item.Status === statusFilter);
        }

        if (text) {
            filtered = filtered.filter(item =>
                item.CourseName?.toLowerCase().includes(text.toLowerCase()) ||
                item.Status?.toLowerCase().includes(text.toLowerCase())
            );
        }

        setFilteredData(filtered);
    };

    const exportToExcel = () => {

        const exportData = filteredData.map(item => ({
            Course: item.CourseName,
            Status: item.Status,
            StartDate: item.StartDate?.substring(0, 10),
            EndDate: item.EndDate?.substring(0, 10)
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Training Reports");
        XLSX.writeFile(workbook, "TrainingReports.xlsx");
    };

    // const onClickColumn = (
    //     ev?: React.MouseEvent<HTMLElement>,
    //     column?: IColumn
    // ) => {

    //     if (!column) return;

    //     const isSortedDescending = column.isSorted ? !column.isSortedDescending : false;

    //     const sortedItems = [...filteredData].sort((a, b) => {
    //         if (a[column.fieldName!] < b[column.fieldName!]) {
    //             return isSortedDescending ? 1 : -1;
    //         }
    //         if (a[column.fieldName!] > b[column.fieldName!]) {
    //             return isSortedDescending ? -1 : 1;
    //         }
    //         return 0;
    //     });

    //     const newColumns = columns.map(col => ({
    //         ...col,
    //         isSorted: col.key === column.key,
    //         isSortedDescending: col.key === column.key ? isSortedDescending : false
    //     }));

    //     setColumns(newColumns);
    //     setFilteredData(sortedItems);
    // };

    const statusOptions: IDropdownOption[] = [
        { key: "All", text: "All" },
        { key: "Completed", text: "Completed" },
        { key: "Ongoing", text: "Ongoing" },
        { key: "Upcoming", text: "Upcoming" }
    ];

    const onStatusChange = (
        event: any,
        option?: IDropdownOption
    ) => {

        if (!option || option.key === "All") {
            setFilteredData(data);
            setStatusFilter(undefined);
            return;
        }

        setStatusFilter(option.text);
        setFilteredData(data.filter(item => item.Status === option.text));
    };



    if (loading) return <p>Loading reports...</p>;


    return (
        <div style={{
            padding: "12px",
            maxWidth: "100%",
            boxSizing: "border-box"
        }}>
            <h2>Training Reports</h2>


            <Stack
                horizontal
                wrap
                horizontalAlign="space-between"
                verticalAlign="end"
                tokens={{ childrenGap: 12 }}
                styles={{ root: { marginBottom: 12 } }}
            >

                {/* LEFT SIDE */}
                <Dropdown
                    label="Filter by Status"
                    options={statusOptions}
                    selectedKey={statusFilter || "All"}
                    styles={{
                        root: { minWidth: 180, maxWidth: 220 },
                        dropdown: { width: "100%" }
                    }}
                    onChange={onStatusChange}
                />

                {/* RIGHT SIDE */}
                <Stack horizontal wrap tokens={{ childrenGap: 8 }} verticalAlign="end">
                    <TextField
                        placeholder="Search by Course or Status"
                        value={searchText}
                        onChange={onSearchChange}
                        // styles={{ root: { width: 260 } }}
                        styles={{
                            root: {
                                minWidth: 220,
                                maxWidth: 280
                            }
                        }}
                    />

                    <IconButton
                        iconProps={{ iconName: "ExcelDocument" }}
                        title="Export to Excel"
                        ariaLabel="Export to Excel"
                        onClick={exportToExcel}
                        styles={{
                            root: {
                                height: 32,
                                width: 32,
                                background: "#f3f2f1",
                                borderRadius: 4
                            }
                        }}
                    />
                </Stack>
            </Stack>

            <div style={{ overflowX: "auto" }}>
                <DetailsList
                    items={filteredData}
                    columns={columns}
                    setKey="set"
                    layoutMode={DetailsListLayoutMode.fixedColumns}
                    selectionMode={SelectionMode.none}
                />
            </div>

        </div>
    );
};

export default Reports;
