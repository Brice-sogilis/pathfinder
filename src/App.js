//import logo from './logo.svg';
import './App.css';
import {PathFinder} from './PathFinder'
const defaultPathFinderWidth = 25;
const defaultPathFinderHeight = 10;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> PathFinder </h1>
      </header>
      <PathFinder height={defaultPathFinderHeight} width={defaultPathFinderWidth}/>
    </div>
  );
}

export {App, defaultPathFinderWidth, defaultPathFinderHeight};
