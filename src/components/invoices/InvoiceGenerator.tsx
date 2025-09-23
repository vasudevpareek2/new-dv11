import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { format } from 'date-fns';
import React from 'react';

// Define types
export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface InvoiceProps {
  invoiceNumber: string;
  bookingDate: Date | string;
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
  paymentStatus: string;
  paymentId?: string;
}

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 12,
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottom: '1px solid #e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  companyInfo: {
    marginBottom: 20,
  },
  invoiceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: 5,
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
    marginRight: 10,
    width: 120,
  },
  table: {
    width: '100%',
    border: '1px solid #e5e7eb',
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    padding: 8,
    borderBottom: '1px solid #e5e7eb',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottom: '1px solid #e5e7eb',
  },
  tableCol: {
    flex: 1,
  },
  tableColRight: {
    flex: 1,
    textAlign: 'right',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    paddingTop: 10,
    borderTop: '1px solid #e5e7eb',
  },
  totalLabel: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  totalValue: {
    fontWeight: 'bold',
    minWidth: 100,
    textAlign: 'right',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#666',
    fontSize: 10,
  },
});

// The main invoice component
const InvoiceDocument: React.FC<InvoiceProps> = ({
  invoiceNumber,
  bookingDate,
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
  paymentStatus,
  paymentId,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>INVOICE</Text>
        <Text style={styles.subtitle}>Invoice #{invoiceNumber}</Text>
        <Text style={styles.subtitle}>
          Booking Date: {format(new Date(bookingDate), 'MMM d, yyyy')}
        </Text>
      </View>

      {/* Customer and Company Info */}
      <View style={styles.row}>
        <View style={[styles.col, { marginRight: 20 }]}>
          <Text style={styles.sectionTitle}>Bill To:</Text>
          <Text>{customerName}</Text>
          <Text>{customerEmail}</Text>
          <Text>{customerPhone}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.sectionTitle}>From:</Text>
          <Text>Dolce Vita Pushkar</Text>
          <Text>123 Villa Street</Text>
          <Text>Pushkar, Rajasthan 305022</Text>
          <Text>India</Text>
          <Text>+91 87420 00006</Text>
          <Text>bookings@dolcevitapushkar.com</Text>
        </View>
      </View>

      {/* Booking Details */}
      <View style={[styles.section, { marginTop: 20 }]}>
        <Text style={styles.sectionTitle}>Booking Details</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Villa:</Text>
          <Text>{villaName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Check-in:</Text>
          <Text>{format(new Date(checkInDate), 'MMM d, yyyy')}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Check-out:</Text>
          <Text>{format(new Date(checkOutDate), 'MMM d, yyyy')}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Nights:</Text>
          <Text>{nights}</Text>
        </View>
      </View>

      {/* Invoice Items */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Invoice Items</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCol, { flex: 3 }]}>Description</Text>
            <Text style={[styles.tableCol, styles.tableColRight]}>Quantity</Text>
            <Text style={[styles.tableCol, styles.tableColRight]}>Unit Price</Text>
            <Text style={[styles.tableCol, styles.tableColRight]}>Amount</Text>
          </View>
          
          {/* Table Rows */}
          {items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCol, { flex: 3 }]}>{item.description}</Text>
              <Text style={[styles.tableCol, styles.tableColRight]}>{item.quantity}</Text>
              <Text style={[styles.tableCol, styles.tableColRight]}>
                ₹{item.unitPrice.toLocaleString('en-IN')}
              </Text>
              <Text style={[styles.tableCol, styles.tableColRight]}>
                ₹{item.amount.toLocaleString('en-IN')}
              </Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totalRow}>
          <View style={{ width: 300 }}>
            <View style={styles.row}>
              <Text style={[styles.label, { textAlign: 'right', width: 200 }]}>Subtotal:</Text>
              <Text style={styles.totalValue}>₹{subtotal.toLocaleString('en-IN')}</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.label, { textAlign: 'right', width: 200 }]}>
                Tax ({taxRate}%):
              </Text>
              <Text style={styles.totalValue}>₹{taxAmount.toLocaleString('en-IN')}</Text>
            </View>
            <View style={[styles.row, { marginTop: 5, borderTop: '1px solid #e5e7eb', paddingTop: 5 }]}>
              <Text style={[styles.label, { textAlign: 'right', width: 200, fontSize: 14 }]}>
                Total:
              </Text>
              <Text style={[styles.totalValue, { fontSize: 14 }]}>
                ₹{total.toLocaleString('en-IN')}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Payment Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Information</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Payment Method:</Text>
          <Text>{paymentMethod}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Payment Status:</Text>
          <Text>{paymentStatus}</Text>
        </View>
        {paymentId && (
          <View style={styles.row}>
            <Text style={styles.label}>Payment ID:</Text>
            <Text>{paymentId}</Text>
          </View>
        )}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>
          This is a computer-generated invoice. For any queries, please contact us at
          bookings@dolcevitapushkar.com or call +91 87420 00006
        </Text>
      </View>
    </Page>
  </Document>
);

// Helper function to generate and download invoice
export const generateAndDownloadInvoice = async (
  invoiceData: Omit<InvoiceProps, 'invoiceNumber' | 'bookingDate'>
): Promise<{ invoiceNumber: string; status: string }> => {
  try {
    // Generate a unique invoice number
    const invoiceNumber = `DV-${format(new Date(), 'yyyyMMdd')}-${Math.floor(1000 + Math.random() * 9000)}`;
    const bookingDate = new Date();

    // Calculate the number of nights
    const checkIn = new Date(invoiceData.checkInDate);
    const checkOut = new Date(invoiceData.checkOutDate);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));

    // Calculate the nightly rate
    const nightlyRate = Math.round(invoiceData.total / nights);

    // Define invoice items
    const items: InvoiceItem[] = [
      {
        description: `${invoiceData.villaName} - ${nights} night${nights > 1 ? 's' : ''} (${format(checkIn, 'MMM d, yyyy')} - ${format(checkOut, 'MMM d, yyyy')})`,
        quantity: nights,
        unitPrice: nightlyRate,
        amount: invoiceData.total,
      },
    ];

    // Calculate subtotal, tax, and total
    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const taxRate = 18; // 18% GST
    const taxAmount = Math.round(subtotal * (taxRate / 100));
    const total = Math.round(subtotal + taxAmount);

    // Import pdf dynamically to avoid SSR issues
    const { pdf } = await import('@react-pdf/renderer');

    // Create the PDF document
    const pdfDoc = (
      <InvoiceDocument
        invoiceNumber={invoiceNumber}
        bookingDate={bookingDate}
        customerName={invoiceData.customerName}
        customerEmail={invoiceData.customerEmail}
        customerPhone={invoiceData.customerPhone}
        villaName={invoiceData.villaName}
        checkInDate={invoiceData.checkInDate}
        checkOutDate={invoiceData.checkOutDate}
        nights={nights}
        items={items}
        subtotal={subtotal}
        taxRate={taxRate}
        taxAmount={taxAmount}
        total={total}
        paymentMethod={invoiceData.paymentMethod}
        paymentStatus={invoiceData.paymentStatus}
        paymentId={invoiceData.paymentId}
      />
    );

    // Generate PDF blob
    const blob = await pdf(pdfDoc).toBlob();
    const url = URL.createObjectURL(blob);

    // Create and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice-${invoiceNumber}.pdf`;

    // Clean up the URL after download
    link.onload = () => {
      setTimeout(() => URL.revokeObjectURL(url), 100);
    };

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return {
      invoiceNumber,
      status: 'success',
    };
  } catch (error) {
    console.error('Error generating invoice:', error);
    throw new Error('Failed to generate invoice');
  }
};

export default InvoiceDocument;
