import React from "react";

// Run: npx shadcn-ui@latest add input label
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type Props = {
  label: string;
  type: React.HTMLInputTypeAttribute;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

function AuthInput({ label, type, value, setValue }: Props) {
  return (
    <div className="w-full">
      <Label htmlFor={label}>{label}</Label>
      <Input
        id={label}
        type={type}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
}

export default AuthInput;
