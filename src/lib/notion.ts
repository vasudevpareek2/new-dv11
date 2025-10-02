// Notion integration has been removed

// Types for date handling
export interface BlockedDate {
  start: string;
  end: string;
  status: string;
}

interface Booking {
  checkIn: string;
  checkOut: string;
}

// Stub implementations that return empty data
export async function getBlockedDates(villaId: string): Promise<{ from: Date; to: Date }[]> {
  console.log(`[Stub] Getting blocked dates for villa: ${villaId}`);
  return [];
}

export async function getBookedDates(
  villaId: string,
  startDate: string,
  endDate: string
): Promise<Booking[]> {
  console.log(`[Stub] Getting bookings for villa ${villaId} from ${startDate} to ${endDate}`);
  return [];
}

export async function isDateRangeAvailable(
  villaId: string,
  checkIn: string,
  checkOut: string
): Promise<boolean> {
  console.log(`[Stub] Checking availability for villa ${villaId} from ${checkIn} to ${checkOut}`);
  return true; // Always return true since we're not checking against any database
}
