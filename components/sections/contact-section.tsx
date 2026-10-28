"use client";

import { useState } from "react";
import { useCopy } from "@/lib/i18n/provider";
import { SITE } from "@/lib/site";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type SubmitStatus = "idle" | "sending" | "success" | "error";

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactSection() {
  const copy = useCopy();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = event.target.name as keyof FormState;
    const value = event.target.value;
    setForm((previous) => ({ ...previous, [field]: value }));
    setStatus((previous) => (previous === "sending" ? previous : "idle"));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error(`Contact endpoint responded with ${response.status}`);
      }
      setStatus("success");
      setForm(EMPTY_FORM);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="sec" aria-labelledby="contact-heading">
      <div className="sec-head">
        <span className="secnum num" aria-hidden="true">
          05
        </span>
        <h2 id="contact-heading">{copy.contact.heading}</h2>
        <p className="meta">
          <span className="num">05</span> / 05
        </p>
      </div>

      <div className="contact">
        <span className="cspacer" aria-hidden="true" />
        <div className="cmain">
          <div className="cinfo">
            <h3 className="contact-avail serif" data-settle>
              {copy.contact.availability.heading}
            </h3>
            <p className="contact-body">{copy.contact.body}</p>
            <a className="cmail" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
            <div className="cgrid">
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>GitHub</span>
                <span aria-hidden="true">↗</span>
              </a>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>LinkedIn</span>
                <span aria-hidden="true">↗</span>
              </a>
              <a href={SITE.cv}>
                <span>{copy.nav.cv}</span>
                <span aria-hidden="true">↓</span>
              </a>
              <a href="#top">
                <span>{copy.footer.backToTop}</span>
                <span aria-hidden="true">↑</span>
              </a>
            </div>
          </div>

          <form className="cform" onSubmit={handleSubmit}>
            {status === "success" ? (
              <div className="form-status ok" role="status">
                <p className="form-status__title">
                  {copy.contact.success.heading}
                </p>
                <p>{copy.contact.success.body}</p>
              </div>
            ) : null}
            {status === "error" ? (
              <p className="form-status err" role="alert">
                {copy.contact.error}
              </p>
            ) : null}

            <div className="cform-row">
              <div className="field">
                <label htmlFor="contact-name">
                  {copy.contact.labels.name}
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder={copy.contact.placeholders.name}
                />
              </div>
              <div className="field">
                <label htmlFor="contact-email">
                  {copy.contact.labels.email}
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder={copy.contact.placeholders.email}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="contact-subject">
                {copy.contact.labels.subject}
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                required
                value={form.subject}
                onChange={handleChange}
                placeholder={copy.contact.placeholders.subject}
              />
            </div>

            <div className="field">
              <label htmlFor="contact-message">
                {copy.contact.labels.message}
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder={copy.contact.placeholders.message}
              />
            </div>

            <div className="cform-foot">
              <button
                className="submit"
                type="submit"
                disabled={status === "sending"}
              >
                {status === "sending"
                  ? copy.contact.labels.sending
                  : copy.contact.labels.submit}
                <span aria-hidden="true"> ↗</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
