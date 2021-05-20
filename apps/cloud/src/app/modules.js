const systemRouteToUrlRoute = (route) => {
  return route.replace('.jsx', '').replace('.tsx', '').replace('/index', '');
};

async function getModules(modulesPath, modulesToIgnore = []) {
  const modules = await Promise.all(
    modulesPath.map(async ({ folder, modulePath, priority = 0 }) => {
      const resolvedModules = await Promise.all(
        folder
          .keys()
          .map((moduleRoute) => moduleRoute.substr(1))
          .filter((moduleRoute) => {
            const [, moduleName] = moduleRoute.split('/');

            return !modulesToIgnore.includes(moduleName);
          })
          .map(async (moduleRoute, i) => {
            const { default: module } = await import(`${modulePath}${moduleRoute}`);
            const parsedModuleRoute = systemRouteToUrlRoute(moduleRoute);

            return { component: module, path: parsedModuleRoute, priority };
          }),
      );
      return resolvedModules;
    }),
  );

  return modules.reduce((acc, ac) => [...acc, ...ac], []);
}

export default getModules;
