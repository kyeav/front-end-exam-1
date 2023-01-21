import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import {
  addMonths,
  addYears,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isEqual,
  isSameMonth,
  isToday,
  setYear,
  startOfDecade,
  startOfMonth,
  startOfToday,
  startOfWeek,
  subMonths,
  subYears,
} from 'date-fns';
import { useCallback, useEffect, useState } from 'react';

const classNames = (...classes: (string | boolean)[]) => classes.filter(Boolean).join(' ');

export default function BirthdayInput(): JSX.Element {
  const today = startOfToday();

  const [currentMonth, setCurrentMonth] = useState(today);

  const firstDayCurrentMonth = startOfMonth(currentMonth);

  const lastDayOfCurrentMonth = endOfMonth(currentMonth);

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(lastDayOfCurrentMonth),
  });

  const [selectedDay, setSelectedDay] = useState(today);

  const [showYearPicker, setShowYearPicker] = useState(false);

  const [years, setYears] = useState<Year[][]>([]);

  const [currentYear, setCurrentYear] = useState(today);

  interface Year {
    year: number;
    isSelected: boolean;
  }

  const yearsPicker = useCallback(() => {
    const startYear = startOfDecade(currentYear).getFullYear() + 1;

    const arrayOfYear: Year[][] = Array.from(Array(5), () => new Array<Year>(4));

    for (let i = 0; i < 5; i += 1) {
      for (let j = 0; j < 4; j += 1) {
        const yr = startYear + i * 4 + j;

        arrayOfYear[i][j] = {
          year: yr,
          isSelected: currentMonth.getFullYear() === yr,
        };
      }
    }

    setYears(arrayOfYear);
  }, [currentYear, currentMonth]);

  useEffect(() => {
    yearsPicker();
  }, [yearsPicker]);

  const [showCalendar, setShowCalendar] = useState(false);

  const [birthday, setBirthday] = useState('');

  return (
    <div className="birthday-input relative">
      {/* input field */}
      <input
        type="text"
        className="input-field w-[335px] h-[58px] outline-none border-solid border-[3px] border-white/[.5] rounded-lg bg-[#181818] px-[12px] placeholder-[#fff]/[.5] focus:border-[#fff] font-normal leading-[24px] tracking-[0.15px] text-[#fff] text-[16px]"
        placeholder="mm/dd/yyyy"
        onFocus={() => setShowCalendar(true)}
        value={birthday}
        // onChange={(e) => {
        //   handleChange(e.target.value);
        // }}
      />
      <span className="text-[#fff] text-[12px] absolute left-0 top-[16px] mx-[15px] px-1 input-text bg-[#181818] -translate-y-[24px] -translate-x-0 leading-[18px] tracking-[0.4px]">
        Birthday
      </span>

      {/* calendar */}
      {showCalendar && (
        <div className="mt-[16px] absolute w-[320px] h-[469px] bg-[#1b1b1b] shadow-[4px_4px_20px_rgba(0,0,0,0.3)] rounded-[10px]">
          {/* header */}
          <div className="text-white mt-[17px] ml-[24px]">
            <p className="font-[400] text-[16px] leading-[24px]">Text</p>
            <h4 className="font-[700] text-[32px] leading-[44px]">{format(currentMonth, 'MMM, yyyy')}</h4>
          </div>

          {/* body - top */}
          <div className="text-white mt-[24px] mx-[20px] flex justify-between">
            <button
              type="button"
              onClick={() =>
                showYearPicker
                  ? setCurrentYear((current) => subYears(current, 20))
                  : setCurrentMonth((current) => subMonths(current, 1))
              }
            >
              <ChevronLeftIcon className="w-[12px]" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="font-[400] text-[16px] leading-[24px] items-center"
              onClick={() => setShowYearPicker(true)}
            >
              {showYearPicker ? format(currentMonth, 'yyyy') : format(currentMonth, 'MMMM yyyy')}
            </button>
            <button
              type="button"
              onClick={() =>
                showYearPicker
                  ? setCurrentYear((current) => addYears(current, 20))
                  : setCurrentMonth((current) => addMonths(current, 1))
              }
            >
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
            <div className="text-white mt-[33px] font-[400] text-[16px] leading-[24px] text-center">
              {years.map((row) => (
                <div key={row[0].year} className="grid grid-cols-4 mx-[24px] mb-[35px]">
                  {row.map((col: Year) => (
                    <button
                      type="button"
                      key={col.year}
                      className={`rounded-sm ${
                        col.isSelected ? 'bg-[#00a3ff]' : 'hover:bg-[#fff] hover:text-[#080808]'
                      }`}
                      onClick={() => {
                        setCurrentMonth(setYear(new Date(), col.year));
                        setCurrentYear(setYear(new Date(), col.year));
                        setShowYearPicker(false);
                      }}
                    >
                      {col.year}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            // month picker
            <div className="grid grid-cols-7 mt-[20px] mx-[16px] font-[400] text-[14px] leading-[20.02px] tracking-[0.15px] text-center">
              {/* days */}
              {days.map((day) => (
                // day
                <div key={day.toString()} className="pb-[8px]">
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
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, currentMonth) &&
                        'text-[#fff]/[.5]',

                      // selected today date
                      isEqual(day, selectedDay) && isToday(day) && 'text-[#fff] bg-[#00a3ff]',

                      // selected date but not today date
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        'text-[#fff] outline outline-[1px] outline-[#00a3ff]',

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
          <div className="text-white flex justify-end font-[600] text-[14px] leading-[24px]">
            <button
              onClick={() => {
                setBirthday('');
                setShowCalendar(false);
              }}
              type="button"
              className="mr-[70px]"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setBirthday(format(selectedDay, 'MM/dd/yyyy'));
                setShowCalendar(false);
              }}
              type="button"
              className="mr-[43px]"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
