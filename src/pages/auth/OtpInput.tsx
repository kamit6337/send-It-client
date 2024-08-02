"use client";
import { type ChangeEvent, useEffect, useRef } from "react";

const OtpInput = ({
  otp,
  cb,
}: {
  otp: string[];
  cb: (value: string[]) => void;
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current?.length > 0) {
      inputRefs.current[0]?.focus();
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    // a regular expression that matches a single digit (0-9) or ""
    if (/^\d$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      cb(newOtp);

      // Move to next input if not the last input
      if (value && index < 7) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: { key: string }, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="mt-2 w-full space-y-1">
      <p>Code</p>
      <div className="flex w-full items-center justify-between">
        {otp.map((value: string, index) => {
          return (
            <input
              key={index}
              type="text"
              maxLength={1}
              required={true}
              value={value}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onChange={(e) => handleChange(e, index)}
              className="flex h-[48px] w-[46px] items-center justify-center rounded-md border border-box_border px-4 text-lg text-black shadow-sm"
            />
          );
        })}
      </div>
    </div>
  );
};

export default OtpInput;
