import './App.css'
import TaskCard from './components/TaskCard';

function App() {

  return (
    <>
      <TaskCard title="Remove Tailwind" description="Tailwind is not neccesary, it adds complexity." status="done"/>
      <TaskCard title="Start login UI" description="Design login formulary style" status="in-progress"/>
      <TaskCard title="Start register UI" description="Design register formulary style" status="pending"/>
    </>
  );
};

export default App;
