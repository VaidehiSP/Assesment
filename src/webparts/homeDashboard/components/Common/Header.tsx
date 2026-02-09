import * as React from "react";
// import { Text } from "@fluentui/react";

interface IHeaderProps {
    title: string;
}

const Header: React.FC<IHeaderProps> = ({ title }) => {
    return (
        <div style={{ marginBottom: 20 }}>
            {/* <Text variant="xLarge">{title}</Text> */}
            <header className="customHeader">
                {/* <img src="/siteassets/logo.png" /> */}
                <nav>
                    <a href="/HomeDashboard">Home</a>

                    {/* <a href="/Reports">Reports</a> */}

                    <a href="/Adminage">Admin</a>
                </nav>
            </header>

        </div>

    );
};

export default Header;
