import React, {useState, useMemo} from 'react'
import styled from "styled-components";
import bg from './img/bg.png'
import {MainLayout} from './styles/Layouts'
import Orb from './Components/Orb/Orb'
import Navigation from './Components/Navigation/Navigation'
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income'
import Expenses from './Components/Expenses/Expenses';
import ExpenseList from './Components/Expenses/ExpenseList';
import { useGlobalContext } from './context/globalContext';
import Login from './Components/Login/login';
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
function App() {
  const [active, setActive] = useState(1)
  const[data,setData]=useState(false);
  const global = useGlobalContext()
  console.log(global);

  const displayData = () => {
    switch(active){
      case 1:
        return <Dashboard />
      case 3:
        return <Income />
      case 4: 
        return <Expenses />
      case 5:
        return <ExpenseList/>
      default: 
        return <Dashboard />
    }
  }

  const orbMemo = useMemo(() => {
    return <Orb />
  },[])

  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/expense' element={<AppStyled bg={bg} className="App">
      {orbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>
          {displayData()}
        </main>
      </MainLayout>
    </AppStyled>}/>
    </Routes>
    </BrowserRouter>

  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default App;
