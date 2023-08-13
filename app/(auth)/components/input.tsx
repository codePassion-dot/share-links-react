import clsx from "clsx";

interface Props {
  text: string;
  type: HTMLInputElement["type"];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  icon: React.ReactNode;
  placeholder: string;
  error: string | null;
}

export default function AuthInput({
  text,
  type = "default",
  value,
  onChange,
  name,
  icon,
  placeholder,
  error,
}: Props) {
  return (
    <label className="group flex flex-col gap-1">
      <span
        className={clsx(
          "text-sm font-normal",
          error ? "group-[&:not(:focus-within)]:text-red-orange" : "text-dune",
        )}
      >
        {text}
      </span>
      <div
        className={clsx(
          "flex flex-row items-center justify-center gap-3 rounded-lg border border-solid border-light-grey px-4 py-3 text-center focus-within:border-bluish-purple focus-within:shadow-3xl focus-within:shadow-bluish-purple/25",
          error && "[&:not(:focus-within)]:border-red-orange",
        )}
      >
        {icon}
        <input
          className="flex-1 placeholder:text-lg placeholder:font-normal placeholder:text-dune/50 focus:outline-none"
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          value={value}
          type={type}
        />
        {error !== null && (
          <span className="hidden text-sm font-normal text-red-orange group-[&:not(:focus-within)]:inline">
            {error}
          </span>
        )}
      </div>
    </label>
  );
}
