import './headerAndSubSections.scss';

import { ButtonFilter, ButtonSelect, ButtonSummary, SubHeader } from '../SubHeader/SubHeader';
import React, { ReactElement, useState } from 'react';
import { isNilOrEmpty, sortByKeys } from '@kleeen/common/utils';

import { ButtonDate } from '../SubHeader/component/ButtonsDate/ButtonsDate';
import { HeaderAndSubSectionsProps } from './HeaderAndSubSections.model';
import { HeaderTitle } from '../HeaderTitle';
import { KUIConnect } from '@kleeen/core-react';
import { KsHeader } from '../Header';
import { useKleeenActions } from '@kleeen/react/hooks';

function HeaderAndSubSectionsComponent({
  actionsProps,
  filters,
  handleChangeTab,
  hideRefreshControl,
  objectValue,
  slots,
  subTitle,
  taskName,
  title,
  translate,
  upText,
  value,
  viewOptions,
  withDateFilter,
  withFilterSection,
  withSummarySection,
}: HeaderAndSubSectionsProps): ReactElement {
  const { refreshPage } = useKleeenActions(taskName);
  const [outContainer, setOutContainer] = useState<ReactElement>();

  // TODO: @cafe move this logic to a shared util and re-use it in DataViewControlSection
  const viewOption = viewOptions && viewOptions[value];
  const orderedViewProps = sortByKeys(viewOptions, ['viewOrder', 'viewId']);
  const actions = isNilOrEmpty(actionsProps?.actions) ? viewOption?.actions : actionsProps.actions;
  const attributes = isNilOrEmpty(viewOption?.modalAttributes)
    ? actionsProps.attributes
    : viewOption.modalAttributes;
  const props = {
    objectValue,
    slots,
    taskName,
    title,
  };

  return (
    <>
      <KsHeader
        actionsProps={{
          ...actionsProps,
          actions,
          attributes,
          taskName,
        }}
        hideRefreshControl={hideRefreshControl}
        onRefresh={refreshPage}
        subTitle={subTitle}
        title={HeaderTitle(props)}
        upText={upText}
      />
      <SubHeader>
        <ButtonSelect
          handleChangeTab={handleChangeTab}
          taskName={taskName}
          translate={translate}
          value={value}
          viewOptions={orderedViewProps}
        />
        {withDateFilter && <ButtonDate translate={translate} hasDateFilter={true} />}
        {withFilterSection && (
          <ButtonFilter
            filters={filters}
            outContainer={setOutContainer}
            taskName={taskName}
            translate={translate}
          />
        )}
        {withSummarySection && (
          <ButtonSummary
            displayTaskName={withSummarySection.displayTaskName}
            entityDetails={withSummarySection.entityDetails}
            entityName={withSummarySection.entityName}
            headerTitle={HeaderTitle(props, false)}
            isEditable={withSummarySection.isEditable}
            outContainer={setOutContainer}
            taskName={withSummarySection.taskName}
            translate={translate}
          />
        )}
      </SubHeader>
      {outContainer}
    </>
  );
}

export const HeaderAndSubSections = KUIConnect(({ translate }) => ({ translate }))(
  HeaderAndSubSectionsComponent,
);
