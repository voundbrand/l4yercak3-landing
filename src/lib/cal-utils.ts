export interface TimeSlot {
  time: string;
  startTime: Date;
  endTime: Date;
  originalStartTime: string;
  originalEndTime?: string;
}

export interface BookingData {
  name: string;
  email: string;
  phone?: string;
  notes?: string;
  startTime: string;
  endTime: string;
  timeZone: string;
  location?: string;
}

export const OPEN_END_MEETING_SLUG = 'open-end-meeting';
export const CAL_USERNAME = 'voundbrand';

export const locationOptions = [
  { value: 'integrations:daily', label: 'Cal Video' },
  { value: 'integrations:google:meet', label: 'Google Meet' },
  { value: 'integrations:zoom', label: 'Zoom' },
  { value: 'integrations:office365_video', label: 'MS Teams' },
];

export async function fetchAvailableSlots(
  selectedDate: Date,
  duration: number = 30,
  timeZone: string = 'Europe/Berlin'
): Promise<TimeSlot[]> {
  try {
    const startDate = new Date(selectedDate);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(selectedDate);
    endDate.setHours(23, 59, 59, 999);

    const response = await fetch(
      `/api/cal/slots?` +
        new URLSearchParams({
          eventTypeSlug: OPEN_END_MEETING_SLUG,
          usernameList: CAL_USERNAME,
          startTime: startDate.toISOString(),
          endTime: endDate.toISOString(),
          timeZone: timeZone,
          duration: String(duration),
        })
    );

    if (!response.ok) {
      console.error('Failed to fetch slots:', response.status);
      return [];
    }

    const data = await response.json();
    const slots: TimeSlot[] = [];

    if (data.data && Array.isArray(data.data)) {
      data.data.forEach((slot: { time: string }) => {
        const startTime = new Date(slot.time);
        const endTime = new Date(startTime.getTime() + duration * 60 * 1000);

        const displayTime = startTime.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          timeZone: timeZone,
        });

        slots.push({
          time: displayTime,
          startTime,
          endTime,
          originalStartTime: slot.time,
          originalEndTime: endTime.toISOString(),
        });
      });
    }

    return slots.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
  } catch (error) {
    console.error('Error fetching slots:', error);
    return [];
  }
}

export async function fetchMonthAvailability(
  year: number,
  month: number,
  duration: number = 30,
  timeZone: string = 'Europe/Berlin'
): Promise<Set<number>> {
  try {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    endDate.setHours(23, 59, 59, 999);

    const response = await fetch(
      `/api/cal/slots?` +
        new URLSearchParams({
          eventTypeSlug: OPEN_END_MEETING_SLUG,
          usernameList: CAL_USERNAME,
          startTime: startDate.toISOString(),
          endTime: endDate.toISOString(),
          timeZone: timeZone,
          duration: String(duration),
        })
    );

    if (!response.ok) {
      console.error('Failed to fetch month availability:', response.status);
      return new Set();
    }

    const data = await response.json();
    const availableDays = new Set<number>();

    if (data.data && Array.isArray(data.data)) {
      data.data.forEach((slot: { time: string }) => {
        const slotDate = new Date(slot.time);
        // Get the date parts in the user's selected timezone
        const dateInTimezone = new Date(slotDate.toLocaleString('en-US', { timeZone }));
        const slotMonth = dateInTimezone.getMonth();
        const slotYear = dateInTimezone.getFullYear();
        const slotDay = dateInTimezone.getDate();

        if (slotMonth === month && slotYear === year) {
          availableDays.add(slotDay);
        }
      });
    }

    return availableDays;
  } catch (error) {
    console.error('Error fetching month availability:', error);
    return new Set();
  }
}

export async function createBooking(bookingData: BookingData) {
  try {
    const response = await fetch('/api/cal/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create booking');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
}