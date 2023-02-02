import { useState, createContext} from "react";
import data from "../assets/data.json";

export const ProjectContext = createContext();

export const ProjectProvider = (props) => {

  const [allProjects, setAllProjects] = useState(data.projects);
  const [whichScreenIsShowing, setWhichScreenIsShowing] = useState("Dashboard");

  const addNewProject = (proj) => {
    setAllProjects([...allProjects, proj]);
  };

  //! Case de istenmediği için alttaki iki func u kullanmadım. 
  const deleteProject = (projId) => {
    const projArr = allProjects.filter((item) => item.id !== projId);
    setAllProjects(projArr);
  };

  const updateProject = (proj) => {
    allProjects.forEach((item) => {
      if (item.id === proj.id) item = { ...proj };
    });
  };

  // const completedProjects = allProjects.filter((item)=>item.status === 'completed')
  // const inrogressProjects = allProjects.filter((item)=>item.status === 'inprogress')
  // const notstartedProjects = allProjects.filter((item)=>item.status === 'notstarted')

  return (
    <ProjectContext.Provider
      value={{
        allProjects,
        whichScreenIsShowing,
        setWhichScreenIsShowing,
        addNewProject,
        deleteProject,
        updateProject,
      }}
      {...props}
    />
  );
};
