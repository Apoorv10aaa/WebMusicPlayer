
import {Outlet} from 'react-router-dom'
import {Header,Footer} from './components/index';

function App() {

  return (
    <>
    <div className="min-h-screen flex flex-wrap content-between">
      <div className='w-full block'>
        <Header />
        <main>
          Hey : <Outlet />
        </main>
        <Footer />
      </div>
    </div>
    </>
  )
}

export default App
