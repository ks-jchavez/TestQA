import { NavPosition } from '@kleeen/types';
import { NavigationTask } from './modules/generated/components';
import React from 'react';
import classnames from 'classnames';
import settings from './settings/app.json';
import { useKleeenRouting } from '@kleeen/react/hooks';

const Layout = ({ modules }) => {
  const KsRouter = useKleeenRouting(modules, [], settings.defaultHomePage);
  const isNavTop = settings.layout.position === NavPosition.top;

  const Content = () => (
    <main className={classnames('layout', { [NavPosition.top]: isNavTop, [NavPosition.left]: !isNavTop })}>
      <KsRouter />
    </main>
  );

  if (!isNavTop) {
    return (
      <div className="container-nav-left">
        <NavigationTask />
        <Content />
      </div>
    );
  }
  return (
    <>
      <NavigationTask />
      <Content />
    </>
  );
};

export default React.memo(Layout);
