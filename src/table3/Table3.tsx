import React, { useState, useMemo } from 'react';
import type { InvoiceData } from '../table2/types';
import { mockInvoiceData } from '../table2/types';
import BillingHeader from '../table2/components/BillingHeader';
import BillingTabs from '../table2/components/BillingTabs';
import SearchFilterBar from '../table2/components/SearchFilterBar';
import BillingTable from '../table2/components/BillingTable';
import PayBillsSidebar from './components/PayBillsSidebar';
import '../table2/Table2.css';

interface Table3Props {
  data?: InvoiceData[];
}

const Table3: React.FC<Table3Props> = ({ data = mockInvoiceData }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState<InvoiceData[]>([]);

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    
    return data.filter(invoice =>
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.amount.toString().includes(searchTerm)
    );
  }, [data, searchTerm]);

  const handleAddClick = () => {
    console.log('Add button clicked');
    // Add your logic here
  };

  const handleDownloadClick = () => {
    console.log('Download PDF Report clicked');
    // Add your logic here
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleFilterClick = () => {
    console.log('Filter button clicked');
    // Add your filter logic here
  };

  const handleRowSelectionChanged = (selectedData: InvoiceData[]) => {
    setSelectedRows(selectedData);
    console.log('Selected rows:', selectedData);
  };

  const handlePayClick = (invoiceData: InvoiceData) => {
    console.log('Pay clicked for invoice:', invoiceData.invoiceNumber);
    // Add your payment logic here
  };

  const handlePaySelected = () => {
    if (selectedRows.length > 0) {
      console.log('Paying selected invoices:', selectedRows);
      // Add bulk payment logic here
      alert(`Processing payment for ${selectedRows.length} invoices totaling $${selectedRows.reduce((sum, row) => sum + row.amount, 0).toFixed(2)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex gap-6 p-6">
        {/* Left side - Billing Table */}
        <div className="flex-1 bg-white rounded-lg p-10">
          {/* Header Section */}
          <div className="flex flex-col gap-10 w-full mb-8">
            <BillingHeader
              onAddClick={handleAddClick}
              onDownloadClick={handleDownloadClick}
            />
            
            {/* Tab Navigation */}
            <BillingTabs
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          </div>

          {/* Search and Filter Bar */}
          <SearchFilterBar
            searchValue={searchTerm}
            onSearchChange={handleSearchChange}
            onFilterClick={handleFilterClick}
          />

          {/* Billing Table */}
          <div className="mt-8">
            <BillingTable
              data={filteredData}
              onRowSelectionChanged={handleRowSelectionChanged}
              onPayClick={handlePayClick}
            />
          </div>
        </div>

        {/* Right side - Pay Bills Sidebar */}
        <div className="w-80">
          <PayBillsSidebar 
            selectedInvoices={selectedRows}
            onPaySelected={handlePaySelected}
          />
        </div>
      </div>
    </div>
  );
};

export default Table3;