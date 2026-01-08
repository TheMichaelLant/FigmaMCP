import React, { useState, useMemo } from "react";
import BillingHeader from "./components/BillingHeader";
import BillingTabs from "./components/BillingTabs";
import SearchFilterBar from "./components/SearchFilterBar";
import BillingTable from "./components/BillingTable";
import type { InvoiceData } from "./types";
import { mockInvoiceData } from "./types";
import "./Table2.css";

interface Table2Props {
  data?: InvoiceData[];
}

const Table2: React.FC<Table2Props> = ({ data = mockInvoiceData }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    return data.filter(
      (invoice) =>
        invoice.invoiceNumber
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        invoice.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.amount.toString().includes(searchTerm)
    );
  }, [data, searchTerm]);

  const handleAddClick = () => {
    console.log("Add button clicked");
    // Add your logic here
  };

  const handleDownloadClick = () => {
    console.log("Download PDF Report clicked");
    // Add your logic here
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleFilterClick = () => {
    console.log("Filter button clicked");
    // Add your filter logic here
  };

  const handleRowSelectionChanged = (selectedData: InvoiceData[]) => {
    console.log("Selected rows:", selectedData);
    // Add your row selection logic here
  };

  const handlePayClick = (invoiceData: InvoiceData) => {
    console.log("Pay clicked for invoice:", invoiceData.invoiceNumber);
    // Add your payment logic here
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white flex flex-col gap-8 items-start px-10 py-16 w-full">
        {/* Header Section */}
        <div className="flex flex-col gap-10 w-full">
          <BillingHeader
            onAddClick={handleAddClick}
            onDownloadClick={handleDownloadClick}
          />

          {/* Tab Navigation */}
          <BillingTabs activeTab={activeTab} onTabChange={handleTabChange} />
        </div>

        {/* Search and Filter Bar */}
        <SearchFilterBar
          searchValue={searchTerm}
          onSearchChange={handleSearchChange}
          onFilterClick={handleFilterClick}
        />

        {/* Billing Table */}
        <BillingTable
          data={filteredData}
          onRowSelectionChanged={handleRowSelectionChanged}
          onPayClick={handlePayClick}
        />
      </div>
    </div>
  );
};

export default Table2;
