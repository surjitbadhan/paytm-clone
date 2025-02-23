import Dashboard from "./pages/Dashboard"
import {Signup} from "./pages/Signup"
import {Signin} from "./pages/Signin"
import {SendMoney} from "./pages/SendMoney"
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import { AppBar } from "./components/AppBar"
function App() {

  return (
    <>
      <BrowserRouter>
      {/* <AppBar/> */}
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/sendmoney" element={<SendMoney />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
