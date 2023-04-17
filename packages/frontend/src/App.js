import React from "react";
import Header from "./components/Header";
import HoldersTable from "./components/HoldersTable";
import Footer from "./components/Footer";
import s from "./app.module.css";

function App() {
  return (
    <div className={s.app}>
      <Header />
      <main className={s.main}>
        <div className={s.mainContent}>
          <HoldersTable />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
