import { Study } from "@/models/study";
import axios from "axios";
import { API_URL, PATIENT_ID, TOKEN_AUTH } from "../../config";
import { title } from "process";

export const getData = async (): Promise<
  {
    title: string;
    data: {
      name: string;
      value: number;
    }[];
    lines: {
      dataKey: string;
      stroke: string;
    }[];
  }[]
> => {
  try {
    const response = await axios.get<{
      data: Study[];
    }>(`${API_URL}/api/studies/${PATIENT_ID}`, {
      headers: {
        Authorization: `Bearer ${TOKEN_AUTH}`,
      },
    });
    const studies = response.data.data as Study[];

    if (studies.length > 0) {
      const study = (
        await axios.get<{
          data: Study;
        }>(`${API_URL}/api/studies/${PATIENT_ID}/${studies[0].id}`, {
          headers: {
            Authorization: `Bearer ${TOKEN_AUTH}`,
          },
        })
      ).data.data;
      let titles = Object.keys(study.waves[0]).map((title) => {
        return {
          title,
          data: [] as { name: string; value: any }[],
        };
      }) as {
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
      titles.map((title) => {
        for (const i in study.waves) {
          title.data.push({
            name: i.toString(),
            value: (study.waves as any[])[i][title.title],
          });
        }
      });
      titles.shift();
      titles.shift();
      titles.map((title) => {
        title.lines = [];
        title.lines.push({ dataKey: "value", stroke: "#8884d8" });
      });

      return titles;
    } else return chartsData;
  } catch (error) {
    throw error;
  }
};

const chartsData = [
  {
    title: "Ondas Alpha",
    data: [
      { name: "A", value: 10 },
      { name: "B", value: 20 },
      { name: "C", value: 30 },
    ],
    lines: [
      { dataKey: "value", stroke: "#8884d8" },
      // Add more line objects for additional lines in the chart
    ],
  },
  {
    title: "Ondas Beta",
    data: [
      { name: "X", value: 15 },
      { name: "Y", value: 25 },
      { name: "Z", value: 35 },
    ],
    lines: [
      { dataKey: "value", stroke: "#82ca9d" },
      // Add more line objects for additional lines in the chart
    ],
  },
];

export default chartsData;
