import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { ContextCell } from '../contextCell';
import { DataListItem } from '@kleeen/types';
import { ListItemProps } from './ListItem.model';
import { useStyles } from './listItem.style';

export function RankedListItem({ item, columns, metadata }: ListItemProps): ReactElement {
  const classes = useStyles();
  const getKey = (dataItem: DataListItem, columnName: string): string =>
    `${dataItem[columnName]?.id}  ${dataItem[columnName]?.displayValue}`;

  const calculatePositiveBar = (value: number): React.CSSProperties => {
    const minOrZero = Math.max(0, metadata?.min);
    const widthMax = (value - minOrZero) / (metadata?.max - minOrZero);
    return { width: `${widthMax * 100}%` };
  };
  const calculateNegativeBar = (value: number): React.CSSProperties => {
    const maxOrZero = Math.min(0, metadata?.max);
    const widthMax = (maxOrZero - value) / (maxOrZero - metadata?.min);
    return { width: `${widthMax * 100}%` };
  };

  return (
    <li className={classes.item}>
      {columns.map((column, i) => {
        const cellData = item[column.name];
        return (
          <div key={getKey(item, column?.name)} className={classes.cell}>
            {i === 1 && (
              <div className={classes.numericBar}>
                <div className={classes.barSpace} style={{ width: `${metadata?.positiveBarSpace}%` }}>
                  {parseInt(cellData.displayValue as string, 10) > 0 && (
                    <div
                      className={classnames(classes.bar, classes.positiveBar)}
                      style={calculatePositiveBar(parseInt(cellData.displayValue as string, 10))}
                    ></div>
                  )}
                </div>
                <div className={classes.barSpace} style={{ width: `${metadata?.negativeBarSpace}%` }}>
                  {parseInt(cellData.displayValue as string, 10) < 0 && (
                    <div
                      className={classnames(classes.bar, classes.negativeBar)}
                      style={calculateNegativeBar(parseInt(cellData.displayValue as string, 10))}
                    ></div>
                  )}
                </div>
              </div>
            )}

            <div
              className={classes.textNumericBar}
              style={i === 1 ? { paddingRight: `${metadata?.negativeBarSpace}%` } : {}}
            >
              <ContextCell attr={column} cell={cellData} format={column.format} />
            </div>
          </div>
        );
      })}
    </li>
  );
}
