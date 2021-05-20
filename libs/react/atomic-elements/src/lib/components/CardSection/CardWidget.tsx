import './CardSection.scss';

import React, { useEffect, useRef, useState } from 'react';

import { CardTitle } from './components/CardTitle';
import { CardWidgetProps } from './CardWidget.model';
import { MasonryProvider } from '@kleeen/react/hooks';
import classnames from 'classnames';

export const CardWidget = ({
  children,
  hideTitle,
  icon,
  selectedViz,
  title,
  widgetSelector = null,
  disabled
}: CardWidgetProps): JSX.Element => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [spans, setSpans] = useState(0);

  // Styles
  const cardStyle = {
    height: 42,
    marginBottom: 16,
    gridAutoRows: 10,
    imgOffset: 24,
  };

  const cardSpan = {
    gridRowEnd: `span ${spans}`,
  };

  // Logic
  const updateLayout = (contentHeight: number): void => {
    const newSpansVal = Math.ceil(
      (contentHeight + cardStyle.height + cardStyle.marginBottom) / cardStyle.gridAutoRows,
    );
    setSpans(() => newSpansVal);
  };

  useEffect(() => {
    updateLayout(contentRef.current.clientHeight);
  }, [selectedViz, spans]);

  const handleImageLoad = (event): void => {
    updateLayout(event.target.clientHeight + cardStyle.imgOffset);
  };

  return (
    <div className={classnames('card-widget', { 'disabled': disabled })} style={cardSpan}>
      {!hideTitle && <CardTitle title={title} icon={icon} />}
      <div className="content" ref={contentRef} onLoad={handleImageLoad}>
        <MasonryProvider updateLayout={updateLayout}>{children}</MasonryProvider>
        {widgetSelector}
      </div>
    </div>
  );
};
export default CardWidget;
