import { useState } from "react";

// Icon SVGs from Figma design
const addIcon =
  "https://www.figma.com/api/mcp/asset/92671d5a-9a46-455c-87e1-529910f36fe7";
const addIconPlus =
  "https://www.figma.com/api/mcp/asset/bdb366de-e0da-44b9-8e58-f0a90e218950";
const downloadIcon =
  "https://www.figma.com/api/mcp/asset/57fe78da-a5bb-4fd9-a63e-39c9a7859745";
const downloadIcon2 =
  "https://www.figma.com/api/mcp/asset/2e8b0ca2-061b-4f84-8b6b-5030fa902167";
const downloadIcon3 =
  "https://www.figma.com/api/mcp/asset/a42b62d9-a458-4991-8441-edfe202da0eb";
const searchIcon =
  "https://www.figma.com/api/mcp/asset/e3965f3f-c0eb-4e03-9e44-617c64e350fd";
const filterIcon =
  "https://www.figma.com/api/mcp/asset/e34f9d2d-253c-4582-bcbd-ae2e82802504";
const sortIcon =
  "https://www.figma.com/api/mcp/asset/ae4c1351-ff21-4348-ac8e-54dff162a3cf";

interface InvoiceData {
  id: string;
  vendor: string;
  billingDate: string;
  status: "Paid" | "Unpaid";
  amount: string;
}

const invoiceData: InvoiceData[] = [
  {
    id: "5146846548465",
    vendor: "Jane Cooper",
    billingDate: "2/19/21",
    status: "Paid",
    amount: "$500.00",
  },
  {
    id: "5467319467348",
    vendor: "Wade Warren",
    billingDate: "5/7/16",
    status: "Paid",
    amount: "$500.00",
  },
  {
    id: "1345705945446",
    vendor: "Esther Howard",
    billingDate: "9/18/16",
    status: "Unpaid",
    amount: "$500.00",
  },
  {
    id: "5440754979777",
    vendor: "Cameron Williamson",
    billingDate: "2/11/12",
    status: "Paid",
    amount: "$500.00",
  },
  {
    id: "1243467984543",
    vendor: "Brooklyn Simmons",
    billingDate: "9/18/16",
    status: "Unpaid",
    amount: "$500.00",
  },
  {
    id: "8454134649707",
    vendor: "Leslie Alexander",
    billingDate: "1/28/17",
    status: "Unpaid",
    amount: "$500.00",
  },
  {
    id: "2130164040451",
    vendor: "Jenny Wilson",
    billingDate: "5/27/15",
    status: "Paid",
    amount: "$500.00",
  },
  {
    id: "0439104645404",
    vendor: "Guy Hawkins",
    billingDate: "8/2/19",
    status: "Paid",
    amount: "$500.00",
  },
];

function Table1() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCheckboxChange = (invoiceId: string) => {
    setSelectedInvoices((prev) =>
      prev.includes(invoiceId)
        ? prev.filter((id) => id !== invoiceId)
        : [...prev, invoiceId]
    );
  };

  const filteredInvoices = invoiceData.filter(
    (invoice) =>
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.amount.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white flex flex-col gap-8 px-10 py-16 rounded min-h-screen font-['Manrope']">
      <div className="flex flex-col gap-10 w-full">
        {/* Header */}
        <div className="flex gap-8 items-center w-full relative">
          <div className="flex w-full justify-between items-center">
            <div className="flex flex-col gap-2 flex-1">
              <h1 className="font-bold text-[30px] text-[#191d23]">Billing</h1>
              <p className="font-normal text-lg text-[#64748b]">
                Manage your billing and payment details
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <button className="bg-emerald-700 border-none flex gap-2.5 h-11 items-center justify-center px-4 py-2 rounded text-white font-semibold text-base cursor-pointer transition-colors hover:bg-emerald-900">
                <img
                  src={addIcon}
                  alt="Add"
                  className="w-4 h-4 object-contain"
                />
                <img
                  src={addIconPlus}
                  alt="Plus"
                  className="w-4 h-4 object-contain"
                />
                <span>Add</span>
              </button>
              <button className="border-[1.5px] border-[#d0d5dd] bg-white flex gap-2.5 h-11 items-center justify-center px-3 py-2 rounded text-[#191d23] font-semibold text-base cursor-pointer transition-colors hover:border-[#b8c0cc]">
                <img
                  src={downloadIcon}
                  alt="Download"
                  className="w-4 h-4 object-contain"
                />
                <img
                  src={downloadIcon2}
                  alt="Download"
                  className="w-4 h-4 object-contain"
                />
                <img
                  src={downloadIcon3}
                  alt="Download"
                  className="w-4 h-4 object-contain"
                />
                <span>Download PDF Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="relative w-[323px]">
          <div className="flex w-full">
            <button
              className={`flex-1 flex items-center justify-center p-2 bg-transparent border-none text-base text-center cursor-pointer transition-all ${
                activeTab === "Overview"
                  ? "font-semibold text-[#191d23]"
                  : "font-normal text-[#191d23]"
              }`}
              onClick={() => setActiveTab("Overview")}
            >
              Overview
            </button>
            <button
              className={`flex-1 flex items-center justify-center p-2 bg-transparent border-none text-base text-center cursor-pointer transition-all ${
                activeTab === "Segments"
                  ? "font-semibold text-[#191d23]"
                  : "font-normal text-[#191d23]"
              }`}
              onClick={() => setActiveTab("Segments")}
            >
              Segments
            </button>
            <button
              className={`flex-1 flex items-center justify-center p-2 bg-transparent border-none text-base text-center cursor-pointer transition-all ${
                activeTab === "Dashboard"
                  ? "font-semibold text-[#191d23]"
                  : "font-normal text-[#191d23]"
              }`}
              onClick={() => setActiveTab("Dashboard")}
            >
              Dashboard
            </button>
          </div>
          <div className="absolute -bottom-0.5 left-0 w-[108px] h-0.5 bg-[#191d23] transition-all duration-300"></div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-[#f7f8f9] flex items-start justify-between p-3 rounded w-full">
        <div className="bg-white border border-[#e7eaee] flex gap-2 h-10 items-center p-2 rounded w-[425px]">
          <img
            src={searchIcon}
            alt="Search"
            className="w-4 h-4 object-contain"
          />
          <input
            type="text"
            placeholder="Search by invoice number, name, amount..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border-none outline-none font-normal text-[15px] text-[#191d23] bg-transparent placeholder:text-[#64748b]"
          />
        </div>
        <button className="bg-white border-none flex gap-2.5 h-10 items-center justify-center px-4 py-2 rounded text-[#64748b] font-semibold text-base cursor-pointer transition-colors hover:bg-[#f7f8f9]">
          <img
            src={filterIcon}
            alt="Filter"
            className="w-4 h-4 object-contain"
          />
          <span>Filter</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded flex-1 w-full overflow-hidden">
        <div className="flex flex-col h-full w-full">
          {/* Table Header */}
          <div className="grid grid-cols-[244px_1fr_1fr_1fr_1fr_1fr] border-b border-[#e7eaee] h-[59.33px]">
            <div className="flex items-center p-2 font-semibold text-sm text-[#64748b]">
              <span>INVOICE NUMBER</span>
            </div>
            <div className="flex items-center p-2 font-semibold text-sm text-[#64748b]">
              <span>VENDOR</span>
            </div>
            <div className="flex items-center p-2 gap-1 font-semibold text-sm text-[#64748b]">
              <span>BILLING DATE</span>
              <img
                src={sortIcon}
                alt="Sort"
                className="w-4 h-4 object-contain rotate-180"
              />
            </div>
            <div className="flex items-center p-2 font-semibold text-sm text-[#64748b]">
              <span>STATUS</span>
            </div>
            <div className="flex items-center p-2 font-semibold text-sm text-[#64748b]">
              <span>AMOUNT</span>
            </div>
            <div className="flex items-center p-2 font-semibold text-sm text-[#64748b]"></div>
          </div>

          {/* Table Rows */}
          {filteredInvoices.map((invoice) => (
            <div
              key={invoice.id}
              className="grid grid-cols-[244px_1fr_1fr_1fr_1fr_1fr] bg-white border-b border-[#e7eaee] min-h-[60px]"
            >
              <div className="flex items-center px-2 py-4 font-normal text-base text-[#191d23]">
                <div className="flex gap-2 items-center w-[140px]">
                  <input
                    type="checkbox"
                    checked={selectedInvoices.includes(invoice.id)}
                    onChange={() => handleCheckboxChange(invoice.id)}
                    className="w-4 h-4 border-2 border-[rgba(4,9,33,0.32)] rounded-sm bg-white cursor-pointer accent-emerald-700"
                  />
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[121px]">
                    {invoice.id}
                  </span>
                </div>
              </div>
              <div className="flex items-center px-2 py-4 font-normal text-base text-[#191d23]">
                <span>{invoice.vendor}</span>
              </div>
              <div className="flex items-center px-2 py-4 font-normal text-base text-[#191d23]">
                <span>{invoice.billingDate}</span>
              </div>
              <div className="flex items-center px-2 py-4 font-normal text-base text-[#191d23]">
                <span
                  className={`px-2.5 py-0.5 rounded font-semibold text-[13px] text-center ${
                    invoice.status === "Paid"
                      ? "bg-emerald-50 text-emerald-900"
                      : "bg-red-50 text-red-800"
                  }`}
                >
                  {invoice.status}
                </span>
              </div>
              <div className="flex items-center px-2 py-4 font-semibold text-base text-[#191d23]">
                <span>{invoice.amount}</span>
              </div>
              <div className="flex items-center px-2 py-4 font-normal text-base text-[#191d23]">
                <button
                  className={`h-9 px-8 rounded border-none font-normal text-base cursor-pointer transition-all ${
                    invoice.status === "Unpaid"
                      ? "bg-emerald-700 text-white hover:bg-emerald-900"
                      : "bg-[#e7eaee] text-[#64748b] cursor-not-allowed"
                  }`}
                >
                  Pay
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Table1;
