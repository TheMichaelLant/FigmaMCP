import React from 'react';
import type { InvoiceData } from '../../table2/types';

interface PayBillsSidebarProps {
  className?: string;
  selectedInvoices?: InvoiceData[];
  onPaySelected?: () => void;
}

const PayBillsSidebar: React.FC<PayBillsSidebarProps> = ({ 
  className = "",
  selectedInvoices = [],
  onPaySelected
}) => {
  const totalAmount = selectedInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const hasSelection = selectedInvoices.length > 0;

  return (
    <div className={`bg-white rounded-lg p-8 shadow-sm border ${className}`}>
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8">
        Pay your bills
      </h2>
      
      {hasSelection ? (
        <div className="space-y-6">
          {/* Selected invoices summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-700 mb-3">
              Selected Invoices ({selectedInvoices.length})
            </h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {selectedInvoices.map((invoice) => (
                <div key={invoice.id} className="flex justify-between text-sm">
                  <span className="text-gray-600 truncate mr-2">
                    {invoice.vendor}
                  </span>
                  <span className="font-medium text-gray-800">
                    ${invoice.amount.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total amount */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Total Amount:</span>
              <span className="text-xl font-bold text-green-600">
                ${totalAmount.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Pay button */}
          <button
            onClick={onPaySelected}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Pay Selected Bills
          </button>

          {/* Payment info */}
          <div className="text-xs text-gray-500 text-center">
            <p>Secure payment powered by your bank</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <p className="text-center text-sm">
            Select invoices from the table to pay your bills
          </p>
        </div>
      )}
    </div>
  );
};

export default PayBillsSidebar;