import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ProjectContext } from "../context/ProjectContext";
import Alert from "@mui/material/Alert";

const initialProjectValues = {
  id: 0,
  project_name: "",
  start_date: new Date().toISOString().substr(0, 10),
  end_date: new Date().toISOString().substr(0, 10),
  status: "Next",
};

export default function CreateProject() {
  const [open, setOpen] = React.useState(false);
  const [timeError, setTimeError] = React.useState(false);
  const [nameError, setNameError] = React.useState(false);

  const [projectValues, setProjectValues] =
    React.useState(initialProjectValues);
  const { addNewProject, allProjects } = React.useContext(ProjectContext);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => {
    setProjectValues(initialProjectValues);
    setOpen(false);
  };

  const handleChange = (e) => {
    setProjectValues({ ...projectValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    //! Alttaki if bloğunda start_date ent_date ten sonra ise uyarı çıkarıp create yapmıyor. Aynı şekilde start_date ve end_date bugünden öncesiyse uyarı çıkarıp create yapmıyor. start_date ve end_date'i kullanıcı bugün girdiğinde sorun çıkarmaması için bir güne eşit olan milisaniyeyi topladım.
    //! else if bloğundaysa project_name boş bırakıldı ise uyarı çıkarıp create yapmıyor.
    //! tarih ve project_name ile ilgili yapılan giriş hatalarında çıkarın uyarılar farklı olaracağı için bu iki hata için farklı iki state kullandım.
    if (
      new Date(projectValues.start_date).getTime() + 86400000 <
        new Date().getTime() ||
      new Date(projectValues.end_date).getTime() + 86400000 <
        new Date().getTime() ||
      projectValues.start_date > projectValues.end_date
    ) {
      setNameError(false);
      setTimeError(true);
      return;
    } else if (projectValues.project_name === "") {
      setTimeError(false);
      setNameError(true);
      return;
    }
    addNewProject({ ...projectValues, id: allProjects.length + 1 });
    setTimeError(false);
    setNameError(false);
    setProjectValues(initialProjectValues);
    handleClose();
  };
  const arrayForInputMapping = [
    { name: "project_name", label: "Project Name", type: "text" },
    { name: "start_date", label: "Start Date", type: "date" },
    { name: "end_date", label: "End Date", type: "date" },
  ]

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        size="small"
        sx={{ width: "12rem", marginBottom: ".5rem" }}
      >
        Create Project
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ mx: 3, pt: 4 }}>Create New Project</DialogTitle>
        <DialogContent sx={{ mx: 3 }}>
          {timeError && !nameError && (
            <Alert severity="warning" sx={{ mb: 1 }}>
              Project start and end dates cannot be earlier than this day. Also,
              the completion date cannot be earlier than the start date.
            </Alert>
          )}
          {nameError && !timeError && (
            <Alert severity="warning" sx={{ mb: 1 }}>
              Project Name is required
            </Alert>
          )}
          {arrayForInputMapping.map((proj) => (
            <TextField
              key={proj.name}
              autoFocus
              margin="dense"
              id={proj.name}
              name={proj.name}
              label="Project Name"
              type={proj.type}
              fullWidth
              variant="outlined"
              value={projectValues[proj.name]}
              onChange={handleChange}
              sx={{ pb: 2 }}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{ mx: 5, mb: 2 }}
            onClick={() => handleSubmit()}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
