import { useState } from 'react';
import './App.css'
import TaskCard from './components/TaskCard';

function App() {
  // Dark | Light theme
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <body className={`app-container ${theme}`}>
      <button onClick={toggleTheme} className="theme-toggle-btn">
        Theme
      </button>

      <TaskCard title="Remove Tailwind" description="Tailwind is not neccesary, it adds complexity." status="done" themeMode={theme}/>
      <TaskCard title="Start login UI" description="Design login formulary style" status="in-progress" themeMode={theme}/>
      <TaskCard title="Start register UI" description="Design register formulary style" status="pending" themeMode={theme}/>
    </body>
  );
};

export default App;
