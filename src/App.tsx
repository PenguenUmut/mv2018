import React from "react";
import "./App.css";

import { cities0 } from "./data/cities0";
import { cities1 } from "./data/cities1";
import { cities2 } from "./data/cities2";
import { CityCard } from "./component/CityCard/CityCard";
import { /* parliamentarianCount, */ parliamentarianCountV2 } from "./utils";

function App() {
  (window as any).cities0 = cities0;
  (window as any).cities1 = cities1;
  (window as any).cities2 = cities2;

  // (window as any).parliamentarianCount = parliamentarianCount;
  (window as any).parliamentarianCountV2 = parliamentarianCountV2;

  return (
    <div>
      <header>
        {cities2.map((city, i) => (
          <CityCard key={"cc" + i} city={city} />
        ))}
      </header>
    </div>
  );
}

export default App;
