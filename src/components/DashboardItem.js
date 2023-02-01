import { useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ProjectContext } from "../context/ProjectContext";
import { PieChart, Pie, Cell } from "recharts";

export default function DashboardItem({ status }) {
  const { allProjects } = useContext(ProjectContext);
  const countOfAllProjects = allProjects.length;
  let countOfProjectsStatus = 0;
  allProjects.forEach((proj) => {
    if (proj.status === status) countOfProjectsStatus++;
  });
  const data = [
    { value: countOfProjectsStatus },
    { value: countOfAllProjects - countOfProjectsStatus },
  ];

  const COLORS = ["#ffb900", "#6639b7"];

  return (
    <Box
      sx={{
        display: "flex",
        padding: "1rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: "1rem",
        }}
      >
        <Typography variant="h6" noWrap component="div">
          {status + " Projects"}
        </Typography>
        <Typography variant="h6" noWrap component="div">
          % {Math.round((countOfProjectsStatus / countOfAllProjects) * 100)}
        </Typography>
      </Box>
      <Box>
        <PieChart width={200} height={200}>
          <Pie
            data={data}
            cx={100}
            cy={100}
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </Box>
    </Box>
  );
}
