import React, { ReactElement } from 'react';

import { DisplayMediaType } from '@kleeen/types';
import { KsDisplayMediaProps } from './KsDisplayMedia.model';
import UserAvatar from 'react-user-avatar';
import { useStyles } from './KsDisplayMedia.styles';

export const KsDisplayMedia = ({ value, type, size, ...props }: KsDisplayMediaProps) => {
  const classes = useStyles();
  const classType = `${props.className} ${classes[type]} ${type}`;
  const splitedArray = value ? value.split(' ') : [' '];
  const finalValue =
    splitedArray.length === 1 ? splitedArray[0].substring(0, 2) : `${splitedArray[0]} ${splitedArray[1]}`;
  switch (type) {
    case DisplayMediaType.Text:
      return (
        <UserAvatar
          size={size}
          name={finalValue.toUpperCase()}
          className={classType}
          color={'var(--secondary-color)'}
        />
      );
    case DisplayMediaType.Src:
      return (
        <UserAvatar
          size={size}
          name={finalValue.toUpperCase()}
          src={value}
          className={classType}
          color={'var(--transparent)'}
        />
      );
    case DisplayMediaType.Flag:
    case DisplayMediaType.Svg:
      return (
        <UserAvatar
          size={size}
          name={finalValue.toUpperCase()}
          src={value}
          className={classType}
          borderRadius={0}
          color={'var(--transparent)'}
        />
      );
    case DisplayMediaType.Emoji:
      return (
        <UserAvatar
          size={size}
          name={finalValue.toUpperCase()}
          className={classType}
          color={'var(--transparent)'}
        />
      );
    default:
      return (
        <UserAvatar
          size={size}
          name={finalValue.toUpperCase()}
          className={classType}
          color={'var(--transparent)'}
        />
      );
  }
};

export default KsDisplayMedia;
