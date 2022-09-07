import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import RecipeList from './components/recipes/RecipeList';
import { getAllRecipes } from './store/recipes';
import { getAllReviews } from './store/reviews';
import SingleRecipe from './components/recipes/SingleRecipe';
import RecipePost from './components/recipes/RecipePost';
import RecipeEdit from './components/recipes/RecipeEdit';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(getAllRecipes());
      await dispatch(getAllReviews())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <h1>My Home Page</h1>
        </Route>
        <Route path='/recipes' exact={true}>
          <RecipeList />
        </Route>
        <Route path='/recipes/:recipeId' exact={true}>
          <SingleRecipe />
        </Route>
        <ProtectedRoute path='/newrecipe' exact={true}>
          <RecipePost />
        </ProtectedRoute>
        <ProtectedRoute path='/recipes/:recipeId/edit' exact={true}>
          <RecipeEdit />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
