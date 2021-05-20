import { IsOnboardingEnable, OnBoardingTask } from './modules/generated/components';
import React, { useEffect, useState } from 'react';
import { useKleeenActions, useKleeenContext, useSyncUserPreferences } from '@kleeen/react/hooks';

import { Authenticator } from './modules/custom/components';
import Highcharts from 'highcharts';
import { HookableContextMenu } from '@kleeen/react/atomic-elements';
import { KSAuth } from '@kleeen/auth';
import { KUIConnect } from '@kleeen/core-react';
import { KsContextMenu } from '@kleeen/react/components';
import Layout from './layout';
import { BrowserRouter as Router } from 'react-router-dom';
import { fontFamily } from './settings/font-family';
import getModules from './modules';

const IsAuthEnabled = true;

async function setUser(setCurrentUser, currentUser) {
  let currentAuthenticatedUser = {};
  try {
    currentAuthenticatedUser = await KSAuth.currentAuthenticatedUser();
  } catch (err) {
    console.error(err);
  }
  if (currentAuthenticatedUser !== currentUser) {
    setCurrentUser(currentAuthenticatedUser);
  }
}

function PagesManager() {
  const [modules, setModules] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [authState, setAuthState] = useState('');
  const [{ showOnboardingPage }] = useSyncUserPreferences();
  const { currentUser } = useKleeenContext('endUser');
  const { setCurrentUser } = useKleeenActions('endUser');

  initializeHighcharts();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setUser(setCurrentUser, currentUser), [authState]);

  useEffect(() => {
    getModules([
      { modulePath: './modules/generated', folder: require.context('./modules/generated', true, /\.jsx$/) },
      {
        modulePath: './modules/custom',
        folder: require.context('./modules/custom', true, /\.jsx$/),
        priority: 1,
      },
    ])
      .then((modulesLoaded) => {
        setModules(modulesLoaded);
        setIsReady(true);
        setAuthState(KSAuth.getCurrentState());
      })
      .catch((error) => {
        console.warn(error);
        setIsReady(true);
      });
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <Router>
      <Authenticator
        hideDefault={true}
        isEnabled={IsAuthEnabled}
        authState={authState}
        setAuthState={setAuthState}
      >
        <RenderLayout modules={modules} showOnboardingPage={IsOnboardingEnable && showOnboardingPage} />
      </Authenticator>
    </Router>
  );
}

function RenderLayout({ showOnboardingPage, modules }) {
  if (showOnboardingPage) {
    return <OnBoardingTask />;
  }
  return (
    <>
      <KsContextMenu />
      <HookableContextMenu />
      <Layout modules={modules} />
    </>
  );
}

function initializeHighcharts() {
  // Add font to highcharts
  Highcharts.setOptions({
    chart: {
      style: {
        fontFamily,
      },
    },
  });

  // Workaround for https://github.com/highcharts/highcharts/issues/13710
  (function (H) {
    H.seriesTypes.pie.prototype.drawEmpty = function () {
      let centerX,
        centerY,
        start = this.startAngleRad,
        end = this.endAngleRad,
        options = this.options;
      // Draw auxiliary graph if there're no visible points.
      if (this.total === 0) {
        centerX = this.center[0];
        centerY = this.center[1];
        if (!this.graph) {
          this.graph = this.chart.renderer
            .arc(centerX, centerY, this.center[1] / 2, 0, start, end)
            .addClass('highcharts-empty-series')
            .add(this.group);
        }
        this.graph.attr({
          d: H.SVGRenderer.prototype.symbols.arc(centerX, centerY, this.center[2] / 2, 0, {
            start,
            end,
            innerR: this.center[3] / 2,
          }),
        });
        if (!this.chart.styledMode) {
          this.graph.attr({
            'stroke-width': options.borderWidth,
            fill: options.fillColor || 'none',
            stroke: options.color || '#cccccc',
          });
        }
      } else if (this.graph) {
        // Destroy the graph object.
        this.graph = this.graph.destroy();
      }
    };
  })(Highcharts);
}

export default React.memo(
  KUIConnect(({ locale, setLocale }) => ({
    locale,
    setLocale,
  }))(PagesManager),
);
