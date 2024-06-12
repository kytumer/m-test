import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskBook from './pages/TaskBook/TaskBook';

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<></>}>
        <Routes>
          <Route path="/" element={<TaskBook />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
