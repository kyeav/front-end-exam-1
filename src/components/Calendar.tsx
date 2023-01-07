import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isEqual,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfToday,
  startOfWeek,
  subMonths,
} from 'date-fns';
import { useState } from 'react';

const classNames = (...classes: (string | boolean)[]) => classes.filter(Boolean).join(' ');

export default function Calendar(): JSX.Element {
  const today = startOfToday();
  // console.log(today);

  const [currentMonth, setCurrentMonth] = useState(today);
  // console.log(currentMonth);

  // console.log(format(currentMonth, 'MMM, yyyy'));
  // console.log(format(currentMonth, 'MMMM yyyy'));

  const firstDayCurrentMonth = startOfMonth(currentMonth);
  // console.log(firstDayCurrentMonth);

  const lastDayOfCurrentMonth = endOfMonth(currentMonth);
  // console.log(lastDayOfCurrentMonth);

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(lastDayOfCurrentMonth),
  });

  // console.log(days);
  // console.log(startOfWeek(firstDayCurrentMonth));
  // console.log(endOfWeek(lastDayOfCurrentMonth));

  const [selectedDay, setSelectedDay] = useState(today);
  // console.log(selectedDay);

  const [showYearPicker, setShowYearPicker] = useState(false);

  // const [currentYear, setCurrentYear] = useState(today);

  return (
    <div className="absolute w-[320px] h-[469px] bg-[#1b1b1b] shadow-[4px_4px_20px_rgba(0,0,0,0.3)] rounded-[10px]">
      {/* header */}
      <div className="text-white mt-[17px] ml-[24px]">
        <p className="font-[400] text-[16px] leading-[24px]">Text</p>
        <h4 className="font-[700] text-[32px] leading-[44px]">{format(currentMonth, 'MMM, yyyy')}</h4>
      </div>

      {/* body - top */}
      <div className="text-white mt-[24px] mx-[20px] flex justify-between">
        <button type="button" onClick={() => setCurrentMonth((current) => subMonths(current, 1))}>
          <ChevronLeftIcon className="w-[12px]" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="font-[400] text-[16px] leading-[24px] items-center"
          onClick={() => setShowYearPicker(true)}
        >
          {showYearPicker ? format(currentMonth, 'yyyy') : format(currentMonth, 'MMMM yyyy')}
        </button>
        <button type="button" onClick={() => setCurrentMonth((current) => addMonths(current, 1))}>
          <ChevronRightIcon className="w-[12px]" aria-hidden="true" />
        </button>
      </div>

      {/* body - middle */}
      {!showYearPicker && (
        <div className="grid grid-cols-7 mt-[23px] mx-[16px] font-[400] text-[11px] leading-[13px] text-center text-[#929292]">
          <div>Su</div>
          <div>Mo</div>
          <div>Tu</div>
          <div>We</div>
          <div>Th</div>
          <div>Fr</div>
          <div>Sa</div>
        </div>
      )}

      {/* body - bottom */}
      {showYearPicker ? (
        // year picker
        <div className="text-white grid grid-cols-4 mt-[33px] mx-[24px] mb-[35px] font-[400] text-[16px] leading-[24px] text-center">
          100
        </div>
      ) : (
        // month picker
        <div className="grid grid-cols-7 mt-[24px] mx-[16px] font-[400] text-[14px] leading-[20.02px] tracking-[0.15px] text-center">
          {/* days */}
          {days.map((day) => (
            // day
            <div key={day.toString()} className="pb-[12px]">
              <button
                type="button"
                onClick={() => setSelectedDay(day)}
                className={classNames(
                  // selected date
                  isEqual(day, selectedDay) && 'text-[#fff] outline outline-[1px] outline-[#00a3ff]',

                  // unselected today date
                  !isEqual(day, selectedDay) && isToday(day) && 'text-[#fff] bg-[#00a3ff]',

                  // all unselected dates in same month
                  !isEqual(day, selectedDay) && !isToday(day) && isSameMonth(day, currentMonth) && 'text-[#fff]',

                  // all unselected dates not in same month
                  !isEqual(day, selectedDay) && !isToday(day) && !isSameMonth(day, currentMonth) && 'text-[#fff]/[.5]',

                  // selected today date
                  isEqual(day, selectedDay) && isToday(day) && 'text-[#fff] bg-[#00a3ff]',

                  // selected date but not today date
                  isEqual(day, selectedDay) && !isToday(day) && 'text-[#fff] outline outline-[1px] outline-[#00a3ff]',

                  // unselected date hovered
                  !isEqual(day, selectedDay) && 'text-[#fff] hover:bg-[#fff] hover:text-[#080808]',

                  // today date
                  isToday(day) && 'text-[#fff] bg-[#00a3ff]',

                  'mx-auto flex h-8 w-8 items-center justify-center rounded-full',
                )}
              >
                <time dateTime={format(day, 'yyyy-MM-dd')}>{format(day, 'd')}</time>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* footer */}
      <div className="text-white mb-[24px] flex justify-end font-[600] text-[14px] leading-[24px]">
        <button type="button" className="mr-[70px]">
          Cancel
        </button>
        <button type="button" className="mr-[43px]">
          OK
        </button>
      </div>
    </div>
  );
}
