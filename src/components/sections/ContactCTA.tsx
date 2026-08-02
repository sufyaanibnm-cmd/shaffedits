import { lazy, Suspense, useState } from "react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { Instagram, Linkedin, Youtube, CheckCircle2, AlertCircle } from "lucide-react";
import { GlowButton } from "../ui/GlowButton";
import "react-phone-input-2/lib/style.css";

// Lazy-loaded: react-phone-input-2 bundles country/flag data (~490KB) that
// isn't needed for first paint since this is a below-the-fold form field.
const PhoneInput = lazy(() => import("react-phone-input-2"));

const schema = z.object({
  name: z.string().trim().min(2, "Please tell us your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(160),
  phone: z.string().trim().min(6, "Enter a valid phone").max(30),
  message: z.string().trim().min(10, "Give us a little more context").max(1500),
});
type FormData = z.infer<typeof schema>;

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

export function ContactCTA() {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const {
  register,
  handleSubmit,
  reset,
  setValue,
  watch,
  formState: { errors },
} = useForm<FormData>({
  resolver: zodResolver(schema),
  defaultValues: {
    phone: "",
  },
});
const phone = watch("phone");

  const onSubmit = async (data: FormData) => {
    setState("sending");
    try {
      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        throw new Error("EmailJS environment variables are missing");
      }
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          phone: data.phone,
          message: data.message,
          to_email: "hi@shaffedits.com",
        },
        { publicKey: PUBLIC_KEY },
      );
      setState("success");
      reset();
    } catch (err) {
      console.error("Contact form send failed:", err);
      setState("error");
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-black px-6 py-28 text-white md:py-40">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="md:col-span-5"
        >
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.4em] text-white/50">
            Contact / 07
          </p>
          <h2 className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-black leading-[0.95] tracking-tight">
            Ready to build something <span className="italic font-light text-white/60">remarkable</span>?
          </h2>
          <p className="mt-6 text-lg text-white/70">
            Your brand deserves impact. Let's create work that people remember and
            businesses grow from.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { href: "https://www.instagram.com/shaffedits/", Icon: Instagram, label: "Instagram" },
              { href: "https://www.linkedin.com/company/shaffedits/", Icon: Linkedin, label: "LinkedIn" },
              { href: "https://www.youtube.com/@ShaffEdits.", Icon: Youtube, label: "YouTube" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                aria-label={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:bg-white hover:text-black"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.form
          id="form"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          onSubmit={handleSubmit(onSubmit)}
          className="md:col-span-7"
          noValidate
        >
          <p className="mb-8 text-sm text-white/60">
            Or simply fill out the enquiry form and our team will get back to you within
            one business day.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Name" error={errors.name?.message}>
              <input {...register("name")} className={inputCls} placeholder="Your name" autoComplete="name" />
            </Field>
            <Field label="Email" error={errors.email?.message}>
              <input {...register("email")} type="email" className={inputCls} placeholder="sample@email.com" autoComplete="email" />
            </Field>
            <Field
              label="Phone"
              error={errors.phone?.message}
              className="sm:col-span-2"
            >
              <Suspense fallback={<div className="phone-container h-12" />}>
                <PhoneInput
                  country="in"
                  value={phone}
                  enableSearch
                  onChange={(value) =>
                    setValue("phone", value, { shouldValidate: true })
                  }
                  inputProps={{
                    name: "phone",
                    autoComplete: "tel",
                  }}
                  containerClass="phone-container"
                  inputClass="phone-input"
                  buttonClass="phone-button"
                  dropdownClass="phone-dropdown"
                />
              </Suspense>
            </Field>
            <Field label="Message" error={errors.message?.message} className="sm:col-span-2">
              <textarea {...register("message")} rows={5} className={inputCls} placeholder="Tell us about your brand & goals" />
            </Field>
          </div>

          <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <GlowButton type="submit" disabled={state === "sending"} tone="onDark">
              {state === "sending" ? "Sending…" : "Book a call"}
            </GlowButton>
            {state === "success" && (
              <p className="flex items-center gap-2 text-sm text-white">
                <CheckCircle2 className="h-4 w-4" />
                Thanks — we'll be in touch within one business day.
              </p>
            )}
            {state === "error" && (
              <p className="flex items-center gap-2 text-sm text-white/80">
                <AlertCircle className="h-4 w-4" />
                Something went wrong. Please email{" "}
                <a href="mailto:hi@shaffedits.com" className="underline">
                  hi@shaffedits.com
                </a>{" "}
                directly.
              </p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}

const inputCls =
  "w-full border-b border-white/20 bg-transparent px-0 py-3 text-white placeholder:text-white/30 focus:border-white focus:outline-none";

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`flex flex-col gap-2 ${className ?? ""}`}>
      <span className="text-xs font-medium uppercase tracking-[0.25em] text-white/50">{label}</span>
      {children}
      {error && <span className="text-xs text-red-300">{error}</span>}
    </label>
  );
}
