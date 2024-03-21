import "./App.css";
import AppHeader from "./Components/AppHeader";
import SideMenu from "./Components/SideMenu";
import PageContent from "./Components/PageContent";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <div style={{ display: "flex", flexDirection: "column", maxHeight: "100vh" }}>
        <div style={{ flex: "1", display: "flex" }}>
          <SideMenu />
          <PageContent />
        </div>
      </div>
    </div>
  );
}

export default App;
