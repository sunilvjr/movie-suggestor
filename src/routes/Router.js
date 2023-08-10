import { BrowserRouter, Switch, Route } from "react-router-dom";
import Index from "../pages/Index";
import ViewMovie from "../pages/ViewMovie";
import AddMovie from "../pages/AddMovie";
import Login from "../pages/Login";
import Profile from "../pages/Profile";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Index} exact></Route>
        <Route path="/view_movie/:id" component={ViewMovie} exact></Route>
        <Route path="/AddMovie" component={AddMovie} exact></Route>
        <Route path="/Login" component={Login} exact></Route>
        <Route path="/Profile" component={Profile} exact></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
