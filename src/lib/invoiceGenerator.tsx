import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { format } from 'date-fns';

// Register font if needed (optional)
try {
  Font.register({
    family: 'Helvetica',
    fonts: [
      { src: '/fonts/Helvetica.ttf' },
      { src: '/fonts/Helvetica-Bold.ttf', fontWeight: 'bold' },
    ],
  });
} catch (e) {
  console.warn('Failed to register fonts:', e);
}

// Define TypeScript interfaces
export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface InvoiceProps {
  invoiceNumber: string;
  bookingDate: Date | string;
  bookingId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  villaName: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentId?: string;
  companyName?: string;
  companyAddress?: string;
  companyPhone?: string;
  companyEmail?: string;
}

// Define our custom styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 12,
  },
  section: {
    marginBottom: 20,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    borderBottomStyle: 'solid',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  col: {
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    width: 120,
  },
  table: {
    width: '100%',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderStyle: 'solid',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    borderBottomStyle: 'solid',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    borderBottomStyle: 'solid',
  },
  tableCol: {
    flex: 1,
  },
  textRight: {
    textAlign: 'right',
  },
  textBold: {
    fontWeight: 'bold',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    borderTopStyle: 'solid',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10,
    color: '#666',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    borderTopStyle: 'solid',
  },
  statusBadge: {
    padding: 5,
    borderRadius: 5,
    fontSize: 12,
    textAlign: 'center',
  },
  statusPaid: {
    backgroundColor: '#4CAF50',
    color: '#fff',
  },
  statusPending: {
    backgroundColor: '#FFC107',
    color: '#000',
  },
  statusFailed: {
    backgroundColor: '#F44336',
    color: '#fff',
  },
});

// Format currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format date
const formatDate = (date: Date | string): string => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'MMM d, yyyy');
};

// Main Invoice Document Component
const InvoiceDocument: React.FC<InvoiceProps> = ({
  invoiceNumber,
  bookingDate,
  bookingId,
  customerName,
  customerEmail,
  customerPhone,
  villaName,
  checkInDate,
  checkOutDate,
  nights,
  items,
  subtotal,
  taxRate,
  taxAmount,
  total,
  paymentMethod,
  paymentStatus = 'pending',
  paymentId,
  companyName = 'DreamVista Stays',
  companyAddress = '123 Villa Road\nGoa, India 403001',
  companyPhone = '+91 9876543210',
  companyEmail = 'bookings@dreamvistastays.com',
}) => {
  // Get status style based on payment status
  const getStatusStyle = () => {
    if (paymentStatus === 'paid') return styles.statusPaid;
    if (paymentStatus === 'failed') return styles.statusFailed;
    return styles.statusPending;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>INVOICE</Text>
          <View style={styles.row}>
            <Text>Invoice #: {invoiceNumber}</Text>
            <Text style={{ textAlign: 'right', flex: 1 }}>Date: {formatDate(bookingDate)}</Text>
          </View>
        </View>

        {/* Company Info */}
        <View style={[styles.row, { marginBottom: 30 }]}>
          <View style={styles.col}>
            <Text style={styles.textBold}>{companyName}</Text>
            {companyAddress.split('\n').map((line, i) => (
              <Text key={i}>{line}</Text>
            ))}
            <Text>Phone: {companyPhone}</Text>
            <Text>Email: {companyEmail}</Text>
          </View>
          <View style={styles.col}>
            <Text style={[styles.textBold, { marginBottom: 5 }]}>Bill To:</Text>
            <Text>{customerName}</Text>
            <Text>{customerEmail}</Text>
            <Text>{customerPhone}</Text>
          </View>
        </View>

        {/* Booking Details */}
        <View style={styles.section}>
          <Text style={[styles.textBold, { marginBottom: 10 }]}>Booking Details:</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Villa:</Text>
            <Text>{villaName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Check-in:</Text>
            <Text>{formatDate(checkInDate)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Check-out:</Text>
            <Text>{formatDate(checkOutDate)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Nights:</Text>
            <Text>{nights}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Booking ID:</Text>
            <Text>{bookingId}</Text>
          </View>
        </View>

        {/* Invoice Items */}
        <View style={styles.section}>
          <Text style={[styles.textBold, { marginBottom: 10 }]}>Invoice Items</Text>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCol, styles.textBold]}>Description</Text>
              <Text style={[styles.tableCol, styles.textRight, styles.textBold]}>Qty</Text>
              <Text style={[styles.tableCol, styles.textRight, styles.textBold]}>Unit Price</Text>
              <Text style={[styles.tableCol, styles.textRight, styles.textBold]}>Amount</Text>
            </View>
            
            {/* Table Rows */}
            {items.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCol}>{item.description}</Text>
                <Text style={[styles.tableCol, styles.textRight]}>{item.quantity}</Text>
                <Text style={[styles.tableCol, styles.textRight]}>{formatCurrency(item.unitPrice)}</Text>
                <Text style={[styles.tableCol, styles.textRight]}>{formatCurrency(item.amount)}</Text>
              </View>
            ))}
          </View>

          {/* Totals */}
          <View style={[styles.row, { justifyContent: 'flex-end', marginTop: 10 }]}>
            <View style={{ width: 200 }}>
              <View style={[styles.row, { justifyContent: 'space-between' }]}>
                <Text>Subtotal:</Text>
                <Text>{formatCurrency(subtotal)}</Text>
              </View>
              <View style={[styles.row, { justifyContent: 'space-between' }]}>
                <Text>Tax ({taxRate}%):</Text>
                <Text>{formatCurrency(taxAmount)}</Text>
              </View>
              <View style={[styles.row, { justifyContent: 'space-between', marginTop: 5 }]}>
                <Text style={styles.textBold}>Total:</Text>
                <Text style={styles.textBold}>{formatCurrency(total)}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Payment Info */}
        <View style={styles.section}>
          <Text style={[styles.textBold, { marginBottom: 10 }]}>Payment Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Payment Method:</Text>
            <Text>{paymentMethod}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Payment Status:</Text>
            <View style={[styles.statusBadge, getStatusStyle()]}>
              <Text>{paymentStatus.toUpperCase()}</Text>
            </View>
          </View>
          {paymentId && (
            <View style={styles.row}>
              <Text style={styles.label}>Payment ID:</Text>
              <Text>{paymentId}</Text>
            </View>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text>Thank you for choosing {companyName}!</Text>
          <Text>For any inquiries, please contact: {companyEmail}</Text>
        </View>
      </Page>
    </Document>
  );
};

// Export the component
export default InvoiceDocument;

// Helper function to generate and download invoice
export const generateAndDownloadInvoice = async (
  invoiceData: Omit<InvoiceProps, 'invoiceNumber' | 'bookingDate'> & { invoiceNumber: string; bookingDate: string | Date }
) => {
  // Dynamically import pdf to reduce bundle size
  const { pdf } = await import('@react-pdf/renderer');

  // Create a new PDF document
  const doc = <InvoiceDocument {...invoiceData} />;
  
  // Generate the PDF as a blob
  const pdfBlob = await pdf(doc).toBlob();
  const url = URL.createObjectURL(pdfBlob);
  
  // Create a temporary link and trigger the download
  const a = document.createElement('a');
  a.href = url;
  a.download = `invoice-${invoiceData.invoiceNumber}.pdf`;
  document.body.appendChild(a);
  a.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
};
