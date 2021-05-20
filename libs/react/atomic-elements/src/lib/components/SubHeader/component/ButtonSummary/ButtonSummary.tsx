import './ButtonSummary.scss';

import {
  AttributesEditor,
  EntityDetailsSectionProps,
} from '../../../EntityDetailsSection/EntityDetailsSection';
import { useEntityDetailsEventHandler, useKleeenActions } from '@kleeen/react/hooks';

import { ButtonSubHeader } from '../ButtonHeader/ButtonSubHeader';
import { ContainerHeader } from '../ContainerHeader/ContainerHeader';
import { OutContainerProps } from '../ContainerHeader/ContainerHeader.model';
import React from 'react';
import { TranslateProps } from '../../../../../types';

export const ButtonSummary = ({
  outContainer,
  entityName,
  entityDetails,
  taskName,
  displayTaskName,
  translate,
  isEditable,
  headerTitle,
}: EntityDetailsSectionProps & OutContainerProps & TranslateProps): React.ReactElement => {
  const [attributeEventList, { addEvent, clearEventList }] = useEntityDetailsEventHandler();
  const { updateRequest } = useKleeenActions(taskName);
  const [isShow, setIsShow] = React.useState(true);
  const [editOn, setEditOn] = React.useState(false);

  React.useEffect(() => {
    return clearEventList;
  }, []);

  const onSave = (): void => {
    const widgetsData = attributeEventList.map((event) => event.onSave()).filter((data) => data);
    const data = widgetsData.reduce((previous: any, current: any) => {
      return {
        ...current,
        params: {
          ...previous.params,
          ...current.params,
        },
      };
    }, {});
    updateRequest(data);
    setEditOn(false);
  };

  return (
    <>
      <ButtonSubHeader
        icon="AssignmentOutlined"
        className="element-button-filter"
        name={translate('app.subHeader.buttonSummary.summaryDetails')}
        setIsShow={setIsShow}
        isShow={isShow}
        translate={translate}
      ></ButtonSubHeader>
      <ContainerHeader
        isShow={isShow}
        isEditable={isEditable}
        outContainer={outContainer}
        setIsShow={setIsShow}
        switchOnEdit={setEditOn}
        editOn={editOn}
        onSaveEdit={onSave}
        className="button-container-summary-actions"
        filtersAdded={attributeEventList}
        translate={translate}
        container={
          <AttributesEditor
            entityName={headerTitle}
            entityDescription={entityName}
            registerEvents={addEvent}
            entityDetails={entityDetails}
            taskName={taskName}
            isEditing={editOn}
          />
        }
      />
    </>
  );
};
