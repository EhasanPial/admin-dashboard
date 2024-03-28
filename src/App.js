import "./App.css";
import AppHeader from "./Components/AppHeader";
import SideMenu from "./Components/SideMenu";
import PageContent from "./Components/PageContent";
// import { BasicTable } from "./Components/ReactTable/BasicTable";
import { SortingTable } from "./Components/ReactTable/SortingTable";
import { FilteringTable } from "./Components/ReactTable/FilteringTable";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <div style={{ display: "flex", flexDirection: "column", maxHeight: "100vh" }}>
        <div style={{ flex: "1", display: "flex" }}>
          <SideMenu />
          {/* <PageContent /> */}
          <FilteringTable/>
        </div>
      </div>
    </div>
  );
}

export default App;
