import * as React from "react";
import { Text } from "@fluentui/react";

interface IHeaderProps {
    title: string;
}

const Header: React.FC<IHeaderProps> = ({ title }) => {
    return (
        <div style={{ marginBottom: 20 }}>
            <Text variant="xLarge">{title}</Text>
        </div>
    );
};

export default Header;
