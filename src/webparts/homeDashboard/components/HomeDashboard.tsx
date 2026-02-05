// import * as React from "react";
// import Home from "./Home/Home";
// import Reports from "./Reports/Reports";
// import { SPHttpClient } from "@microsoft/sp-http";

// interface IHomeDashboardInternalProps {
//   webUrl: string;
//   spHttpClient: SPHttpClient;
// }

// const HomeDashboard: React.FC<IHomeDashboardInternalProps> = (props) => {

//   const [activePage, setActivePage] =
//     React.useState<"home" | "reports">("home");

//   return (
//     <>
//       {activePage === "home" && (
//         <Home onNavigate={() => setActivePage("reports")} />
//       )}

//       {activePage === "reports" && (
//         <Reports
//           webUrl={props.webUrl}
//           spHttpClient={props.spHttpClient} description={""} isDarkTheme={false} environmentMessage={""} hasTeamsContext={false} userDisplayName={""} />
//       )}
//     </>
//   );
// };

// export default HomeDashboard;

import * as React from "react";
import Reports from "./Reports/Reports";
// import "./Hidedesign.css";

// import ReportsChart from "./Reports/ReportsChart";
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
        <>
          <Reports
            webUrl={props.webUrl}
            spHttpClient={props.spHttpClient} />

          {/* <ReportsChart
            webUrl={props.webUrl}
            spHttpClient={props.spHttpClient} /> */}
        </>
      )}
    </>
  );
};

export default HomeDashboard;
