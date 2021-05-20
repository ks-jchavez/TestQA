import { DisplayValueTitle } from '../display-value-title';
import React from 'react';

interface HeaderTitle {
  slots?: any[];
  objectValue?: string;
  taskName?: string;
  title?: string;
}

export const HeaderTitleEllipsis = (props: HeaderTitle, split = true): React.ReactElement => {
  return (
    <>
      {props.slots && props.objectValue ? (
        <div className="header-title">
          <div className="title-container">{props.title}</div>
          <div className="with-ellipsis">
            <DisplayValueTitle
              objectValue={props.objectValue}
              operationName={props.slots[0]?.params?.operationName}
              taskName={props.taskName}
            />
          </div>
        </div>
      ) : (
        props.title
      )}
    </>
  );
};

export const HeaderTitle = (props: HeaderTitle, split = true): React.ReactElement => {
  return (
    <>
      {props.slots && props.objectValue ? (
        <>
          <DisplayValueTitle
            objectValue={props.objectValue}
            operationName={props.slots[0]?.params?.operationName}
            taskName={props.taskName}
          />
          {split && ' | ' + props.title}
        </>
      ) : (
        props.title
      )}
    </>
  );
};
