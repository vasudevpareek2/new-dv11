import { v4 as uuidv4 } from 'uuid';
import PDFDocument from 'pdfkit';

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  bookingId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  villaName: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  basePrice: number;
  taxRate: number;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  bookingDate: string;
  additionalServices?: Array<{ description: string; price: number }>;
}

// Simple PDF generation function
const generatePdf = (invoiceData: InvoiceData): Promise<Buffer> => {
  return new Promise((resolve) => {
    const doc = new PDFDocument();
    const chunks: Buffer[] = [];

    doc.on('data', (chunk: Buffer) => chunks.push(chunk));
    doc.on('end', () => {
      const result = Buffer.concat(chunks);
      resolve(result);
    });

    // Add content to PDF
    doc.fontSize(20).text('INVOICE', { align: 'center' });
    doc.moveDown();
    
    // Invoice details
    doc.fontSize(12)
      .text(`Invoice #: ${invoiceData.invoiceNumber}`, { align: 'left' })
      .text(`Date: ${new Date().toLocaleDateString()}`, { align: 'left' })
      .moveDown();

    // Customer details
    doc.fontSize(14).text('Customer Details:', { underline: true });
    doc.fontSize(12)
      .text(`Name: ${invoiceData.customerName}`)
      .text(`Email: ${invoiceData.customerEmail}`)
      .text(`Phone: ${invoiceData.customerPhone || 'Not provided'}`)
      .moveDown();

    // Booking details
    doc.fontSize(14).text('Booking Details:', { underline: true });
    doc.fontSize(12)
      .text(`Villa: ${invoiceData.villaName}`)
      .text(`Check-in: ${invoiceData.checkInDate}`)
      .text(`Check-out: ${invoiceData.checkOutDate}`)
      .text(`Nights: ${invoiceData.nights}`)
      .moveDown();

    // Charges table
    doc.fontSize(14).text('Charges:', { underline: true });
    
    // Simple table for charges
    const tableTop = doc.y;
    const itemCodeX = 50;
    const descriptionX = 150;
    const qtyX = 300;
    const priceX = 350;
    const amountX = 450;

    // Table header
    doc.font('Helvetica-Bold')
      .fontSize(10)
      .text('Item', itemCodeX, tableTop)
      .text('Description', descriptionX, tableTop)
      .text('Qty', qtyX, tableTop)
      .text('Price', priceX, tableTop)
      .text('Amount', amountX, tableTop);
    
    // Table rows
    let y = tableTop + 25;
    doc.font('Helvetica').fontSize(10);
    
    // Main booking item
    doc.text('1', itemCodeX, y)
      .text(`${invoiceData.villaName} - ${invoiceData.nights} nights`, descriptionX, y)
      .text('1', qtyX, y)
      .text(`$${invoiceData.basePrice.toFixed(2)}`, priceX, y)
      .text(`$${(invoiceData.basePrice * invoiceData.nights).toFixed(2)}`, amountX, y);
    
    y += 20;
    
    // Additional services
    if (invoiceData.additionalServices?.length) {
      let itemNumber = 2;
      for (const service of invoiceData.additionalServices) {
        doc.text(itemNumber.toString(), itemCodeX, y)
          .text(service.description, descriptionX, y)
          .text('1', qtyX, y)
          .text(`$${service.price.toFixed(2)}`, priceX, y)
          .text(`$${service.price.toFixed(2)}`, amountX, y);
        y += 20;
        itemNumber++;
      }
    }
    
    // Calculate totals
    const taxAmount = (invoiceData.totalAmount * invoiceData.taxRate) / 100;
    const subtotal = invoiceData.totalAmount - taxAmount;
    
    doc.moveTo(50, y + 20).lineTo(550, y + 20).stroke();
    
    doc.font('Helvetica-Bold')
      .text('Subtotal:', priceX - 50, y + 30)
      .text(`$${subtotal.toFixed(2)}`, amountX, y + 30);
      
    doc.text(`Tax (${invoiceData.taxRate}%):`, priceX - 50, y + 50)
      .text(`$${taxAmount.toFixed(2)}`, amountX, y + 50);
      
    doc.text('Total:', priceX - 50, y + 80, { underline: true })
      .text(`$${invoiceData.totalAmount.toFixed(2)}`, amountX, y + 80, { underline: true });
    
    // Footer
    doc.font('Helvetica')
      .fontSize(10)
      .text('Thank you for your booking!', 50, y + 120, { align: 'center' });
    
    doc.end();
  });
};

export class InvoiceService {
  async generateInvoicePdf(bookingData: Omit<InvoiceData, 'invoiceNumber' | 'bookingDate'>): Promise<Buffer> {
    try {
      // Generate invoice data
      const invoiceData: InvoiceData = {
        ...bookingData,
        invoiceNumber: `INV-${Date.now()}`,
        bookingDate: new Date().toISOString(),
        paymentMethod: bookingData.paymentMethod || 'Credit Card',
        paymentStatus: bookingData.paymentStatus || 'Paid'
      };

      // Generate and return the PDF
      return generatePdf(invoiceData);
    } catch (error) {
      console.error('Error generating invoice PDF:', error);
      throw new Error('Failed to generate invoice PDF');
    }
  }
}

export const invoiceService = new InvoiceService();
