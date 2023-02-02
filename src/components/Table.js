import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ProjectContext } from "../context/ProjectContext";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const columnNames = ["Id", "Project Name", "Start Date", "End Date", "Status"];

export default function CustomizedTables() {
  const { allProjects, whichScreenIsShowing } =
    React.useContext(ProjectContext);
  const [projectsToDislay, setProjectsToDislay] = React.useState(allProjects);


  //! Aşağıda whichScreenIsShowing state ine göre hangi tablonun display yapılacağını belirliyor. 
  React.useEffect(() => {
    if (whichScreenIsShowing === "All") {
      setProjectsToDislay(allProjects);
    } else {
      const newArr = allProjects.filter(
        (proj) => proj.status === whichScreenIsShowing
      );
      setProjectsToDislay(newArr);
    }
  }, [allProjects, whichScreenIsShowing]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {columnNames.map((colName) => (
              <StyledTableCell
                key={colName}
                sx={{ backgroundColor: "gray", color: "white" }}
              >
                {colName}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {projectsToDislay.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell>{row.id}</StyledTableCell>
              <StyledTableCell>{row.project_name}</StyledTableCell>
              <StyledTableCell>
                {new Date(row.start_date).toLocaleString().slice(0, 10)}
              </StyledTableCell>
              <StyledTableCell>
                {new Date(row.end_date).toLocaleString().slice(0, 10)}
              </StyledTableCell>
              <StyledTableCell>
                {row.status === "Next"
                  ? "Not Started"
                  : row.status === "Ongoing"
                  ? "In Progres"
                  : "Completed"}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
