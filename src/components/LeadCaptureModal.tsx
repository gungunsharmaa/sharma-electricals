import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { WEB3FORMS_ACCESS_KEY, WEB3FORMS_ENDPOINT } from "@/config/forms";

const STORAGE_KEY = "leadCaptureDismissedAt";
const COOLDOWN_DAYS = 7;
const OPEN_DELAY_MS = 2000;

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().min(2, "Company name is required"),
  phone: z.string().optional(),
  message: z.string().optional(),
  botcheck: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

const LeadCaptureModal = () => {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    const dismissedAt = localStorage.getItem(STORAGE_KEY);
    if (dismissedAt) {
      const elapsed = Date.now() - Number(dismissedAt);
      const cooldownMs = COOLDOWN_DAYS * 24 * 60 * 60 * 1000;
      if (elapsed < cooldownMs) return;
    }
    const t = setTimeout(() => setOpen(true), OPEN_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const handleOpenChange = (next: boolean) => {
    if (!next) localStorage.setItem(STORAGE_KEY, String(Date.now()));
    setOpen(next);
  };

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
          source: "Homepage popup",
          botcheck: data.botcheck,
        }),
      });
      const result = await response.json();
      if (result.success) {
        toast({ title: "Thanks for reaching out!", description: "We'll be in touch shortly." });
        reset();
        localStorage.setItem(STORAGE_KEY, String(Date.now()));
        setOpen(false);
      } else {
        toast({ title: "Something went wrong", description: "Please try again or use the contact page.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Something went wrong", description: "Please try again or use the contact page.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-sm bg-background border border-input text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";
  const errorClass = "text-xs text-destructive mt-1";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-border bg-background border-t-4 border-t-accent rounded-sm">

        <div className="p-6 sm:p-8">
          <DialogTitle className="text-display text-2xl text-foreground">
            Leave your electrical needs in expert hands
          </DialogTitle>
          <DialogDescription className="mt-2 mb-6">
            Share a few details and our team will reach out shortly.
          </DialogDescription>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input type="checkbox" {...register("botcheck")} className="hidden" tabIndex={-1} />

            <div>
              <input
                type="text"
                {...register("name")}
                className={inputClass}
                placeholder="Full name"
              />
              {errors.name && <p className={errorClass}>{errors.name.message}</p>}
            </div>

            <div>
              <input
                type="email"
                {...register("email")}
                className={inputClass}
                placeholder="Email"
              />
              {errors.email && <p className={errorClass}>{errors.email.message}</p>}
            </div>

            <div>
              <input
                type="text"
                {...register("company")}
                className={inputClass}
                placeholder="Company name"
              />
              {errors.company && <p className={errorClass}>{errors.company.message}</p>}
            </div>

            <div>
              <input
                type="tel"
                {...register("phone")}
                className={inputClass}
                placeholder="Contact number"
              />
            </div>

            <div>
              <textarea
                rows={3}
                {...register("message")}
                className={`${inputClass} resize-none`}
                placeholder="Project details (optional)"
              />
            </div>

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
