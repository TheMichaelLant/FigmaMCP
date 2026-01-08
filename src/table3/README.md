# Table3 Component - Split Layout Billing Dashboard

This component implements a split-layout billing dashboard with the billing table on the left and a "Pay your bills" sidebar on the right, based on the Figma design.

## Features

### Left Panel - Billing Table
- Full billing table functionality from Table2
- Invoice selection with checkboxes
- Search and filter capabilities
- Status indicators and payment actions

### Right Panel - Pay Bills Sidebar
- **Empty State**: Shows instructions when no invoices selected
- **Selected State**: Displays selected invoices summary
- **Total Calculation**: Shows total amount for selected invoices
- **Bulk Payment**: "Pay Selected Bills" button for batch processing
- **Interactive Feedback**: Real-time updates based on table selections

## Component Structure

```
src/table3/
├── components/
│   └── PayBillsSidebar.tsx    # Right sidebar for payment processing
├── Table3.tsx                 # Main split-layout component
├── index.ts                   # Export file
└── README.md                  # This documentation
```

## Layout

- **Split Design**: Two-column layout with billing table (flex-1) and sidebar (320px width)
- **Background**: Light gray background to separate the two panels
- **Responsive**: Sidebar maintains fixed width while table panel adapts
- **Spacing**: Consistent padding and gaps between elements

## Key Interactions

1. **Invoice Selection**: Check boxes in table update sidebar immediately
2. **Real-time Totals**: Sidebar calculates and displays running totals
3. **Bulk Payment**: Single button to process all selected invoices
4. **Visual Feedback**: Selected invoices list with vendor names and amounts

## Usage

```tsx
import Table3 from './table3/Table3';

// With default mock data
<Table3 />

// With custom data
<Table3 data={customInvoiceData} />
```

## Navigation

Available at `/table3` route, accessible via the "Table 3 - Split Layout" button on the home page.

## Dependencies

- Reuses all Table2 components (BillingHeader, BillingTable, etc.)
- Extends Table2 functionality with sidebar integration
- TypeScript interfaces from Table2/types
