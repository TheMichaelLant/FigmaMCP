export interface InvoiceData {
  id: string;
  invoiceNumber: string;
  vendor: string;
  billingDate: string;
  status: "Paid" | "Unpaid";
  amount: number;
  selected?: boolean;
}

export const mockInvoiceData: InvoiceData[] = [
  {
    id: "1",
    invoiceNumber: "5146846548465",
    vendor: "Jane Cooper",
    billingDate: "2/19/21",
    status: "Paid",
    amount: 500.0,
    selected: false,
  },
  {
    id: "2",
    invoiceNumber: "5467319467348",
    vendor: "Wade Warren",
    billingDate: "5/7/16",
    status: "Paid",
    amount: 500.0,
    selected: false,
  },
  {
    id: "3",
    invoiceNumber: "1345705945446",
    vendor: "Esther Howard",
    billingDate: "9/18/16",
    status: "Unpaid",
    amount: 500.0,
    selected: false,
  },
  {
    id: "4",
    invoiceNumber: "5440754979777",
    vendor: "Cameron Williamson",
    billingDate: "2/11/12",
    status: "Paid",
    amount: 500.0,
    selected: false,
  },
  {
    id: "5",
    invoiceNumber: "1243467984543",
    vendor: "Brooklyn Simmons",
    billingDate: "9/18/16",
    status: "Unpaid",
    amount: 500.0,
    selected: false,
  },
  {
    id: "6",
    invoiceNumber: "8454134649707",
    vendor: "Leslie Alexander",
    billingDate: "1/28/17",
    status: "Unpaid",
    amount: 500.0,
    selected: false,
  },
  {
    id: "7",
    invoiceNumber: "2130164040451",
    vendor: "Jenny Wilson",
    billingDate: "5/27/15",
    status: "Paid",
    amount: 500.0,
    selected: false,
  },
  {
    id: "8",
    invoiceNumber: "0439104645404",
    vendor: "Guy Hawkins",
    billingDate: "8/2/19",
    status: "Paid",
    amount: 500.0,
    selected: false,
  },
];
