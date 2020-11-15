import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import LandingContainer from "./components/LandingContainer/LandingContainer";
import NotFoundContainer from "./components/NotFoundContainer/NotFoundContainer";
import MovieContainer from "./components/MovieContainer/MovieContainer";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/movie/:id" component={MovieContainer} />
        <Route path="/" exact component={LandingContainer} />
        <Route path="*" component={NotFoundContainer} />
      </Switch>
    </div>
  );
}

export default App;
