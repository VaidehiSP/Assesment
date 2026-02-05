import * as React from "react";
import { Text } from "@fluentui/react";

const NoData: React.FC = () => {
    return (
        <div style={{ padding: 20, textAlign: "center" }}>
            <Text variant="mediumPlus">No data available</Text>
        </div>
    );
};

export default NoData;
