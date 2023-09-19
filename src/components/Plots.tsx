"use client";
import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getData } from "@/utils/chartsData";

interface PlotsState {
  chartsData: {
    title: string;
    data: {
      name: string;
      value: number;
    }[];
    lines: {
      dataKey: string;
      stroke: string;
    }[];
  }[];
  loading: boolean;
}

export default class Plots extends PureComponent<{}, PlotsState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      chartsData: [],
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      const data = await getData();
      this.setState({ chartsData: data, loading: false });
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ loading: false });
    }
  }

  render() {
    const { chartsData, loading } = this.state;

    if (loading) {
      return <div>Loading data...</div>;
    }

    return (
      <div>
        {chartsData.map((chart, index) => (
          <div key={index}>
            <h2>{chart.title}</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={chart.data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
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
