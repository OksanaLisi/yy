import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthPage from "./pages/AuthPage/AuthPage";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import MainPage from "./pages/MainPage/MainPage"; // Імпортуємо MainPage

export const useRoutes = (isLogin) => {
    
    if(isLogin){
        return(
            <Switch>    
                <Route path='/' exact component={WelcomePage} />
                <Route path='/main' exact component={MainPage} /> 
                <Redirect to="/" />
            </Switch>  
        )
    }
    return(
        <Switch>
            <Route path='/login' exact component={AuthPage} />
            <Redirect to="/login" />
        </Switch>
    )
}
