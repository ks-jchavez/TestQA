import React, { createContext, useContext, useEffect } from 'react';
import { Socket, io } from 'socket.io-client';

import { environment } from '@kleeen/environment';
import { useKleeenActions } from './useKleeenActions';
import { useKleeenContext } from './useKleeenContext';
import { v4 as uuidv4 } from 'uuid';

const WS_BASE = environment.settings.middlewareAPI;

export const WebSocketContext = createContext({});

let socket: Socket;

export function useWebSocket() {
  const webSocketContext = useContext(WebSocketContext);
  return webSocketContext;
}

export const WebSocketProvider = ({ children }) => {
  let ws: { socket: Socket };
  const { currentUser } = useKleeenContext('endUser');

  const { addNotification } = useKleeenActions('ksNotifications');

  useEffect(() => {
    if (!socket) {
      socket = io(WS_BASE);

      socket.on('event://notification', (msg) => {
        addNotification({
          key: uuidv4(),
          notification: {
            message: {
              message: msg?.customMessage,
              variant: msg?.success ? 'success' : 'error',
              actions: msg?.actions,
              title: msg?.customTitle,
              taskName: msg?.taskName,
            },
            options: {
              key: uuidv4(),
              persist: true,
            },
          },
        });
      });

      ws = {
        socket,
      };
    }

    return () => {
      socket.emit('event://user-disconnected', currentUser?.username);
    };
  }, []);

  useEffect(() => {
    if (socket && currentUser?.username) {
      socket.emit('event://user-connected', currentUser?.username);
    }
  }, [socket, currentUser?.username]);

  return <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>;
};
