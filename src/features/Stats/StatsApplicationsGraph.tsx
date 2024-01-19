import * as React from 'react';
import { IStatsApplications } from '../../config';

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';


interface IStatsApplicationsGraph {
    applications: Array<IStatsApplications>;
}

const StatsApplicationsGraph: React.FC<IStatsApplicationsGraph> = (props) => {
    const applications = props.applications;
    applications.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));

    // cannot use ResponsiveContainer since parent has no width and height
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart
                data={applications}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="applications"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}

export { StatsApplicationsGraph };
