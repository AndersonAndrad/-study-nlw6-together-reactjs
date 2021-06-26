// dependencies
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// pages
import { Home } from './pages/Home.page'
import { NewRoom } from './pages/NewRoom.page'
import { Room } from './pages/Room.page'
import { AdminRoom } from './pages/AdminRoom.page'

// styles
import './styles/global.scss'

// context
import { AuthContextProvider } from './contexts/AuthContext'


function App() {
  

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route  path='/' exact component={Home}/>
          <Route  path='/rooms/new' exact component={NewRoom}/> 
          <Route  path='/rooms/:id' component={Room}/> 
          <Route  path='/admin/rooms/:id' component={AdminRoom}/> 
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
