import NotFound from 'components/NotFound';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import AddEditPage from './pages/AddEdit';
import MainPage from './pages/MainPage';

PhotoFeature.propTypes = {};

function PhotoFeature(props) {
  const match = useRouteMatch();
  console.log({ match });
  return (
    <div>
      <Switch>
        <Route exact path={match.url} component={MainPage} />

        <Route path={`${match.url}/add`} component={AddEditPage} />

        <Route path={`${match.url}/:photoId`} component={AddEditPage} />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default PhotoFeature;
