import { getAttribution, track } from "@/lib/tracking";
import { useState, type MutableRefObject } from "react";
import { useForm, type FieldError, type UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { WEB3FORMS_ACCESS_KEY, WEB3FORMS_ENDPOINT } from "@/config/forms";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().min(2, "Company name is required"),
  phone: z.string().optional(),
  message: z.string().optional(),
  botcheck: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

interface LeadCaptureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Element to refocus when the popup closes (the button that opened it). */
  returnFocusTo?: MutableRefObject<HTMLElement | null>;
}

const inputClass =
  "w-full px-4 py-3 rounded-sm bg-background border border-input text-foreground text-base sm:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";
const errorClass = "text-xs text-destructive mt-1";
const labelClass = "mb-1.5 block text-sm font-medium text-foreground";

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: FieldError;
  registration: UseFormRegisterReturn;
  as?: "input" | "textarea";
  type?: string;
  autoComplete?: string;
  placeholder?: string;
}

// A persistent <label> tied to its control, with the error linked via aria-describedby.
const Field = ({ id, label, required, error, registration, as = "input", type = "text", autoComplete, placeholder }: FieldProps) => {
  const errorId = `${id}-error`;
  const shared = {
    id,
    ...registration,
    required,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
  } as const;
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {as === "textarea" ? (
        <textarea rows={3} {...shared} placeholder={placeholder} className={`${inputClass} resize-none`} />
      ) : (
        <input type={type} autoComplete={autoComplete} {...shared} placeholder={placeholder} className={inputClass} />
      )}
      {error && (
        <p id={errorId} role="alert" className={errorClass}>
          {error.message}
        </p>
      )}
    </div>
  );
};

const LeadCaptureModal = ({ open, onOpenChange, returnFocusTo }: LeadCaptureModalProps) => {
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New Lead from ${data.name} — ${data.company}`,
          from_name: data.name,
          name: data.name,
          company: data.company,
          phone: data.phone || "Not provided",
          email: data.email,
          message: data.message || "No details provided",
          source: "Website enquiry popup",
          botcheck: data.botcheck,
          ...getAttribution(),
        }),
      });
      const result = await response.json();
      if (result.success) {
        track("generate_lead", { form_name: "enquiry_popup" });
        toast({ title: "Thanks for reaching out!", description: "We'll be in touch shortly." });
        reset();
        onOpenChange(false);
      } else {
        toast({ title: "Something went wrong", description: "Please try again or use the contact page.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Something went wrong", description: "Please try again or use the contact page.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onCloseAutoFocus={(e) => {
          const target = returnFocusTo?.current;
          if (target?.isConnected) {
            e.preventDefault();
            target.focus();
          }
        }}
        className="w-[calc(100%-2rem)] max-h-[90dvh] overflow-y-auto sm:max-w-md p-0 border-border bg-background border-t-4 border-t-accent rounded-sm"
      >
        <div className="p-5 sm:p-8">
          <DialogTitle className="text-display text-2xl text-foreground pr-6">
            Leave your electrical needs in expert hands
          </DialogTitle>
          <DialogDescription className="mt-2 mb-6">
            Share a few details and our team will reach out shortly.
          </DialogDescription>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <input type="checkbox" {...register("botcheck")} className="hidden" tabIndex={-1} />

            <Field id="enquiry-name" label="Full name" required autoComplete="name" registration={register("name")} error={errors.name} />
            <Field id="enquiry-email" label="Email" required type="email" autoComplete="email" registration={register("email")} error={errors.email} />
            <Field id="enquiry-company" label="Company name" required autoComplete="organization" registration={register("company")} error={errors.company} />
            <Field id="enquiry-phone" label="Contact number" type="tel" autoComplete="tel" registration={register("phone")} />
            <Field id="enquiry-message" label="Project details (optional)" as="textarea" registration={register("message")} />

            <button
              type="submit"
              disabled={submitting}
              className="w-full px-6 py-3.5 text-sm font-semibold rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? "Sending…" : "Send message"}
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadCaptureModal;
