'use client';

import { useState, useEffect } from 'react';
import { format, addDays, isBefore, isAfter, isSameDay } from 'date-fns';
import { getBlockedDates } from '@/lib/notion';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type DateRangePickerProps = {
  villaId: string;
  onDateSelect: (range: { from: Date; to: Date } | undefined) => void;
  className?: string;
  disabled?: boolean;
};

type DateSelection = {
  from?: Date;
  to?: Date;
  selecting: 'from' | 'to' | null;
};

export function DateRangePicker({
  villaId,
  onDateSelect,
  className,
  disabled = false,
}: DateRangePickerProps) {
  const [selection, setSelection] = useState<DateSelection>({ selecting: 'from' });
  const [blockedDates, setBlockedDates] = useState<{ from: Date; to: Date }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isCheckOutOpen, setIsCheckOutOpen] = useState(false);

  useEffect(() => {
    async function loadBlockedDates() {
      try {
        setIsLoading(true);
        const dates = await getBlockedDates(villaId);
        setBlockedDates(dates);
      } catch (error) {
        console.error('Error loading blocked dates:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadBlockedDates();
  }, [villaId]);

  const isDateDisabled = (date: Date) => {
    // Disable past dates
    if (isBefore(date, new Date(new Date().setHours(0, 0, 0, 0)))) {
      return true;
    }

    // Check if date falls within any blocked range
    return blockedDates.some(
      ({ from, to }) => isAfter(date, from) && isBefore(date, to) || isSameDay(date, from) || isSameDay(date, to)
    );
  };


  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelection({ from: undefined, to: undefined, selecting: 'from' });
    onDateSelect(undefined);
    setIsCheckInOpen(false);
    setIsCheckOutOpen(false);
  };

  if (isLoading) {
    return (
      <div className="grid gap-2">
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal"
          disabled
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          Loading availability...
        </Button>
      </div>
    );
  }

  return (
    <div className={cn('grid gap-2', className)}>
      <div className="flex flex-col sm:flex-row gap-2 items-center">
        <Popover open={isCheckInOpen} onOpenChange={(open) => {
          setIsCheckInOpen(open);
          if (open) setSelection(prev => ({ ...prev, selecting: 'from' }));
        }}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-medium bg-white/90',
                !selection.from ? 'text-foreground/80' : 'text-foreground',
                disabled && 'opacity-70 cursor-not-allowed',
                'hover:bg-white hover:text-foreground border-border/50',
                'dark:bg-gray-800/90 dark:text-white dark:hover:bg-gray-700/90'
              )}
              disabled={disabled}
            >
              <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
              <span className="truncate">
                {selection.from ? format(selection.from, 'MMM dd, yyyy') : 'Check-in'}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg" align="start">
            <Calendar
              mode="single"
              selected={selection.from}
              onSelect={(date) => {
                if (date) {
                  const newSelection = {
                    from: date,
                    to: selection.to,
                    selecting: 'to' as const
                  };
                  setSelection(newSelection);
                  
                  if (selection.to) {
                    onDateSelect({ from: date, to: selection.to });
                  }
                  
                  setIsCheckInOpen(false);
                  if (!selection.to) {
                    setIsCheckOutOpen(true);
                  }
                }
              }}
              disabled={isDateDisabled}
              initialFocus
              classNames={{
                head_row: 'hidden',
                thead: 'hidden',
                row: 'mt-0',
                nav: 'flex items-center',
                caption: 'flex justify-center pt-1 relative items-center',
                nav_button: 'h-7 w-7 p-0',
                nav_button_previous: 'absolute left-1',
                nav_button_next: 'absolute right-1',
                table: 'w-full border-collapse',
                cell: 'p-0 relative',
                day: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100',
                day_selected: 'bg-primary text-primary-foreground',
                day_today: 'bg-accent text-accent-foreground',
                day_disabled: 'text-muted-foreground opacity-50',
                day_outside: 'text-muted-foreground opacity-50',
                day_range_middle: 'aria-selected:bg-accent/50',
              }}
            />
          </PopoverContent>
        </Popover>

        <Popover open={isCheckOutOpen} onOpenChange={(open) => {
          if (!selection.from) return; // Don't open if no check-in date is selected
          setIsCheckOutOpen(open);
          if (open) setSelection(prev => ({ ...prev, selecting: 'to' }));
        }}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-medium bg-white/90',
                !selection.to ? 'text-foreground/70' : 'text-foreground',
                disabled && 'opacity-70 cursor-not-allowed',
                !selection.from && 'opacity-70 cursor-not-allowed',
                'hover:bg-white hover:text-foreground border-border/50',
                'dark:bg-gray-800/90 dark:text-white dark:hover:bg-gray-700/90'
              )}
              disabled={disabled || !selection.from}
            >
              <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
              <span className="truncate">
                {selection.to ? format(selection.to, 'MMM dd, yyyy') : 'Check-out'}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg" align="start">
            <Calendar
              mode="single"
              selected={selection.to}
              onSelect={(date) => {
                if (date) {
                  const newSelection = {
                    from: selection.from,
                    to: date,
                    selecting: null
                  };
                  setSelection(newSelection);
                  
                  if (selection.from) {
                    onDateSelect({ from: selection.from, to: date });
                  }
                  
                  setIsCheckOutOpen(false);
                }
              }}
              disabled={(date) => 
                isDateDisabled(date) || 
                (selection.from ? isBefore(date, addDays(selection.from, 1)) : true)
              }
              initialFocus
              classNames={{
                head_row: 'hidden',
                thead: 'hidden',
                row: 'mt-0',
                nav: 'flex items-center',
                caption: 'flex justify-center pt-1 relative items-center',
                nav_button: 'h-7 w-7 p-0',
                nav_button_previous: 'absolute left-1',
                nav_button_next: 'absolute right-1',
                table: 'w-full border-collapse',
                cell: 'p-0 relative',
                day: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100',
                day_selected: 'bg-primary text-primary-foreground',
                day_today: 'bg-accent text-accent-foreground',
                day_disabled: 'text-muted-foreground opacity-50',
                day_outside: 'text-muted-foreground opacity-50',
                day_range_middle: 'aria-selected:bg-accent/50',
              }}
            />
          </PopoverContent>
        </Popover>

        {(selection.from || selection.to) && (
          <Button 
            variant="ghost" 
            size="sm"
            className="bg-white/90 hover:bg-white text-foreground/70 hover:text-foreground p-2 h-9 w-9"
            onClick={clearSelection}
            disabled={disabled}
            type="button"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {selection.from && selection.to && (
        <div className="text-sm text-center font-medium text-foreground/90 bg-white/80 dark:bg-gray-800/80 rounded-md p-1.5">
          {Math.ceil((selection.to.getTime() - selection.from.getTime()) / (1000 * 60 * 60 * 24))} nights
        </div>
      )}
    </div>
  );
}
