import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaskCard from './components/FakeTaskCard';

function App() {

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      
      <hr></hr>
      <TaskCard
        title="Start login UI"
        description="Design login formulary style"
        status="in-progress"
      />
      <hr></hr>
      <TaskCard
        title="Start register UI"
        description="Design register formulary style"
        status="done"
      />
      <hr></hr>
    </>
  )
}

export default App
