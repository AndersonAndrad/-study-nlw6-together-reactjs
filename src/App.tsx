// dependencies
import { BrowserRouter, Route } from 'react-router-dom'

// pages
import { Home } from './pages/Home.page';
import { NewRoom } from './pages/NewRoom.page'

// styles
import './styles/global.scss'

// context
import { AuthContextProvider } from './contexts/AuthContext'


function App() {
  

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route  path='/' exact component={Home}/>
        <Route  path='/rooms/new' component={NewRoom}/> 
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
