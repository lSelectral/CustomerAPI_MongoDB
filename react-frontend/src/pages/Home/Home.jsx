import { useContext } from 'react'
import EntryForm from '../../components/EntryForm/EntryForm'
import Navbar from '../../components/Navbar/Navbar'
import Table from '../../components/Table/Table'
import {ThemeContext} from "../../context"
import './Home.scss'

const Home = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  return (
    <div     
    // style={{
    //   backgroundColor: darkMode ? "#222" : "white",
    //   color: darkMode && "white",
    // }}
    className="home">
        <Navbar/>
        <div className="center">
          <Table/>
          <EntryForm/>
        </div>
    </div>
  )
}

export default Home