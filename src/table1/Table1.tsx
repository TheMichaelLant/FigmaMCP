import { useState } from "react";
import "./Table1.css";

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
    <div className="billing-container">
      <div className="billing-content">
        {/* Header */}
        <div className="header">
          <div className="header-content">
            <div className="title-section">
              <h1 className="title">Billing</h1>
              <p className="subtitle">
                Manage your billing and payment details
              </p>
            </div>
            <div className="header-actions">
              <button className="btn-primary">
                <img src={addIcon} alt="Add" className="btn-icon" />
                <img src={addIconPlus} alt="Plus" className="btn-icon" />
                <span>Add</span>
              </button>
              <button className="btn-secondary">
                <img src={downloadIcon} alt="Download" className="btn-icon" />
                <img src={downloadIcon2} alt="Download" className="btn-icon" />
                <img src={downloadIcon3} alt="Download" className="btn-icon" />
                <span>Download PDF Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          <div className="tabs">
            <button
              className={`tab ${activeTab === "Overview" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("Overview")}
            >
              Overview
            </button>
            <button
              className={`tab ${activeTab === "Segments" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("Segments")}
            >
              Segments
            </button>
            <button
              className={`tab ${activeTab === "Dashboard" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("Dashboard")}
            >
              Dashboard
            </button>
          </div>
          <div className="tab-indicator"></div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="search-filter-bar">
        <div className="search-container">
          <img src={searchIcon} alt="Search" className="search-icon" />
          <input
            type="text"
            placeholder="Search by invoice number, name, amount..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <button className="filter-btn">
          <img src={filterIcon} alt="Filter" className="filter-icon" />
          <span>Filter</span>
        </button>
      </div>

      {/* Table */}
      <div className="table-container">
        <div className="table">
          {/* Table Header */}
          <div className="table-header">
            <div className="header-cell invoice-number">
              <span>INVOICE NUMBER</span>
            </div>
            <div className="header-cell vendor">
              <span>VENDOR</span>
            </div>
            <div className="header-cell billing-date">
              <span>BILLING DATE</span>
              <img src={sortIcon} alt="Sort" className="sort-icon" />
            </div>
            <div className="header-cell status">
              <span>STATUS</span>
            </div>
            <div className="header-cell amount">
              <span>AMOUNT</span>
            </div>
            <div className="header-cell action"></div>
          </div>

          {/* Table Rows */}
          {filteredInvoices.map((invoice) => (
            <div key={invoice.id} className="table-row">
              <div className="table-cell invoice-number">
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={selectedInvoices.includes(invoice.id)}
                    onChange={() => handleCheckboxChange(invoice.id)}
                    className="checkbox"
                  />
                  <span className="invoice-text">{invoice.id}</span>
                </div>
              </div>
              <div className="table-cell vendor">
                <span>{invoice.vendor}</span>
              </div>
              <div className="table-cell billing-date">
                <span>{invoice.billingDate}</span>
              </div>
              <div className="table-cell status">
                <span
                  className={`status-badge ${invoice.status.toLowerCase()}`}
                >
                  {invoice.status}
                </span>
              </div>
              <div className="table-cell amount">
                <span className="amount-text">{invoice.amount}</span>
              </div>
              <div className="table-cell action">
                <button
                  className={`pay-btn ${
                    invoice.status === "Unpaid"
                      ? "pay-btn-active"
                      : "pay-btn-disabled"
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
