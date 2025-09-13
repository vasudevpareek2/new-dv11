import { format } from 'date-fns';
import { InvoiceItem, InvoiceProps } from '@/components/invoices/InvoiceGenerator';

export const generateInvoiceNumber = (): string => {
  return `DV-${format(new Date(), 'yyyyMMdd')}-${Math.floor(1000 + Math.random() * 9000)}`;
};

export const calculateNights = (checkInDate: string, checkOutDate: string): number => {
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
};

export const calculateInvoiceItems = (
  villaName: string,
  checkInDate: string,
  checkOutDate: string,
  totalAmount: number
): { items: InvoiceItem[]; subtotal: number; taxRate: number; taxAmount: number; total: number } => {
  const nights = calculateNights(checkInDate, checkOutDate);
  const nightlyRate = Math.round(totalAmount / nights);
  const subtotal = totalAmount;
  const taxRate = 18; // 18% GST
  const taxAmount = Math.round(subtotal * (taxRate / 100));
  const total = subtotal + taxAmount;

  const items: InvoiceItem[] = [
    {
      description: `${villaName} - ${nights} night${nights > 1 ? 's' : ''} (${format(new Date(checkInDate), 'MMM d, yyyy')} - ${format(new Date(checkOutDate), 'MMM d, yyyy')})`,
      quantity: nights,
      unitPrice: nightlyRate,
      amount: totalAmount,
    },
  ];

  return {
    items,
    subtotal,
    taxRate,
    taxAmount,
    total,
  };
};

export const prepareInvoiceData = (
  bookingData: Omit<InvoiceProps, 'invoiceNumber' | 'bookingDate' | 'items' | 'subtotal' | 'taxRate' | 'taxAmount' | 'total'>
): Omit<InvoiceProps, 'invoiceNumber' | 'bookingDate'> => {
  const { checkInDate, checkOutDate, villaName, total } = bookingData;
  
  const { items, subtotal, taxRate, taxAmount } = calculateInvoiceItems(
    villaName,
    checkInDate,
    checkOutDate,
    total
  );

  return {
    ...bookingData,
    items,
    subtotal,
    taxRate,
    taxAmount,
    total: subtotal + taxAmount,
  };
};
