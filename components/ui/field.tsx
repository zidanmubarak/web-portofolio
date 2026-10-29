import * as React from "react";
import { cn } from "@/lib/utils";

export type FieldProps = {
  label: string;
  htmlFor: string;
  /** Error text; also sets aria-invalid on the control by id. */
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
};

/**
 * Underline form field for the paper Contact surface.
 *
 * The control itself is a native input/textarea styled by
 * `.field-control`; this wrapper owns the mono label and the error line.
 * Errors are announced with `role="alert"` and never use colour alone.
 */
export function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  className,
  children,
}: FieldProps) {
  const errorId = `${htmlFor}-error`;
  const hintId = `${htmlFor}-hint`;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={htmlFor} className="u-label text-paper-ink">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-paper-muted">
            {" "}
            *
          </span>
        ) : null}
      </label>
      {children}
      {hint ? (
        <p id={hintId} className="text-small text-paper-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="text-small text-paper-ink">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const controlClasses =
  "w-full border-0 border-b border-paper-muted bg-transparent px-0 py-3 text-base text-paper-ink " +
  "placeholder:text-paper-muted focus-visible:border-paper-ink disabled:opacity-50 " +
  "aria-[invalid=true]:border-accent";

export const TextInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function TextInput({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(controlClasses, className)}
      {...props}
    />
  );
});

export const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function TextArea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(controlClasses, "min-h-28 resize-y", className)}
      {...props}
    />
  );
});
