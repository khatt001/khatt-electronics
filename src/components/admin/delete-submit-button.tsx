"use client";

type DeleteSubmitButtonProps = {
  label?: string;
  confirmMessage: string;
  className?: string;
};

export function DeleteSubmitButton({
  label = "Sil",
  confirmMessage,
  className,
}: DeleteSubmitButtonProps) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(event) => {
        const confirmed = window.confirm(confirmMessage);

        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      {label}
    </button>
  );
}