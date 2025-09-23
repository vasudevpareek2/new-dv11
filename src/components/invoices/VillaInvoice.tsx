import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { format } from 'date-fns';

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 15,
  },
  logo: {
    width: 150,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1a365d',
  },
  subtitle: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 5,
  },
  section: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  col: {
    flex: 1,
  },
  label: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 2,
  },
  value: {
    fontSize: 12,
    marginBottom: 8,
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginTop: 10,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tableCol: {
    padding: 8,
    flex: 1,
  },
  tableHeaderText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  tableCell: {
    fontSize: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  totalBox: {
    width: '30%',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10,
  },
  totalLabel: {
    fontSize: 12,
    textAlign: 'right',
    marginBottom: 5,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#1a365d',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    fontSize: 10,
    color: '#999999',
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10,
  },
});

export interface InvoiceItem {
  description: string;
  amount: number;
}

interface VillaInvoiceProps {
  invoiceNumber: string;
  bookingDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  villaName: string;
  checkInDate: string;
  checkOutDate: string;
  paymentMethod: string;
  paymentId: string;
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  total: number;
}

const VillaInvoice: React.FC<VillaInvoiceProps> = ({
  invoiceNumber,
  bookingDate,
  customerName,
  customerEmail,
  customerPhone,
  villaName,
  checkInDate,
  checkOutDate,
  paymentMethod,
  paymentId,
  items,
  subtotal,
  taxRate,
  total,
}) => {
  // Format dates
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  // Calculate tax amount
  const taxAmount = (subtotal * taxRate) / 100;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>INVOICE</Text>
          <Text style={styles.subtitle}>Invoice #{invoiceNumber}</Text>
          <Text style={styles.subtitle}>Booking Date: {formatDate(bookingDate)}</Text>
        </View>

        {/* Company and Customer Info */}
        <View style={[styles.row, { marginBottom: 30 }]}>
          <View style={[styles.col, { marginRight: 20 }]}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 5 }}>Billed To:</Text>
            <Text style={styles.value}>{customerName}</Text>
            <Text style={styles.value}>{customerEmail}</Text>
            <Text style={styles.value}>{customerPhone}</Text>
          </View>
          <View style={styles.col}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 5 }}>Dolce Vita Pushkar</Text>
            <Text style={styles.value}>123 Villa Street, Pushkar</Text>
            <Text style={styles.value}>Rajasthan, India 305022</Text>
            <Text style={styles.value}>+91 87420 00006</Text>
            <Text style={styles.value}>bookings@dolcevitapushkar.com</Text>
          </View>
        </View>

        {/* Booking Details */}
        <View style={styles.section}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}>Booking Details</Text>
          <View style={styles.row}>
            <View style={[styles.col, { marginRight: 20 }]}>
              <Text style={styles.label}>Villa Name</Text>
              <Text style={styles.value}>{villaName}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>Booking Reference</Text>
              <Text style={styles.value}>DV-{invoiceNumber}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={[styles.col, { marginRight: 20 }]}>
              <Text style={styles.label}>Check-in Date</Text>
              <Text style={styles.value}>{formatDate(checkInDate)}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>Check-out Date</Text>
              <Text style={styles.value}>{formatDate(checkOutDate)}</Text>
            </View>
          </View>
        </View>

        {/* Invoice Items */}
        <View style={styles.section}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}>Invoice Details</Text>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <View style={[styles.tableCol, { flex: 3 }]}>
                <Text style={styles.tableHeaderText}>Description</Text>
              </View>
              <View style={[styles.tableCol, { alignItems: 'flex-end' }]}>
                <Text style={styles.tableHeaderText}>Amount (₹)</Text>
              </View>
            </View>
            
            {/* Table Rows */}
            {items.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={[styles.tableCol, { flex: 3 }]}>
                  <Text style={styles.tableCell}>{item.description}</Text>
                </View>
                <View style={[styles.tableCol, { alignItems: 'flex-end' }]}>
                  <Text style={styles.tableCell}>{item.amount.toLocaleString('en-IN')}</Text>
                </View>
              </View>
            ))}
            
            {/* Subtotal */}
            <View style={[styles.tableRow, { backgroundColor: '#f9f9f9' }]}>
              <View style={[styles.tableCol, { flex: 3, textAlign: 'right' }]}>
                <Text style={[styles.tableCell, { textAlign: 'right' }]}>Subtotal:</Text>
              </View>
              <View style={[styles.tableCol, { alignItems: 'flex-end' }]}>
                <Text style={styles.tableCell}>₹{subtotal.toLocaleString('en-IN')}</Text>
              </View>
            </View>
            
            {/* Tax */}
            <View style={[styles.tableRow, { backgroundColor: '#f9f9f9' }]}>
              <View style={[styles.tableCol, { flex: 3, textAlign: 'right' }]}>
                <Text style={[styles.tableCell, { textAlign: 'right' }]}>Tax ({taxRate}%):</Text>
              </View>
              <View style={[styles.tableCol, { alignItems: 'flex-end' }]}>
                <Text style={styles.tableCell}>₹{taxAmount.toFixed(2)}</Text>
              </View>
            </View>
            
            {/* Total */}
            <View style={[styles.tableRow, { backgroundColor: '#f0f5ff' }]}>
              <View style={[styles.tableCol, { flex: 3 }]}>
                <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Total Amount:</Text>
              </View>
              <View style={[styles.tableCol, { alignItems: 'flex-end' }]}>
                <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>₹{total.toLocaleString('en-IN')}</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Payment Details */}
        <View style={styles.section}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}>Payment Information</Text>
          <View style={styles.row}>
            <View style={[styles.col, { marginRight: 20 }]}>
              <Text style={styles.label}>Payment Method</Text>
              <Text style={styles.value}>{paymentMethod}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>Transaction ID</Text>
              <Text style={styles.value}>{paymentId}</Text>
            </View>
          </View>
          <View style={[styles.row, { marginTop: 10 }]}>
            <View style={[styles.col, { marginRight: 20 }]}>
              <Text style={styles.label}>Payment Status</Text>
              <Text style={[styles.value, { color: '#10B981' }]}>PAID</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>Payment Date</Text>
              <Text style={styles.value}>{formatDate(bookingDate)}</Text>
            </View>
          </View>
        </View>
        
        {/* Footer */}
        <View style={styles.footer}>
          <Text>This is a computer-generated invoice. For any queries, please contact us at bookings@dolcevitapushkar.com or call +91 87420 00006</Text>
        </View>
      </Page>
    </Document>
  );
};

export default VillaInvoice;
