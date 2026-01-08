import React, { useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import type {
  ColDef,
  SelectionChangedEvent,
  ICellRendererParams,
  IHeaderParams,
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import type { InvoiceData } from "../types";
import StatusBadge from "./StatusBadge";
import PayButton from "./PayButton";
import { ICONS } from "../constants/icons";

interface BillingTableProps {
  data: InvoiceData[];
  onRowSelectionChanged?: (selectedRows: InvoiceData[]) => void;
  onPayClick?: (invoiceData: InvoiceData) => void;
}

const BillingTable: React.FC<BillingTableProps> = ({
  data,
  onRowSelectionChanged,
  onPayClick,
}) => {
  const onSelectionChanged = useCallback(
    (event: SelectionChangedEvent) => {
      const selectedNodes = event.api.getSelectedNodes();
      const selectedData = selectedNodes.map((node) => node.data);
      onRowSelectionChanged?.(selectedData);
    },
    [onRowSelectionChanged]
  );

  // Custom cell renderer for status
  const StatusCellRenderer = useCallback(
    (props: ICellRendererParams<InvoiceData>) => {
      return <StatusBadge status={props.value} />;
    },
    []
  );

  // Custom cell renderer for amount
  const AmountCellRenderer = useCallback(
    (props: ICellRendererParams<InvoiceData>) => {
      return (
        <span className="font-['Manrope'] font-semibold text-base text-[#191d23]">
          ${props.value.toFixed(2)}
        </span>
      );
    },
    []
  );

  // Custom cell renderer for pay button
  const PayButtonCellRenderer = useCallback(
    (props: ICellRendererParams<InvoiceData>) => {
      const isPaid = props.data?.status === "Paid";
      return (
        <PayButton isPaid={isPaid} onClick={() => onPayClick?.(props.data!)} />
      );
    },
    [onPayClick]
  );

  // Custom header component with sort icon
  const CustomHeader = useCallback((props: IHeaderParams) => {
    return (
      <div className="flex items-center gap-1">
        <span className="font-['Manrope'] font-semibold text-[14px] text-[#64748b] uppercase">
          {props.displayName}
        </span>
        {props.column.getColId() === "billingDate" && (
          <div className="relative size-4">
            <div className="absolute bottom-[33.33%] flex items-center justify-center left-1/4 right-1/4 top-[37.5%]">
              <div className="flex-none h-[7px] rotate-[180deg] w-3">
                <img
                  alt="Sort down"
                  className="block max-w-none size-full"
                  src={ICONS.SORT_DOWN}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }, []);

  const columnDefs: ColDef<InvoiceData>[] = useMemo(
    () => [
      {
        headerName: "INVOICE NUMBER",
        field: "invoiceNumber",
        headerComponent: CustomHeader,
        checkboxSelection: true,
        headerCheckboxSelection: true,
        cellClass: "font-manrope font-normal text-base text-gray-800",
        width: 244,
        cellStyle: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          justifyContent: "flex-start",
        },
      },
      {
        headerName: "VENDOR",
        field: "vendor",
        headerComponent: CustomHeader,
        cellClass: "font-manrope font-normal text-base text-gray-800",
        flex: 1,
      },
      {
        headerName: "BILLING DATE",
        field: "billingDate",
        headerComponent: CustomHeader,
        cellClass: "font-manrope font-normal text-base text-gray-800",
        flex: 1,
        sortable: true,
      },
      {
        headerName: "STATUS",
        field: "status",
        headerComponent: CustomHeader,
        cellRenderer: StatusCellRenderer,
        flex: 1,
      },
      {
        headerName: "AMOUNT",
        field: "amount",
        headerComponent: CustomHeader,
        cellRenderer: AmountCellRenderer,
        flex: 1,
      },
      {
        headerName: "",
        cellRenderer: PayButtonCellRenderer,
        sortable: false,
        filter: false,
        flex: 1,
        cellStyle: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
    ],
    [
      CustomHeader,
      StatusCellRenderer,
      AmountCellRenderer,
      PayButtonCellRenderer,
    ]
  );

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      minWidth: 100,
    }),
    []
  );

  return (
    <div
      className="ag-theme-alpine bg-white rounded-[4px] w-full"
      style={{ height: "600px" }}
    >
      <AgGridReact<InvoiceData>
        columnDefs={columnDefs}
        rowData={data}
        defaultColDef={defaultColDef}
        rowSelection="multiple"
        suppressRowClickSelection={true}
        onSelectionChanged={onSelectionChanged}
        headerHeight={59}
        rowHeight={54}
        animateRows={true}
        domLayout="normal"
      />
    </div>
  );
};

export default BillingTable;
