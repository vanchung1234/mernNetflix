import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './component/layouts/Landing';
import Auth from './views/Auth';
import AuthContextProvider from './contexts/AuthContext';
import Dashboard from './views/Dashboard';
import ProtectedRoute from './component/routing/ProtectedRoute';
import Watch from './views/Watch';
import Setting from './views/Setting';
function App() {
  return (
		<AuthContextProvider>
				<BrowserRouter>
					<Routes>
						<Route  path='/' element={<Landing />} />
						<Route		
							path='/login'
							element={ <Auth authRoute='login' />}
						/>
						<Route						
							path='/register'
							element={ <Auth  authRoute='register' />}
						/>
          <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
         <Route
          path="/setting"
          element={
            <ProtectedRoute>
              <Setting />
            </ProtectedRoute>
          }
        />
	<>
		  <Route
          path="/movies"
          element={
            <ProtectedRoute>
              <Dashboard type="movie" />
            </ProtectedRoute>
          }
        />
		 <Route
          path="/watch"
          element={       
              <Watch />
          }
        />
	</>
					</Routes>
				</BrowserRouter>
		</AuthContextProvider>
	)
}

export default App;
