import './ksContextMenu.scss';

import React, { useRef } from 'react';
import { useContextualMenu, useOnClickOutside } from '@kleeen/react/hooks';

import { KUIConnect } from '@kleeen/core-react';
import { useHistory } from 'react-router-dom';

const MENU_ACTIONS = {
  FILTER_IN: 'filterIn',
  FILTER_OUT: 'filterOut',
  NAVIGATION: 'navigation',
};

const KsContextMenu = ({ translate }) => {
  const { contextualToggle, context, setContextualToggle } = useContextualMenu();
  const ref = useRef();

  useOnClickOutside(ref, () => setContextualToggle(false));

  const { position, entityName, menuOptions } = context || { menuOptions: [] };
  const menuActions = {
    profile: {
      id: 'app.contextMenu.profile',
      type: MENU_ACTIONS.NAVIGATION,
      url: (data) => `/profile/${entityName}?${data.key}=${data.id}`,
    },
    'profile-edit': {
      id: 'app.contextMenu.profileEdit',
      type: MENU_ACTIONS.NAVIGATION,
      url: (data) => `/profile/${entityName}/edit?${data.key}=${data.id}`,
    },
    'filter-in': {
      id: 'app.contextMenu.filterIn',
      type: MENU_ACTIONS.FILTER_IN,
      url: (data) => data,
    },
    'filter-out': {
      id: 'app.contextMenu.filterOut',
      type: MENU_ACTIONS.FILTER_OUT,
    },
  };

  const items = menuOptions.map((option) => {
    const action = menuActions[option.name];

    return {
      action: option.name,
      id: action.id,
      type: action.type,
      url: action.url ? action.url(option.data) : undefined,
    };
  });

  const history = useHistory();

  const left = position.x + 'px';
  const top = position.y + 'px';

  const handleAction = (e, actionName, url) => {
    e.preventDefault();
    setContextualToggle(false);

    if (actionName === MENU_ACTIONS.NAVIGATION) {
      history.push(url);
    }

    if (actionName === MENU_ACTIONS.FILTER_IN) {
      const params = new URLSearchParams(history.location.search);

      if (history.location.search.includes(url.key)) {
        params.set(url.key, url.id);
      } else {
        params.append(url.key, url.id);
      }
      history.push(`?${decodeURIComponent(params)}`);
    }
  };

  return (
    contextualToggle && (
      <ul className="context-menu-list background_elevation_2A_static" ref={ref} style={{ left, top }}>
        {items.map((item) => (
          <li
            className="foreground_principal_no_background_clickable"
            key={item.action}
            onClick={(e) => handleAction(e, item.type, item.url)}
          >
            {item.type === MENU_ACTIONS.NAVIGATION ? (
              <a href={item.url}>{translate({ id: item.id })}</a>
            ) : (
              <span>{translate({ id: item.id })}</span>
            )}
          </li>
        ))}
      </ul>
    )
  );
};

export default KUIConnect(({ translate }) => ({ translate }))(KsContextMenu);
