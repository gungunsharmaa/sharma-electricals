import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FiCheck } from "react-icons/fi";
import { WEB3FORMS_ACCESS_KEY, WEB3FORMS_ENDPOINT } from "@/config/forms";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().min(2, "Company name is required"),
  phone: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().optional(),
  botcheck: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

const inputClass =
  "w-full px-4 py-3 rounded-sm bg-background border border-input text-foreground text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";
const labelClass = "block text-sm font-medium text-foreground mb-2";
const errorClass = "text-xs text-destructive mt-1.5";

const ContactForm = () => {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setSubmitStatus("loading");
    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New Project Inquiry from ${data.name} — ${data.company}`,
          from_name: data.name,
          name: data.name,
          company: data.company,
          phone: data.phone || "Not provided",
          email: data.email,
          message: data.message || "No details provided",
          botcheck: data.botcheck,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setSubmitStatus("success");
        reset();
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus("idle"), 4000);
      }
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 4000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Honeypot — invisible to humans, traps bots */}
      <input type="checkbox" {...register("botcheck")} className="hidden" tabIndex={-1} />

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-name" className={labelClass}>Name *</label>
          <input id="cf-name" type="text" {...register("name")} className={inputClass} placeholder="Your name" />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="cf-phone" className={labelClass}>Phone</label>
          <input id="cf-phone" type="tel" {...register("phone")} className={inputClass} placeholder="+91 XXXXX XXXXX" />
        </div>
      </div>

      <div>
        <label htmlFor="cf-company" className={labelClass}>Company *</label>
        <input id="cf-company" type="text" {...register("company")} className={inputClass} placeholder="Your company / developer name" />
        {errors.company && <p className={errorClass}>{errors.company.message}</p>}
      </div>

      <div>
        <label htmlFor="cf-email" className={labelClass}>Email *</label>
        <input id="cf-email" type="email" {...register("email")} className={inputClass} placeholder="you@company.com" />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="cf-message" className={labelClass}>Project details</label>
        <textarea
          id="cf-message"
          rows={5}
          {...register("message")}
          className={cn(inputClass, "resize-none")}
          placeholder="Tell us about your project requirements"
        />
      </div>

      <button
        type="submit"
        disabled={submitStatus === "loading" || submitStatus === "success"}
        className={cn(
          "w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-sm transition-colors",
          submitStatus === "success" && "bg-emerald-700 text-white cursor-default",
          submitStatus === "error" && "bg-destructive text-destructive-foreground",
          submitStatus === "loading" && "bg-primary/70 text-primary-foreground cursor-not-allowed",
          submitStatus === "idle" && "bg-primary text-primary-foreground hover:bg-primary/90"
        )}
      >
        {submitStatus === "success" && <><FiCheck /> Message sent — we'll be in touch</>}
        {submitStatus === "error" && "Couldn't send — please try again"}
        {submitStatus === "loading" && "Sending…"}
        {submitStatus === "idle" && "Send message"}
      </button>
    </form>
  );
};

export default ContactForm;
