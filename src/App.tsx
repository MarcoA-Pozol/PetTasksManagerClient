import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaskCard from './components/FakeTaskCard';

function App() {

  return (
    <>
      <h1 className="bg-sky-500 text-white text-3xl font-bold underline">
        Hello world!
      </h1>
      <div className="bg-blue-500 text-white p-4">
        Tailwind Debug: Should be Blue!
      </div>

      <div className="max-w-sm mx-auto bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-3xl shadow-lg overflow-hidden p-6 hover:scale-105 transition-transform duration-300">
        <h2 className="text-2xl font-bold mb-2">Stay Productive 🚀</h2>
        <p className="text-sm opacity-90">
          Manage your tasks seamlessly and boost efficiency with our intuitive to-do app.
        </p>

        <div className="flex items-center gap-4 mt-4">
          <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-200 transition-all duration-300">
            Get Started
          </button>

          <span className="bg-white text-indigo-600 px-3 py-1 rounded-full text-xs font-bold">
            New Features!
          </span>
        </div>
      </div>

      <div className="bg-blue-500 text-white p-4">
        Tailwind is finally working! 🚀
      </div>


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
