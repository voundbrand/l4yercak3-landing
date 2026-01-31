'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { fetchAvailableSlots, fetchMonthAvailability, createBooking, locationOptions, type TimeSlot, type BookingData } from '@/lib/cal-utils';

// Icons
const XIcon = ({ className }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L8 6.79289L3.85355 2.14645C3.65829 1.95118 3.34171 1.95118 3.14645 2.14645C2.95118 2.34171 2.95118 2.65829 3.14645 2.85355L7.29289 8L3.14645 12.1464C2.95118 12.3417 2.95118 12.6583 3.14645 12.8536C3.34171 13.0488 3.65829 13.0488 3.85355 12.8536L8 8.70711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.70711 8L12.8536 3.85355Z" fill="currentColor"/>
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12.5 2.5H11V1.5C11 1.22386 10.7761 1 10.5 1C10.2239 1 10 1.22386 10 1.5V2.5H6V1.5C6 1.22386 5.77614 1 5.5 1C5.22386 1 5 1.22386 5 1.5V2.5H3.5C2.67157 2.5 2 3.17157 2 4V12.5C2 13.3284 2.67157 14 3.5 14H12.5C13.3284 14 14 13.3284 14 12.5V4C14 3.17157 13.3284 2.5 12.5 2.5ZM13 12.5C13 12.7761 12.7761 13 12.5 13H3.5C3.22386 13 3 12.7761 3 12.5V6H13V12.5ZM13 5H3V4C3 3.72386 3.22386 3.5 3.5 3.5H5V4.5C5 4.77614 5.22386 5 5.5 5C5.77614 5 6 4.77614 6 4.5V3.5H10V4.5C10 4.77614 10.2239 5 10.5 5C10.7761 5 11 4.77614 11 4.5V3.5H12.5C12.7761 3.5 13 3.72386 13 4V5Z" fill="currentColor"/>
  </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1ZM8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14ZM8.5 4.5C8.5 4.22386 8.27614 4 8 4C7.72386 4 7.5 4.22386 7.5 4.5V8C7.5 8.13261 7.55268 8.25979 7.64645 8.35355L10.1464 10.8536C10.3417 11.0488 10.6583 11.0488 10.8536 10.8536C11.0488 10.6583 11.0488 10.3417 10.8536 10.1464L8.5 7.79289V4.5Z" fill="currentColor"/>
  </svg>
);

const GlobeIcon = ({ className }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1ZM2 8C2 7.26 2.14 6.55 2.39 5.9L5 8.5V9.5C5 10.05 5.45 10.5 6 10.5V12.74C3.66 12.02 2 9.72 2 8ZM12.41 11.87C12.28 11.38 11.84 11 11.33 11H10.5V9C10.5 8.72 10.28 8.5 10 8.5H6V7.5H7C7.28 7.5 7.5 7.28 7.5 7V6H8.5C9.05 6 9.5 5.55 9.5 5V4.59C11.92 5.35 13.67 7.48 13.96 10.04C13.52 10.73 12.99 11.35 12.41 11.87Z" fill="currentColor"/>
  </svg>
);

// Common timezones with friendly labels
const timezoneOptions = [
  { value: 'Europe/Berlin', label: 'CET (Berlin)', offset: '+1/+2' },
  { value: 'Europe/London', label: 'GMT (London)', offset: '+0/+1' },
  { value: 'Europe/Paris', label: 'CET (Paris)', offset: '+1/+2' },
  { value: 'Europe/Amsterdam', label: 'CET (Amsterdam)', offset: '+1/+2' },
  { value: 'Europe/Zurich', label: 'CET (Zurich)', offset: '+1/+2' },
  { value: 'Europe/Vienna', label: 'CET (Vienna)', offset: '+1/+2' },
  { value: 'America/New_York', label: 'EST (New York)', offset: '-5/-4' },
  { value: 'America/Chicago', label: 'CST (Chicago)', offset: '-6/-5' },
  { value: 'America/Denver', label: 'MST (Denver)', offset: '-7/-6' },
  { value: 'America/Los_Angeles', label: 'PST (Los Angeles)', offset: '-8/-7' },
  { value: 'America/Toronto', label: 'EST (Toronto)', offset: '-5/-4' },
  { value: 'Asia/Dubai', label: 'GST (Dubai)', offset: '+4' },
  { value: 'Asia/Singapore', label: 'SGT (Singapore)', offset: '+8' },
  { value: 'Asia/Tokyo', label: 'JST (Tokyo)', offset: '+9' },
  { value: 'Australia/Sydney', label: 'AEST (Sydney)', offset: '+10/+11' },
];

interface CalendarBookingModalProps {
  onClose: () => void;
  readingMode?: 'dark' | 'sepia';
}

export function CalendarBookingModal({ onClose, readingMode = 'dark' }: CalendarBookingModalProps) {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [availableDays, setAvailableDays] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);
  const [loadingMonth, setLoadingMonth] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState<Partial<BookingData>>({
    name: '',
    email: '',
    phone: '',
    notes: '',
    location: locationOptions[0].value,
  });
  const [submitting, setSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState('Europe/Berlin');

  // Ensure component is mounted before rendering portal
  useEffect(() => {
    setMounted(true);
    // Try to detect user's timezone on mount
    try {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      // Check if it's in our list, otherwise keep default
      if (timezoneOptions.some(tz => tz.value === userTimezone)) {
        setSelectedTimezone(userTimezone);
      }
    } catch {
      // Keep default Europe/Berlin
    }
  }, []);

  // Theme classes based on reading mode
  const themeClasses = {
    dark: {
      backdrop: "bg-black/60",
      modal: "bg-primary/20 border-border/50 text-foreground",
      header: "border-border/20",
      calendar: "bg-primary/10 border-border/30",
      input: "bg-background/80 border-border/30 text-foreground",
      button: "bg-primary text-primary-foreground hover:bg-primary/90",
      buttonSecondary: "border-border/30 text-foreground hover:bg-white/5",
      formOverlay: "bg-zinc-900 text-foreground",
      formInput: "bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400",
    },
    sepia: {
      backdrop: "bg-amber-900/60",
      modal: "bg-amber-50/95 border-amber-300/60 text-amber-950",
      header: "border-amber-300/30",
      calendar: "bg-amber-100/70 border-amber-300/40",
      input: "bg-amber-50/90 border-amber-300/40 text-amber-950 placeholder:text-amber-700/50",
      button: "bg-amber-800 text-amber-50 hover:bg-amber-700",
      buttonSecondary: "border-amber-300/40 text-amber-950 hover:bg-amber-100/70",
      formOverlay: "bg-amber-50 text-amber-950",
      formInput: "bg-white border-amber-300 text-amber-950 placeholder:text-amber-600",
    },
  };

  const currentTheme = themeClasses[readingMode];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const today = new Date();
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // Generate calendar days
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(0);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  // Load month availability when month or timezone changes
  useEffect(() => {
    const loadMonthAvailability = async () => {
      setLoadingMonth(true);
      try {
        const availability = await fetchMonthAvailability(
          currentMonth.getFullYear(),
          currentMonth.getMonth(),
          30,
          selectedTimezone
        );
        setAvailableDays(availability);
      } catch (error) {
        console.error('Error loading month availability:', error);
        setAvailableDays(new Set());
      } finally {
        setLoadingMonth(false);
      }
    };

    loadMonthAvailability();
  }, [currentMonth, selectedTimezone]);

  const navigateMonth = (direction: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  const selectDate = async (day: number) => {
    if (!day || !availableDays.has(day)) return;
    const date = new Date(year, month, day);
    const todayStart = new Date(today);
    todayStart.setHours(0, 0, 0, 0);
    
    if (date >= todayStart) {
      setSelectedDate(date);
      setSelectedSlot(null);
      setLoading(true);

      try {
        const slots = await fetchAvailableSlots(date, 30, selectedTimezone);
        setAvailableSlots(slots);
      } catch (error) {
        console.error('Error fetching slots:', error);
        setAvailableSlots([]);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle timezone change - refetch slots if a date is selected
  const handleTimezoneChange = async (newTimezone: string) => {
    setSelectedTimezone(newTimezone);
    setSelectedSlot(null);

    if (selectedDate) {
      setLoading(true);
      try {
        const slots = await fetchAvailableSlots(selectedDate, 30, newTimezone);
        setAvailableSlots(slots);
      } catch (error) {
        console.error('Error fetching slots:', error);
        setAvailableSlots([]);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBookCall = () => {
    if (selectedDate && selectedSlot) {
      setShowBookingForm(true);
    }
  };

  const isAvailableDay = (day: number) => {
    return day > 0 && availableDays.has(day);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot || !bookingData.name || !bookingData.email) return;

    setSubmitting(true);
    try {
      const booking: BookingData = {
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone,
        notes: bookingData.notes,
        startTime: selectedSlot.originalStartTime,
        endTime: selectedSlot.originalEndTime || selectedSlot.endTime.toISOString(),
        timeZone: selectedTimezone,
        location: bookingData.location || locationOptions[0].value,
      };

      await createBooking(booking);
      setBookingSuccess(true);
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const isPastDate = (day: number) => {
    if (!day) return false;
    const date = new Date(year, month, day);
    const todayStart = new Date(today);
    todayStart.setHours(0, 0, 0, 0);
    return date < todayStart;
  };

  const isToday = (day: number) => {
    if (!day) return false;
    const date = new Date(year, month, day);
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (day: number) => {
    if (!day || !selectedDate) return false;
    const date = new Date(year, month, day);
    return date.toDateString() === selectedDate.toDateString();
  };

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      <motion.div
        key="calendar-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={cn("fixed inset-0 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto", currentTheme.backdrop)}
        onClick={onClose}
      >
        <motion.div
          key="calendar-modal"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className={cn("relative flex min-h-0 flex-shrink overflow-hidden max-w-4xl w-full max-h-[90vh] flex-col backdrop-blur-xl text-balance border-2 rounded-3xl ring-1 ring-offset-2 shadow-button", currentTheme.modal)}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={cn("flex items-center justify-between p-6 border-b", currentTheme.header)}>
            <div className="flex items-center gap-3">
              <CalendarIcon className={readingMode === 'sepia' ? 'text-amber-950' : 'text-foreground'} />
              <h2 className={cn("text-2xl font-serif italic", readingMode === 'sepia' ? 'text-amber-950' : 'text-foreground')}>{t('common.bookCallTitle')}</h2>
            </div>
            <div className="flex items-center gap-3">
              {/* Timezone Selector */}
              <div className="flex items-center gap-2">
                <GlobeIcon className={cn("flex-shrink-0", readingMode === 'sepia' ? 'text-amber-950/60' : 'text-foreground/60')} />
                <select
                  value={selectedTimezone}
                  onChange={(e) => handleTimezoneChange(e.target.value)}
                  className={cn(
                    "text-sm rounded-lg border px-2 py-1.5 focus:outline-none transition-colors cursor-pointer",
                    currentTheme.input,
                    readingMode === 'sepia' ? 'focus:border-amber-800' : 'focus:border-primary'
                  )}
                >
                  {timezoneOptions.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <XIcon className={readingMode === 'sepia' ? 'text-amber-950/80' : 'text-foreground/80'} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calendar */}
              <div>
                <div className={cn("border rounded-2xl p-4", currentTheme.calendar)}>
                  {/* Month Navigation */}
                  <div className="flex justify-between items-center mb-4">
                    <button
                      onClick={() => navigateMonth(-1)}
                      className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <h3 className={cn("text-lg font-semibold", readingMode === 'sepia' ? 'text-amber-950' : 'text-foreground')}>
                      {monthNames[month]} {year}
                    </h3>
                    <button
                      onClick={() => navigateMonth(1)}
                      className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>

                  {/* Week Headers */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {weekDays.map((day) => (
                      <div key={day} className={cn("text-center text-xs font-medium py-2", readingMode === 'sepia' ? 'text-amber-950/60' : 'text-foreground/60')}>
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1 relative">
                    {loadingMonth && (
                      <div className="absolute inset-0 bg-primary/10 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
                        <div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full"></div>
                      </div>
                    )}
                    {calendarDays.map((day, index) => (
                      <button
                        key={index}
                        onClick={() => selectDate(day)}
                        disabled={!day || isPastDate(day) || !isAvailableDay(day) || loadingMonth}
                        className={cn(
                          "aspect-square p-2 text-sm rounded-lg transition-all duration-200 relative",
                          !day && "invisible",
                          day && !isPastDate(day) && isAvailableDay(day) && !isSelected(day) && (readingMode === 'sepia' ? "hover:bg-amber-200/30 text-amber-950" : "hover:bg-white/10 text-foreground"),
                          day && !isPastDate(day) && !isAvailableDay(day) && (readingMode === 'sepia' ? "text-amber-950/30 cursor-not-allowed" : "text-foreground/30 cursor-not-allowed"),
                          isPastDate(day) && (readingMode === 'sepia' ? "text-amber-950/30 cursor-not-allowed" : "text-foreground/30 cursor-not-allowed"),
                          isToday(day) && !isSelected(day) && isAvailableDay(day) && (readingMode === 'sepia' ? "bg-amber-200/40 text-amber-950 font-medium" : "bg-primary/20 text-foreground font-medium"),
                          isSelected(day) && (readingMode === 'sepia' ? "bg-amber-800 text-amber-50 font-medium" : "bg-primary text-primary-foreground font-medium"),
                          isAvailableDay(day) && !isPastDate(day) && (readingMode === 'sepia' ? "after:absolute after:bottom-1 after:left-1/2 after:transform after:-translate-x-1/2 after:w-1 after:h-1 after:bg-amber-800 after:rounded-full" : "after:absolute after:bottom-1 after:left-1/2 after:transform after:-translate-x-1/2 after:w-1 after:h-1 after:bg-primary after:rounded-full")
                        )}
                      >
                        {day > 0 && day}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <h3 className={cn("text-lg font-semibold mb-4 flex items-center gap-2", readingMode === 'sepia' ? 'text-amber-950' : 'text-foreground')}>
                  <ClockIcon className={readingMode === 'sepia' ? 'text-amber-950' : 'text-foreground'} />
                  {t('common.availableTimes')}
                </h3>
                
                {selectedDate ? (
                  loading ? (
                    <div className={cn("text-center py-8", readingMode === 'sepia' ? 'text-amber-950/60' : 'text-foreground/60')}>
                      <div className={cn("animate-spin w-6 h-6 border-2 border-t-transparent rounded-full mx-auto mb-2", readingMode === 'sepia' ? 'border-amber-800' : 'border-primary')}></div>
                      <p>Loading available times...</p>
                    </div>
                  ) : availableSlots.length > 0 ? (
                    <div className="space-y-1.5 max-h-80 overflow-y-auto">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot.originalStartTime}
                          onClick={() => setSelectedSlot(slot)}
                          className={cn(
                            "w-full px-3 py-2 text-left text-sm rounded-lg border transition-all duration-200",
                            selectedSlot?.originalStartTime === slot.originalStartTime
                              ? readingMode === 'sepia' 
                                ? "border-amber-800 bg-amber-200/40 text-amber-950 font-medium"
                                : "border-primary bg-primary/20 text-foreground font-medium"
                              : readingMode === 'sepia'
                                ? "border-amber-300/40 hover:border-amber-400/60 hover:bg-amber-100/30 text-amber-950"
                                : "border-border/30 hover:border-border/50 hover:bg-white/5 text-foreground"
                          )}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className={cn("text-center py-8", readingMode === 'sepia' ? 'text-amber-950/60' : 'text-foreground/60')}>
                      <CalendarIcon className={cn("mx-auto mb-2 opacity-50", readingMode === 'sepia' ? 'text-amber-950' : 'text-foreground')} />
                      <p>No available times for this date</p>
                    </div>
                  )
                ) : (
                  <div className={cn("text-center py-8", readingMode === 'sepia' ? 'text-amber-950/60' : 'text-foreground/60')}>
                    <CalendarIcon className={cn("mx-auto mb-2 opacity-50", readingMode === 'sepia' ? 'text-amber-950' : 'text-foreground')} />
                    <p>{t('common.selectDate')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          {!showBookingForm && !bookingSuccess && (
            <div className="border-t border-border/20 p-6">
              <div className="flex items-center justify-between gap-4">
                <div className={cn("text-sm flex-1", readingMode === 'sepia' ? 'text-amber-950/80' : 'text-foreground/80')}>
                  {selectedDate && selectedSlot ? (
                    <span>
                      {selectedDate.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })} at {selectedSlot.time}
                    </span>
                  ) : (
                    <span>{t('common.selectDateTime')}</span>
                  )}
                </div>
                <button
                  onClick={handleBookCall}
                  disabled={!selectedDate || !selectedSlot}
                  className={cn(
                    "inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-base transition-all duration-200",
                    selectedDate && selectedSlot
                      ? cn(currentTheme.button, "shadow-button hover:scale-[1.02] active:scale-[0.98]")
                      : readingMode === 'sepia'
                        ? "bg-amber-800/30 text-amber-950/40 cursor-not-allowed"
                        : "bg-primary/30 text-foreground/40 cursor-not-allowed"
                  )}
                >
                  <CalendarIcon className="w-5 h-5" />
                  {t('common.bookCallButton')}
                </button>
              </div>
            </div>
          )}

          {/* Booking Form - Slides up from bottom */}
          <AnimatePresence>
            {showBookingForm && !bookingSuccess && (
              <motion.div
                key="booking-form"
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={cn("absolute inset-0 flex flex-col rounded-3xl", currentTheme.formOverlay)}
              >
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={cn("text-xl font-semibold", readingMode === 'sepia' ? 'text-amber-950' : 'text-white')}>Contact Information</h3>
                    <button
                      onClick={() => setShowBookingForm(false)}
                      className={cn("p-2 rounded-full transition-colors", readingMode === 'sepia' ? 'hover:bg-amber-200' : 'hover:bg-zinc-800')}
                      aria-label="Back"
                    >
                      <XIcon className={readingMode === 'sepia' ? 'text-amber-950/80' : 'text-white/80'} />
                    </button>
                  </div>

                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={cn("block text-sm font-medium mb-2", readingMode === 'sepia' ? 'text-amber-900' : 'text-zinc-300')}>
                          Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={bookingData.name || ''}
                          onChange={(e) => setBookingData(prev => ({ ...prev, name: e.target.value }))}
                          className={cn("w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 transition-all", currentTheme.formInput, readingMode === 'sepia' ? 'focus:ring-amber-500' : 'focus:ring-primary/50')}
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className={cn("block text-sm font-medium mb-2", readingMode === 'sepia' ? 'text-amber-900' : 'text-zinc-300')}>
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={bookingData.email || ''}
                          onChange={(e) => setBookingData(prev => ({ ...prev, email: e.target.value }))}
                          className={cn("w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 transition-all", currentTheme.formInput, readingMode === 'sepia' ? 'focus:ring-amber-500' : 'focus:ring-primary/50')}
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={cn("block text-sm font-medium mb-2", readingMode === 'sepia' ? 'text-amber-900' : 'text-zinc-300')}>
                          Phone (optional)
                        </label>
                        <input
                          type="tel"
                          value={bookingData.phone || ''}
                          onChange={(e) => setBookingData(prev => ({ ...prev, phone: e.target.value }))}
                          className={cn("w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 transition-all", currentTheme.formInput, readingMode === 'sepia' ? 'focus:ring-amber-500' : 'focus:ring-primary/50')}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className={cn("block text-sm font-medium mb-2", readingMode === 'sepia' ? 'text-amber-900' : 'text-zinc-300')}>
                          Meeting Location
                        </label>
                        <select
                          value={bookingData.location || locationOptions[0].value}
                          onChange={(e) => setBookingData(prev => ({ ...prev, location: e.target.value }))}
                          className={cn("w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 transition-all", currentTheme.formInput, readingMode === 'sepia' ? 'focus:ring-amber-500' : 'focus:ring-primary/50')}
                        >
                          {locationOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className={cn("block text-sm font-medium mb-2", readingMode === 'sepia' ? 'text-amber-900' : 'text-zinc-300')}>
                        Notes (optional)
                      </label>
                      <textarea
                        value={bookingData.notes || ''}
                        onChange={(e) => setBookingData(prev => ({ ...prev, notes: e.target.value }))}
                        rows={3}
                        className={cn("w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 transition-all resize-none", currentTheme.formInput, readingMode === 'sepia' ? 'focus:ring-amber-500' : 'focus:ring-primary/50')}
                        placeholder="Anything you'd like to discuss..."
                      />
                    </div>
                  </form>
                </div>

                <div className={cn("border-t p-6", readingMode === 'sepia' ? 'border-amber-200' : 'border-zinc-800')}>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowBookingForm(false)}
                      className={cn("flex-1 px-4 py-3 text-sm rounded-xl border font-medium transition-colors", readingMode === 'sepia' ? 'border-amber-300 text-amber-900 hover:bg-amber-100' : 'border-zinc-700 text-zinc-300 hover:bg-zinc-800')}
                    >
                      Back
                    </button>
                    <button
                      onClick={handleBookingSubmit}
                      disabled={submitting || !bookingData.name || !bookingData.email}
                      className={cn(
                        "flex-1 px-4 py-3 text-sm rounded-xl font-semibold transition-all duration-200",
                        !submitting && bookingData.name && bookingData.email
                          ? cn(currentTheme.button, "shadow-button hover:scale-[1.02] active:scale-[0.98]")
                          : readingMode === 'sepia'
                            ? "bg-amber-300 text-amber-600 cursor-not-allowed"
                            : "bg-zinc-700 text-zinc-500 cursor-not-allowed"
                      )}
                    >
                      {submitting ? 'Booking...' : 'Confirm Booking'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Message */}
          {bookingSuccess && (
            <div className="border-t border-border/20 p-6 text-center">
              <div className="mb-4">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-400">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className={cn("text-xl font-semibold mb-2", readingMode === 'sepia' ? 'text-amber-950' : 'text-foreground')}>Booking Confirmed!</h3>
                <p className={readingMode === 'sepia' ? 'text-amber-950/80' : 'text-foreground/80'}>
                  Your call has been scheduled. You'll receive a confirmation email shortly with the meeting details.
                </p>
              </div>
              <button
                onClick={onClose}
                className={cn("px-6 py-3 rounded-full font-medium transition-colors", currentTheme.button)}
              >
                Close
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}