import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { uuid } from '@kleeen/core-react';
import { withDylo } from '../dylo/dylo-container';

const byPriority = (a, b) => {
  if (a.priority > b.priority) return -1;
  if (a.priority < b.priority) return 1;

  return 0;
};

const getModulesByIntersections = (modules) => {
  const modulesWithIntersectionsByPriority = [];
  const modulesAdded = [];
  const modulesWithoutIntersections = modules.filter((sourceModule) => {
    const modulesWithSamePath = modules.filter((targetModule) => sourceModule.path === targetModule.name);

    const isAModuleWithInterception = modulesWithSamePath.length > 1;

    if (isAModuleWithInterception && !modulesAdded.includes(path)) {
      const [mostPriorityModule] = modulesWithSamePath.sort(byPriority);
      modulesWithIntersectionsByPriority.push(mostPriorityModule);
      modulesAdded.push(path);
    }

    return !isAModuleWithInterception;
  });

  return { modulesWithIntersectionsByPriority, modulesWithoutIntersections };
};

function injectRoutes(dyloApi, modulesToRoute, defaultHomePage) {
  const routes = [];

  routes.push({
    route: <Route exact path="/" render={() => <Redirect to={defaultHomePage} />} />,
    props: {
      kuiid: uuid(),
    },
  });

  modulesToRoute
    .filter(
      (props) =>
        props.component && (typeof props.component === 'function' || Object.keys(props.component).length > 0),
    )
    .forEach((props) => {
      routes.push({
        route: <Route {...props} />,
        props: {
          kuiid: uuid(),
        },
      });
    });

  dyloApi.addChildren(routes);
}

async function manageRoutesBasedOnFolderStructure(modules) {
  const { modulesWithIntersectionsByPriority, modulesWithoutIntersections } = getModulesByIntersections(
    modules,
  );
  const modulesToRoute = [...modulesWithoutIntersections, ...modulesWithIntersectionsByPriority];
  return modulesToRoute;
}

// require.context must be literal can't pass as a variable https://github.com/webpack/webpack/issues/9300
async function manageRoutes(modules, dyloApi, routing = [], defaultHomePage = '/') {
  const modulesToRoute = await manageRoutesBasedOnFolderStructure(modules);
  const routesToInject = [...modulesToRoute, ...routing];
  injectRoutes(dyloApi, routesToInject, defaultHomePage);
}

const useKleeenRouting = (modules, routing, defaultHomePage) => {
  const dyloApiRef = React.useRef();
  const [isReady, setIsReady] = React.useState(false);
  const SwitchWithDylo = withDylo(Switch);
  const attachRoutes = (dyloApi) => {
    dyloApiRef.current = dyloApi;
    setIsReady(true);
  };

  React.useEffect(() => {
    if (isReady) {
      manageRoutes(modules, dyloApiRef.current, routing, defaultHomePage);
    }
  }, [isReady, modules, routing]);

  return () => (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <SwitchWithDylo onDyloApiReady={attachRoutes} />
      </Suspense>
    </>
  );
};

export default useKleeenRouting;
