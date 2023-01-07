import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export const Calendar = () => {
  return (
    <div className="absolute w-[320px] h-[469px] bg-[#1b1b1b] shadow-[4px_4px_20px_rgba(0,0,0,0.3)] rounded-[10px]">
      {/* header */}
      <div className="text-white mt-[17px] ml-[24px]">
        <p className="font-[400] text-[16px] leading-[24px]">Text</p>
        <h4 className="font-[700] text-[32px] leading-[44px]">Jan, 2022</h4>
      </div>

      {/* body - top */}
      <div className="text-white mt-[15px] mx-[20px] flex justify-between">
        <button type="button">
          <ChevronLeftIcon className="w-[12px]" aria-hidden="true" />
        </button>
        <button type="button" className="font-[400] text-[16px] leading-[24px] items-center">
          January 2022
        </button>
        <button type="button">
          <ChevronRightIcon className="w-[12px]" aria-hidden="true" />
        </button>
      </div>

      {/* body - middle */}
      <div className="grid grid-cols-7 mt-[15px] mx-[16px] font-[400] text-[11px] leading-[13px] text-center text-[#929292]">
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
      </div>

      {/* body - bottom */}
      <div className="grid grid-cols-7 mt-[15px] mx-[16px] font-[400] text-[14px] leading-[20.02px] tracking-[0.15px] text-center text-white">
        {/* days */}
        <div>
          {/* day */}
          <button type="button">1</button>
        </div>
      </div>

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
};
