'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { generateAndDownloadInvoice } from '@/lib/invoiceGenerator';
import { format, addDays } from 'date-fns';
import { FiDownload, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

export const InvoiceDemo: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState<string | null>(null);

  const handleGenerateInvoice = async () => {
    try {
      setIsGenerating(true);
      setError(null);
      setSuccess(false);
      setInvoiceNumber(null);

      // Example booking data - replace with actual data from your booking system
      const checkInDate = new Date();
      const checkOutDate = addDays(checkInDate, 3); // 3 nights stay
      const nights = 3;
      const basePrice = 15000; // Per night
      const subtotal = basePrice * nights;
      const taxRate = 18; // 18% GST
      const taxAmount = Math.round((subtotal * taxRate) / 100);
      const total = subtotal + taxAmount;

      const items = [
        {
          description: `Luxury Pool Villa (${nights} nights)`,
          quantity: 1,
          unitPrice: basePrice,
          amount: subtotal,
        },
      ];

      const invoiceData = {
        customerName: 'John Doe',
        customerEmail: 'john.doe@example.com',
        customerPhone: '+91 98765 43210',
        villaName: 'Luxury Pool Villa',
        checkInDate: format(checkInDate, 'yyyy-MM-dd'),
        checkOutDate: format(checkOutDate, 'yyyy-MM-dd'),
        nights,
        items,
        subtotal,
        taxRate,
        taxAmount,
        total,
        paymentMethod: 'Razorpay UPI',
        paymentStatus: 'Paid' as const,
        paymentId: 'pay_' + Math.random().toString(36).substring(2, 15),
      };

      // @ts-ignore - We know the data matches the expected interface
      const result = await generateAndDownloadInvoice(invoiceData);

      setSuccess(true);
      setInvoiceNumber(result.invoiceNumber);
    } catch (err) {
      console.error('Error generating invoice:', err);
      setError('Failed to generate invoice. ' + (err instanceof Error ? err.message : 'Please try again.'));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Invoice Generator</h1>
        <p className="text-gray-600">Generate professional invoices for your villa bookings</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
            <FiDownload className="mr-2" /> Example Booking
          </h3>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span className="text-gray-600">Customer:</span>
              <span className="font-medium">John Doe</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Villa:</span>
              <span className="font-medium">Luxury Pool Villa</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Stay:</span>
              <div className="text-right">
                <div>{format(new Date(), 'MMM d, yyyy')} - {format(addDays(new Date(), 3), 'MMM d, yyyy')}</div>
                <div className="text-xs text-gray-500">(3 nights)</div>
              </div>
            </div>
            <div className="flex justify-between pt-2 mt-2 border-t border-blue-100">
              <span className="text-gray-600 font-medium">Total:</span>
              <span className="text-lg font-bold text-blue-700">₹45,000</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Invoice Preview</h3>
          <div className="h-full flex flex-col justify-between">
            <div className="space-y-2 text-sm text-gray-700">
              <p>Your invoice will include:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Company logo and details</li>
                <li>Customer information</li>
                <li>Booking details and dates</li>
                <li>Itemized charges</li>
                <li>Tax calculations</li>
                <li>Payment information</li>
              </ul>
            </div>
            <div className="mt-4">
              <Button 
                onClick={handleGenerateInvoice} 
                disabled={isGenerating}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-sm hover:shadow-md flex items-center justify-center"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <FiDownload className="mr-2" />
                    Generate Sample Invoice
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r">
          <div className="flex">
            <div className="flex-shrink-0">
              <FiAlertCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error generating invoice</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r">
          <div className="flex">
            <div className="flex-shrink-0">
              <FiCheckCircle className="h-5 w-5 text-green-500" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Invoice generated successfully!</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>
                  Your invoice {invoiceNumber ? `(#${invoiceNumber})` : ''} has been generated and downloaded.
                  {invoiceNumber && (
                    <span className="block mt-1 text-green-600">
                      The file has been saved as: <span className="font-mono">Invoice-{invoiceNumber}.pdf</span>
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Integration Guide</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-1">1. Install Dependencies</h4>
              <div className="bg-gray-800 text-green-400 p-3 rounded font-mono text-sm overflow-x-auto">
                npm install @react-pdf/renderer date-fns
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 mb-1">2. Basic Usage</h4>
              <pre className="bg-gray-800 text-gray-200 p-3 rounded text-sm overflow-x-auto">
                {`import { generateAndDownloadInvoice } from '@/lib/invoiceGenerator';

// Call this function after successful payment
await generateAndDownloadInvoice({
  customerName: 'John Doe',
  customerEmail: 'john@example.com',
  customerPhone: '+91 98765 43210',
  villaName: 'Luxury Pool Villa',
  checkInDate: '2023-12-15',
  checkOutDate: '2023-12-18',
  paymentMethod: 'Razorpay UPI',
  paymentId: 'pay_1234567890',
  amountPaid: 45000,
});`}
              </pre>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 mb-1">3. Customization</h4>
              <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
                <li>Update company details in <code className="bg-gray-100 px-1 py-0.5 rounded">invoiceGenerator.ts</code></li>
                <li>Modify the invoice template in the <code className="bg-gray-100 px-1 py-0.5 rounded">InvoiceDocument</code> component</li>
                <li>Add your company logo by updating the image path</li>
                <li>Adjust tax rates and calculations as needed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDemo;
