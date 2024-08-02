// Import necessary types from react-hook-form
import type { UseFormRegister, FieldValues, Path } from "react-hook-form";

// Update InputProps to use a more specific type for name
type InputProps<T extends FieldValues> = {
  title: string;
  type?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error: string | undefined;
};

const Input = <T extends FieldValues>({
  title,
  type = "text",
  name,
  register,
  error,
}: InputProps<T>) => {
  return (
    <div className="h-[74px] w-full space-y-1">
      <p className="">{title}</p>
      <div className="rounded-md border border-box_border shadow-sm">
        <input
          type={type}
          {...register(name)}
          placeholder="Enter"
          className="w-full rounded-md p-2 text-[#848484]"
        />
      </div>
      <p className="text-xs text-red-500">{error}</p>
    </div>
  );
};

export default Input;
