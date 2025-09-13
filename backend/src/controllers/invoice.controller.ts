import { Request, Response } from 'express';
import { invoiceService } from '../services/invoice.service';

export class InvoiceController {
  async generateInvoice(req: Request, res: Response) {
    try {
      const {
        customerName,
        customerEmail,
        customerPhone,
        villaName,
        checkInDate,
        checkOutDate,
        nights,
        basePrice,
        taxRate = 18, // Default 18% tax if not provided
        totalAmount,
        paymentMethod = 'Online',
        paymentStatus = 'paid',
        additionalServices = [],
      } = req.body;

      // Validate required fields
      if (!customerName || !customerEmail || !villaName || !checkInDate || !checkOutDate || !nights || !totalAmount) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields',
        });
      }

      // Generate the PDF
      const pdfBuffer = await invoiceService.generateInvoicePdf({
        bookingId: `BOOK-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        customerName,
        customerEmail,
        customerPhone: customerPhone || 'Not provided',
        villaName,
        checkInDate,
        checkOutDate,
        nights: Number(nights),
        basePrice: Number(basePrice) || 0,
        taxRate: Number(taxRate),
        totalAmount: Number(totalAmount),
        paymentMethod,
        paymentStatus,
        additionalServices: Array.isArray(additionalServices) ? additionalServices : []
      });

      // Set response headers for PDF download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');
      
      // Send the PDF buffer as response
      res.send(pdfBuffer);
    } catch (error) {
      console.error('Error generating invoice:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to generate invoice',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
  
  private handleError(res: Response, error: unknown) {
    console.error('Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({
      success: false,
      message: 'An error occurred',
      error: errorMessage,
    });
  }
}

export const invoiceController = new InvoiceController();
