import { pdf } from '@react-pdf/renderer';
import { InvoiceItem } from '@/components/invoices/VillaInvoice';
import { format } from 'date-fns';

// Type for the VillaInvoice component props
export interface VillaInvoiceProps {
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

interface GenerateInvoiceProps {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  villaName: string;
  checkInDate: string;
  checkOutDate: string;
  paymentMethod: string;
  paymentId: string;
  amountPaid: number;
  onDownloadStart?: () => void;
  onDownloadSuccess?: () => void;
  onDownloadError?: (error: Error) => void;
}

/**
 * Generates a PDF invoice for a villa booking
 * @param props Booking details for the invoice
 * @returns A React element that triggers the download when rendered
 */
export const generateInvoice = async ({
  customerName,
  customerEmail,
  customerPhone,
  villaName,
  checkInDate,
  checkOutDate,
  paymentMethod,
  paymentId,
  amountPaid,
  onDownloadStart,
  onDownloadSuccess,
  onDownloadError,
}: GenerateInvoiceProps) => {
  try {
    // Generate a unique invoice number
    const invoiceNumber = `DV-${format(new Date(), 'yyyyMMdd')}-${Math.floor(1000 + Math.random() * 9000)}`;
    const bookingDate = new Date().toISOString();
    
    // Calculate the number of nights
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    
    // Calculate the nightly rate
    const nightlyRate = Math.round(amountPaid / nights);
    
    // Define invoice items
    const items: InvoiceItem[] = [
      {
        description: `${villaName} - ${nights} night${nights > 1 ? 's' : ''} (${format(checkIn, 'MMM d, yyyy')} - ${format(checkOut, 'MMM d, yyyy')})`,
        amount: nightlyRate * nights,
      },
    ];
    
    // Calculate subtotal, tax, and total
    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const taxRate = 18; // 18% GST
    const total = subtotal * (1 + taxRate / 100);
    
    // Dynamically import the VillaInvoice component to avoid SSR issues
    const { default: VillaInvoice } = await import('@/components/invoices/VillaInvoice');
    
    // Create the PDF document
    const InvoiceDoc = (
      <VillaInvoice
        invoiceNumber={invoiceNumber}
        bookingDate={bookingDate}
        customerName={customerName}
        customerEmail={customerEmail}
        customerPhone={customerPhone}
        villaName={villaName}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        paymentMethod={paymentMethod}
        paymentId={paymentId}
        items={items}
        subtotal={subtotal}
        taxRate={taxRate}
        total={total}
      />
    );
    
    // Generate PDF blob
    const pdfBlob = await pdf(InvoiceDoc).toBlob();
    const pdfUrl = URL.createObjectURL(pdfBlob);
    
    // Return the download link component
    return (
      <a
        href={pdfUrl}
        download={`Invoice-${invoiceNumber}.pdf`}
        style={{ display: 'none' }}
        onClick={() => {
          onDownloadStart?.();
          // Clean up the URL after download starts
          setTimeout(() => URL.revokeObjectURL(pdfUrl), 100);
        }}
        onLoad={() => onDownloadSuccess?.()}
        onError={(e) => onDownloadError?.(e as Error)}
      >
        Download Invoice
      </a>
    );
  } catch (error) {
    console.error('Error generating invoice:', error);
    onDownloadError?.(error as Error);
    throw error;
  }
};

/**
 * Utility function to trigger invoice download programmatically
 * @param props Booking details for the invoice
 * @returns A promise that resolves when the download is complete
 */
export const downloadInvoice = async (props: Omit<GenerateInvoiceProps, 'onDownloadStart' | 'onDownloadSuccess' | 'onDownloadError'>) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      // Generate a unique invoice number
      const invoiceNumber = `DV-${format(new Date(), 'yyyyMMdd')}-${Math.floor(1000 + Math.random() * 9000)}`;
      
      // Calculate the number of nights
      const checkIn = new Date(props.checkInDate);
      const checkOut = new Date(props.checkOutDate);
      const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      
      // Calculate the nightly rate
      const nightlyRate = Math.round(props.amountPaid / nights);
      
      // Define invoice items
      const items: InvoiceItem[] = [
        {
          description: `${props.villaName} - ${nights} night${nights > 1 ? 's' : ''} (${format(checkIn, 'MMM d, yyyy')} - ${format(checkOut, 'MMM d, yyyy')})`,
          amount: nightlyRate * nights,
        },
      ];
      
      // Calculate subtotal, tax, and total
      const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
      const taxRate = 18; // 18% GST
      const total = subtotal * (1 + taxRate / 100);
      
      // Dynamically import the required modules
      const { default: VillaInvoice } = await import('@/components/invoices/VillaInvoice');
      const { pdf } = await import('@react-pdf/renderer');
      
      // Create the PDF document
      const InvoiceDoc = (
        <VillaInvoice
          invoiceNumber={invoiceNumber}
          bookingDate={new Date().toISOString()}
          customerName={props.customerName}
          customerEmail={props.customerEmail}
          customerPhone={props.customerPhone}
          villaName={props.villaName}
          checkInDate={props.checkInDate}
          checkOutDate={props.checkOutDate}
          paymentMethod={props.paymentMethod}
          paymentId={props.paymentId}
          items={items}
          subtotal={subtotal}
          taxRate={taxRate}
          total={total}
        />
      );
      
      // Generate PDF blob
      const blob = await pdf(InvoiceDoc).toBlob();
      const url = URL.createObjectURL(blob);
      
      // Create and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = `Invoice-${invoiceNumber}.pdf`;
      link.style.display = 'none';
      
      link.onload = () => {
        URL.revokeObjectURL(url);
        resolve();
      };
      
      link.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Failed to download invoice'));
      };
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Error generating invoice:', error);
      reject(error);
    }
  });
};
