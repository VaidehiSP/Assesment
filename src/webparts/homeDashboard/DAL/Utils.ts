// /* eslint-disable */
// export class Utils {
//   /**
//    * Converts a Date object or string to the specified format (YYYY-MM-DD, DD/MM/YYYY, etc.).
//    * @param date - The date to format (Date object or string).
//    * @param format - The desired format (default: 'YYYY-MM-DD').
//    * @returns Formatted date string.
//    */
//   static convertDateToFormat(date: Date | string, format: string = 'YYYY-MM-DD'): string {
//     if (!date) return "";

//     const d = new Date(date);

//     const monthNamesShort = [
//       "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
//     ];

//     const map: { [key: string]: string; } = {
//       DD: pad2(d.getDate()),
//       MM: pad2(d.getMonth() + 1),
//       MMM: monthNamesShort[d.getMonth()],
//       YYYY: d.getFullYear().toString(),
//       hh: pad2(d.getHours() % 12 || 12),
//       mm: pad2(d.getMinutes()),
//       A: d.getHours() >= 12 ? 'PM' : 'AM'
//     };

//     // IMPORTANT: MMM must come before MM in regex
//     return format.replace(/MMM|DD|MM|YYYY|hh|mm|A/g, match => map[match]);
//   }




//   static isValidDate(dateStr: string): boolean {
//     if (typeof dateStr !== 'string' || !isNaN(Number(dateStr))) {
//       return false;
//     }
//     const date = new Date(dateStr);
//     return !isNaN(date.getTime());
//   }

//   static getNestedValue(obj: any, path: string) {
//     return path.split(".").reduce((o, k) => (o ? o[k] : ""), obj);
//   }

//   static getStatusColor = (status: string): "success" | "danger" | "brand" | "warning" | "important" | "informative" | "severe" | "subtle" | undefined => {
//     switch (status) {
//       case 'approved': return "success";
//       case 'rejected': return "danger";
//       case 'pending': return "brand";
//       case 'more_info': return "warning";
//       default: return undefined;
//     }
//   };

//   static getTimestamp = (): string => {
//     const d = new Date();
//     return (
//       d.getFullYear().toString() +
//       (d.getMonth() + 1).toString().padStart(2, "0") +
//       d.getDate().toString().padStart(2, "0") +
//       d.getHours().toString().padStart(2, "0") +
//       d.getMinutes().toString().padStart(2, "0") +
//       d.getSeconds().toString().padStart(2, "0")
//     );
//   };


//   static generateColumns(data: any): any[] {
//     const column = data.map((col: any) => {
//       return {
//         headerName: col.DisplayName,
//         field: col.InternalName,
//         flex: 1,
//         cellRenderer: Utils.getCellRenderer(col)
//       };
//     });
//     return column;
//   }

//   static getCellRenderer(col: any) {
//     switch (col.ColumnType) {
//       case "Lookup":
//         return (params: any) => {
//           const value = params.data[col.InternalName];
//           return value ? (typeof value === 'string' ? value : value[col.LookupField]) : '';
//         };
//       case "Date and Time":
//         return (params: any) => Utils.convertDateToFormat(params.data[col.InternalName], DateFormat.DDMMYYYY);
//       case "Person or Group":
//         return (params: any) => {
//           const value = params.data[col.InternalName];
//           return value ? (typeof value === 'string' ? value : value.Title) : '';
//         };
//       default:
//         return (params: any) => params.data[col.InternalName];
//     }
//   }


//   static formatFileSize = (bytes = 0) => {
//     if (bytes < 1024) return `${bytes} B`;
//     if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(2)} KB`;
//     if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(2)} MB`;
//     return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
//   };

//   static formatDate(dateString: string): { day: string; month: string } {
//     const date = new Date(dateString);
//     return {
//       day: date.getDate().toString(),
//       month: date.toLocaleString("en-US", { month: "short" }).toUpperCase(),
//     };
//   }

//   static subtract(date: Date | string, value: number, unit: 'd' | 'm' | 'y'): string {
//     const d = new Date(date);
//     switch (unit) {
//       case 'd':
//         d.setDate(d.getDate() - value);
//         break;
//       case 'm':
//         d.setMonth(d.getMonth() - value);
//         break;
//       case 'y':
//         d.setFullYear(d.getFullYear() - value);
//         break;
//       default:
//         throw new Error('Invalid unit. Use d | m | y');
//     }

//     return this.convertDateToFormat(d, DateFormat.MMDDYYYY);
//   }

//   static add(
//     date: Date | string,
//     value: number,
//     unit: 'd' | 'm' | 'y'
//   ): string {
//     const d = new Date(date);

//     switch (unit) {
//       case 'd':
//         d.setDate(d.getDate() + value);
//         break;

//       case 'm':
//         d.setMonth(d.getMonth() + value);
//         break;

//       case 'y':
//         d.setFullYear(d.getFullYear() + value);
//         break;

//       default:
//         throw new Error('Invalid unit. Use d | m | y');
//     }

//     return this.convertDateToFormat(d, DateFormat.MMDDYYYY);
//   }



// }



// export enum DateFormat {
//   FullDate = "DD-MM-YYYY hh:mm A",
//   FullDateYYYYMMDD = "YYYY-MM-DD hh:mm",
//   DDMMYYYY = "DD/MM/YYYY",
//   MMDDYYYY = "MM/DD/YYYY",
//   YYYYMMDD = "YYYY/MM/DD",
//   MMMDDYYYY = "MMM DD, YYYY hh:mm A"
// }

// export const pad2 = (value: number | string): string => {
//   const str = String(value);
//   return str.length === 1 ? "0" + str : str;
// };

// export const getPlainText = (html: string): string => {
//   const temp = document.createElement("div");
//   temp.innerHTML = html;
//   return temp.textContent || temp.innerText || "";
// };