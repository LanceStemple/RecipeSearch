import "./App.css";

import Header from "../../components/Header/Header.js";
import InstructionsBox from "../../components/InstructionsBox/InstructionsBox.js";
import SearchBox from "../../components/SearchBox/SearchBox.js";
import { useUser } from "../../contexts/UserContext";

function App() {
  // eslint-disable-next-line
  const { user, setUser } = useUser();

  return (
    <div>
      <Header activeNavItem="search" headerText="Search For Recipes" />
      <div className="d-flex justify-content-between mt-5">
        <InstructionsBox
          headerText="Search For Your Perfect Recipe!"
          left
        ></InstructionsBox>
        <SearchBox headerText="Specify Your Recipe"></SearchBox>
      </div>
    </div>
  );
}

export default App;
