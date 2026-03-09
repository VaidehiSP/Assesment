

import * as React from "react";
import Reports from "./Reports/Reports";
// import Header from "./Common/Header";
// import "./Hidedesign.css";

// import ReportsChart from "./Reports/ReportsChart";
import '../components/Hidedesign.css';
import Home from "./Home/Home";
import { IHomeDashboardProps } from "./IHomeDashboardProps";




const HomeDashboard: React.FC<IHomeDashboardProps> = (props) => {

  const [activePage, setActivePage] =
    React.useState<"home" | "reports">("home");

  return (
    <>
      {activePage === "home" && (
        <Home onNavigate={() => setActivePage("reports")} />

      )}

      {activePage === "reports" && (
        // <Reports
        //   context={this.context}
        //   // webUrl={props.webUrl}
        //   // spHttpClient={props.spHttpClient}
        //   onBack={() => setActivePage("home")}
        // />
        <Reports context={props.context} />

      )}
    </>
  );
};



// const HomeDashboard: React.FC<IHomeDashboardProps> = (props) => {

//   const [activePage, setActivePage] =
//     React.useState<"home" | "reports">("home");

//   return (
//     <>
//       {/* <Header title="Home Dashboard" /> */}

//       {activePage === "home" && (
//         <Home onNavigate={() => setActivePage("reports")} />
//       )}

//       {activePage === "reports" && (
//         <>
//           <Reports
//             webUrl={props.webUrl}
//             spHttpClient={props.spHttpClient} />

//           {/* <ReportsChart
//             webUrl={props.webUrl}
//             spHttpClient={props.spHttpClient} /> */}
//         </>
//       )}
//     </>
//   );
// };

export default HomeDashboard;
