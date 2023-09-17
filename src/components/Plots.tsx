"use client"
import React, { PureComponent } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import chartsData from "@/utils/chartsData";

export default class Plots extends PureComponent {

    render() {
        return (
            <div>
                {chartsData.map((chart, index) => (
                    <div key={index}>
                        <h2>{chart.title}</h2>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart
                                data={chart.data}
                                margin={{
                                    top:5, 
                                    right:30,
                                    left:20,
                                    bottom:5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                {chart.lines.map((line, lineIndex) => (
                                    
                                <Line
                                    key={lineIndex}
                                    type="monotone"
                                    dataKey={line.dataKey}
                                    stroke={line.stroke}
                                    activeDot={{ r: 8 }}
                                />
                                ))}
                            </LineChart>
                        </ResponsiveContainer>
                        
                    </div>
                ))}
            </div>
        );
    }
}