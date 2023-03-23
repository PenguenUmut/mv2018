import React from "react";
import "./App.css";

import { cities } from "./data/cities";
import { CityCard } from "./component/CityCard/CityCard";
import { /* parliamentarianCount, */ parliamentarianCountV2 } from "./utils";

function App() {
  (window as any).cities = cities;
  // (window as any).parliamentarianCount = parliamentarianCount;
  (window as any).parliamentarianCountV2 = parliamentarianCountV2;

  return (
    <div>
      <header>
        {cities.map((city, i) => (
          <CityCard key={"cc" + i} city={city} />
        ))}
      </header>
    </div>
  );
}

export default App;
