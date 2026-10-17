import { useState, type FormEvent } from "react";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { whatsappLink } from "@/data/site";

// Forms validate client-side and hand off via WhatsApp. Swap `submitLead` for a
// server function when a backend is added.
async function submitLead(kind: string, data: Record<string, string>) {
  console.info("lead", kind, Object.keys(data));
  return true;
}

const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(30).optional(),
  dates: z.string().trim().max(100).optional(),
  message: z.string().trim().min(5, "Tell us a little about your stay").max(1000),
});

function useLeadForm(kind: string, schema: z.ZodTypeAny) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [data, setData] = useState<Record<string, string>>({});
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const r = schema.safeParse(raw);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i: z.ZodIssue) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    await submitLead(kind, raw);
    setData(raw);
    setDone(true);
  };
  return { errors, done, data, onSubmit };
}

function Field({ label, name, error, type = "text", textarea, ...rest }: { label: string; name: string; error?: string; type?: string; textarea?: boolean; placeholder?: string; defaultValue?: string }) {
  const id = `f-${name}`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">{label}</label>
      {textarea ? (
        <textarea id={id} name={name} rows={4} className="field" aria-invalid={!!error} {...rest} />
      ) : (
        <input id={id} name={name} type={type} className="field" aria-invalid={!!error} {...rest} />
      )}
      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
}

function Success({ title, wa }: { title: string; wa: string }) {
  return (
    <div className="rounded-xl bg-gold-soft p-6 text-center" role="status">
      <CheckCircle2 className="mx-auto h-10 w-10 text-gold" />
      <p className="mt-3 font-display text-xl font-bold text-navy">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">Our team will reply within a few hours. For an instant reply:</p>
      <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-navy mt-4">Continue on WhatsApp</a>
    </div>
  );
}

export function EnquiryForm({ property }: { property?: string }) {
  const { errors, done, data, onSubmit } = useLeadForm("enquiry", enquirySchema);
  if (done)
    return <Success title="Thank you — enquiry received" wa={whatsappLink(`Hello LuxeLink EMBU, I'm ${data.name}. Enquiry${property ? ` for ${property}` : ""}: ${data.message} ${data.dates ? `(Dates: ${data.dates})` : ""}`)} />;
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" name="name" error={errors.name} />
        <Field label="Email" name="email" type="email" error={errors.email} />
        <Field label="Phone / WhatsApp" name="phone" type="tel" error={errors.phone} />
        <Field label="Preferred dates" name="dates" placeholder="e.g. 12–15 Dec" error={errors.dates} />
      </div>
      <Field label="Message" name="message" textarea error={errors.message}
        defaultValue={property ? `I'm interested in ${property}.` : undefined} />
      <button type="submit" className="btn-gold w-full sm:w-auto">Send Enquiry</button>
    </form>
  );
}

const listSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a phone number").max(30),
  property: z.string().trim().min(2, "Describe your property").max(150),
  location: z.string().trim().min(2, "Where is it located?").max(100),
  message: z.string().trim().max(1000).optional(),
});

export function ListPropertyForm() {
  const { errors, done, data, onSubmit } = useLeadForm("list-property", listSchema);
  if (done) return <Success title="Thanks — we'll arrange a viewing" wa={whatsappLink(`Hello, I'm ${data.name} and I'd like to list ${data.property} in ${data.location}.`)} />;
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" name="name" error={errors.name} />
        <Field label="Email" name="email" type="email" error={errors.email} />
        <Field label="Phone" name="phone" type="tel" error={errors.phone} />
        <Field label="Location" name="location" placeholder="e.g. Kirimiri, Embu" error={errors.location} />
      </div>
      <Field label="Property (type & bedrooms)" name="property" placeholder="e.g. 4-bedroom villa with pool" error={errors.property} />
      <Field label="Anything else?" name="message" textarea error={errors.message} />
      <button type="submit" className="btn-gold w-full sm:w-auto">Submit Property</button>
    </form>
  );
}

export function NewsletterForm() {
  const { errors, done, onSubmit } = useLeadForm("newsletter", z.object({ email: z.string().trim().email("Enter a valid email").max(255) }));
  if (done) return <p className="mt-4 text-sm text-gold" role="status">You're subscribed. Welcome to LuxeLink.</p>;
  return (
    <form onSubmit={onSubmit} noValidate className="mt-4 flex flex-col gap-2">
      <label htmlFor="nl-email" className="sr-only">Email address</label>
      <input id="nl-email" name="email" type="email" placeholder="Your email" className="field" />
      {errors.email && <p className="text-sm text-gold">{errors.email}</p>}
      <button className="btn-gold">Subscribe</button>
    </form>
  );
}
