import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  disabled?: boolean;
}

export const OTPInput: React.FC<OTPInputProps> = ({ length = 6, onComplete, disabled = false }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputs.current[0]) {
      inputs.current[0].focus();
    }
  }, []);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value.substring(element.value.length - 1);
    setOtp(newOtp);

    // Move to next input
    if (element.value && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }

    // Check if complete
    if (newOtp.every(v => v !== '') && newOtp.length === length) {
      onComplete(newOtp.join(''));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const data = e.clipboardData.getData('text').substring(0, length).split('');
    if (data.every(char => !isNaN(Number(char)))) {
      const newOtp = [...otp];
      data.forEach((char, i) => {
        newOtp[i] = char;
      });
      setOtp(newOtp);
      if (data.length === length) {
        onComplete(data.join(''));
      }
    }
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {otp.map((data, index) => (
        <motion.input
          key={index}
          type="text"
          maxLength={1}
          ref={el => (inputs.current[index] = el)}
          value={data}
          disabled={disabled}
          onChange={e => handleChange(e.target, index)}
          onKeyDown={e => handleKeyDown(e, index)}
          onPaste={handlePaste}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.05 }}
          className={`w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-poppins font-bold bg-gray-50 border-2 rounded-xl transition-all outline-none
            ${data ? 'border-accent bg-white shadow-sm' : 'border-gray-100 focus:border-accent/50 focus:bg-white'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text'}
          `}
        />
      ))}
    </div>
  );
};
