import * as React from "react";
import { PrimaryButton } from "@fluentui/react";

interface IHomeProps {
    onNavigate: (page: "home" | "reports") => void;
}

const Home: React.FC<IHomeProps> = ({ onNavigate }) => {
    return (
        <div>
            <h2>Welcome to Training Dashboard</h2>
            <p>Manage and view training programs across the organization.</p>

            <PrimaryButton
                text="View Reports"
                onClick={() => onNavigate("reports")}
            />
        </div>
    );
};

export default Home;
