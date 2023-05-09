import './App.css';
import Search from "./Components/Search";
import WeatherDisplay from "./Components/WeatherDisplay";

const handleOnSearchChange = (searchData) => {
    console.log(searchData)
}

function App() {
    return (
        <div className="App">
            <div className="Search">
                <Search onSearchChange={handleOnSearchChange}/>
            </div>
            <div className="WeatherDisplay">
                <WeatherDisplay/>
            </div>
        </div>
    );
}

export default App;
