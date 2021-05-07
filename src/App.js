import React, { Suspense } from 'react'
import Weather from "./Weather/Weather";

function App() {
    return (
      <div>
        <Suspense fallback = {<></>}>
          <Weather />
        </Suspense>
      </div>
    );
}

export default App
