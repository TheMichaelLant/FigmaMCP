# Table2 Component - Billing Dashboard

This component implements a billing dashboard based on the Figma design with AG Grid data table integration.

## Structure

```
src/table2/
├── components/
│   ├── BillingHeader.tsx      # Header with title and action buttons
│   ├── BillingTabs.tsx        # Tab navigation (Overview, Segments, Dashboard)
│   ├── SearchFilterBar.tsx    # Search input and filter button
│   ├── BillingTable.tsx       # Main AG Grid table component
│   ├── StatusBadge.tsx        # Status indicator component (Paid/Unpaid)
│   └── PayButton.tsx          # Payment action button
├── constants/
│   └── icons.ts               # Extracted icon constants from Figma
├── types/
│   └── index.ts               # TypeScript interfaces and mock data
├── Table2.tsx                 # Main wrapper component
├── Table2.css                 # Custom AG Grid styling
└── index.ts                   # Export file
```

## Features

- **AG Grid Integration**: Professional data table with sorting, filtering, and row selection
- **Component Separation**: Each UI element is separated into reusable components
- **Icon Constants**: All Figma icons extracted to constants file
- **Props-based Data**: Test data passed as props from parent component
- **Search Functionality**: Real-time search across invoice number, vendor, and amount
- **Status Badges**: Visual status indicators matching Figma design
- **Responsive Design**: Tailwind CSS classes for responsive layout

## Data Structure

```typescript
interface InvoiceData {
  id: string;
  invoiceNumber: string;
  vendor: string;
  billingDate: string;
  status: 'Paid' | 'Unpaid';
  amount: number;
  selected?: boolean;
}
```

## Usage

```tsx
import Table2 from './table2/Table2';

// With default mock data
<Table2 />

// With custom data
<Table2 data={customInvoiceData} />
```

## Styling

- Uses Tailwind CSS for styling
- Custom AG Grid theme matching Figma design
- Manrope font family (as specified in Figma)
- Color palette matching Figma tokens

## Navigation

The component is available at `/table2` route and accessible via the "Table 2" button on the home page.
