import { FC, Fragment, useMemo } from "react";

import { ITable } from "../../models";
import { ellipsis } from "../../utils";
import { VIEW_TYPES } from "../../constants";

export const Table: FC<ITable> = (props): JSX.Element => {
  const { data, headers, columns, onRowClick } = props;
  const keyName = useMemo(
    () => columns.filter((c) => c?.isKey)[0]?.key,
    [columns]
  );

  return (
    <>
      <div className="table-container">
        <table className="table is-hoverable is-fullwidth">
          <thead>
            <tr>
              {headers.map((el) => (
                <th key={el}>{el}</th>
              ))}
            </tr>
          </thead>
          <tfoot>
            <tr>
              {headers.map((el) => (
                <th key={el}>{el}</th>
              ))}
            </tr>
          </tfoot>
          <tbody>
            {data.map((el: any) => (
              <tr key={el[keyName]} onClick={() => onRowClick(el[keyName])}>
                {columns.map((c) => (
                  <>
                    {c.viewType === VIEW_TYPES.TEXT && (
                      <td
                        style={{
                          textTransform: c.isCapitalized
                            ? "capitalize"
                            : "unset",
                        }}
                      >
                        {el[c.key]
                          ? c.isEllipsised
                            ? ellipsis(el[c.key], 15)
                            : el[c.key]
                          : "-"}
                      </td>
                    )}

                    {c.viewType === VIEW_TYPES.URL && (
                      <td>
                        <a
                          href={`https://${c.url}/tx/${
                            el[c.key]
                          }?cluster=devnet`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          view
                        </a>
                      </td>
                    )}
                  </>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
