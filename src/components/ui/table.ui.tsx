import { FC } from "react";

import { ITable } from "../../models";
import { ellipsis } from "../../utils";

export const Table: FC<ITable> = (props): JSX.Element => {
  const { data, headers, onRowClick } = props;

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
            {data.map((el) => (
              <tr key={el.signature} onClick={() => onRowClick(el.signature)}>
                <td>{ellipsis(el.signature, 15)}</td>
                <td>{el.createdAt}</td>
                <td>{el.to ? ellipsis(el.to, 15) : "-"}</td>
                <td>{el.amount || "-"}</td>
                <td style={{ textTransform: "capitalize" }}>{el.status}</td>
                <td>
                  <a
                    href={`https://solscan.io/tx/${el.signature}?cluster=devnet`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    view
                  </a>
                </td>
                <td>
                  <a
                    href={`https://explorer.solana.com/tx/${el.signature}?cluster=devnet`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    view
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
