import { useState } from 'react';
import CheckCircleIconSolid from '@heroicons/react/24/solid/CheckCircleIcon';
import CheckCircleIconOutline from '@heroicons/react/24/outline/CheckCircleIcon';

export default function PasswordInput() {
  const [showValidation, setShowValidation] = useState(false);
  const [password, setPassword] = useState('');

  // validation states
  const [upperValidated, setUpperValidated] = useState(false);
  const [lowerValidated, setLowerValidated] = useState(false);
  const [numberValidated, setNumberValidated] = useState(false);
  const [specialValidated, setSpecialValidated] = useState(false);
  const [lengthValidated, setLengthValidated] = useState(false);

  const handleChange = (value: string) => {
    setPassword(value);

    // regex
    const upper = /[A-Z]/;
    const lower = /[a-z]/;
    const number = /[0-9]/;
    const special = /[^a-zA-Z0-9]/g;
    const length = /(?=.{9,})/;

    // uppercase validation
    if (upper.test(value)) {
      setUpperValidated(true);
    } else {
      setUpperValidated(false);
    }

    // lowercase validation
    if (lower.test(value)) {
      setLowerValidated(true);
    } else {
      setLowerValidated(false);
    }

    // number validation
    if (number.test(value)) {
      setNumberValidated(true);
    } else {
      setNumberValidated(false);
    }

    // special validation
    if (special.test(value)) {
      setSpecialValidated(true);
    } else {
      setSpecialValidated(false);
    }

    // length validation
    if (length.test(value)) {
      setLengthValidated(true);
    } else {
      setLengthValidated(false);
    }
  };

  return (
    <div className="password-input mb-[24px] relative">
      {/* input field */}
      <input
        type="password"
        className="w-[335px] h-[58px] outline-none border-solid border-[3px] border-white/[.5] rounded-lg bg-[#181818] px-[12px] hover:border-[#fff] placeholder-[#fff]/[.5] focus:border-[#00a3ff] font-normal leading-[24px] tracking-[0.15px] text-[#fff] text-[16px]"
        placeholder="Password"
        onFocus={() => setShowValidation(true)}
        onBlur={() => setShowValidation(false)}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      />
      <span className="text-[#fff] text-[12px] absolute left-0 top-[16px] mx-[15px] px-1 input-text bg-[#181818] -translate-y-[24px] -translate-x-0 leading-[18px] tracking-[0.4px]">
        Password
      </span>

      {/* validation tracker */}
      {showValidation && password.trim().length > 0 && (
        <main className="z-10 absolute flex flex-col justify-evenly mt-[20px] rounded-[8px] px-[12px] py-[8px] w-[335px] h-[226px] bg-[#242424] text-[14px] leading-[21px] tracking-[0.25px] font-[400px] text-[#fff]">
          <div>
            {upperValidated ? (
              <CheckCircleIconSolid className="icon check-circle-icon-solid" />
            ) : (
              <CheckCircleIconOutline className="icon check-circle-icon-outline" />
            )}
            Have at least one uppercase letter
          </div>

          <div>
            {lowerValidated ? (
              <CheckCircleIconSolid className="icon check-circle-icon-solid" />
            ) : (
              <CheckCircleIconOutline className="icon check-circle-icon-outline" />
            )}
            Have at least one lowercase letter
          </div>

          <div>
            {numberValidated ? (
              <CheckCircleIconSolid className="icon check-circle-icon-solid" />
            ) : (
              <CheckCircleIconOutline className="icon check-circle-icon-outline" />
            )}
            Have at least one number
          </div>

          <div className="flex items-center">
            {specialValidated ? (
              <CheckCircleIconSolid className="icon check-circle-icon-solid" />
            ) : (
              <CheckCircleIconOutline className="icon check-circle-icon-outline" />
            )}
            Have at least one special character <br />
            (!@#$...etc)
          </div>

          <div>
            {lengthValidated ? (
              <CheckCircleIconSolid className="icon check-circle-icon-solid" />
            ) : (
              <CheckCircleIconOutline className="icon check-circle-icon-outline" />
            )}
            Longer than 8 characters
          </div>
        </main>
      )}
    </div>
  );
}
