import { useReveal } from "@/hooks/useReveal";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, MessageCircle, ArrowRight, Check, CalendarIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ContactProps {
  t: Record<string, string>;
  lang?: string;
}


const getContactInfo = (lang: string) => [
  {
    label: lang === 'en' ? 'Addresses' : lang === 'es' ? 'Direcciones' : lang === 'fr' ? 'Adresses' : 'Endereços',
    value: (
      <div className="space-y-3">
        <div>
          <span className="block font-['Cormorant_Garamond',serif] text-[1.15rem] font-light" style={{ color: "hsl(36,18%,96%)" }}>
            Av. Paulista, 726 - Bela Vista
          </span>
          <span className="block font-['DM_Sans',sans-serif] text-[0.75rem] font-light mt-0.5" style={{ color: "rgba(247,245,241,0.6)" }}>
            01310-910 — São Paulo, SP, Brasil
          </span>
        </div>
        <div>
          <span className="block font-['Cormorant_Garamond',serif] text-[1.15rem] font-light" style={{ color: "hsl(36,18%,96%)" }}>
            BP 027 2C, parc d'Activités
          </span>
          <span className="block font-['DM_Sans',sans-serif] text-[0.75rem] font-light mt-0.5" style={{ color: "rgba(247,245,241,0.6)" }}>
            L-8308 Capellen — G.D. Luxembourg
          </span>
        </div>
      </div>
    ),
    Icon: MapPin,
  },
  {
    label: "Whatsapp",
    value: "+55 11 99759-5286",
    Icon: MessageCircle,
    href: "https://wa.me/5511997595286",
    isText: true,
  },
];

const getFormTitle = (lang: string) => {
  if (lang === 'en') return 'Start a Dialogue';
  if (lang === 'es') return 'Iniciar Diálogo';
  if (lang === 'fr') return 'Démarrer un Dialogue';
  return 'Iniciar Diálogo';
};

const ContactSection = ({ t, lang = 'pt' }: ContactProps) => {
  const ref = useReveal();
  const contactInfo = getContactInfo(lang);
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const recaptchaWidgetId = useRef<number | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaError, setRecaptchaError] = useState(false);
  const [legalAccepted, setLegalAccepted] = useState(false);
  const [legalError, setLegalError] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [marketingError, setMarketingError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [volume, setVolume] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [meetingDate, setMeetingDate] = useState<Date | undefined>(undefined);
  const [fieldsError, setFieldsError] = useState(false);

  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";


  useEffect(() => {
    if (!recaptchaRef.current || !siteKey || siteKey === "YOUR_SITE_KEY_HERE") return;

    const renderWidget = () => {
      const grecaptcha = (window as unknown as { grecaptcha?: { render: (container: HTMLElement | string, opts: object) => number; reset: (id?: number) => void; ready: (cb: () => void) => void } }).grecaptcha;
      if (!grecaptcha) return;

      grecaptcha.ready(() => {
        if (recaptchaRef.current && recaptchaWidgetId.current === null) {
          recaptchaWidgetId.current = grecaptcha.render(recaptchaRef.current as HTMLElement, {
            sitekey: siteKey,
            callback: (token: string) => {
              setRecaptchaToken(token);
              setRecaptchaError(false);
            },
            "expired-callback": () => {
              setRecaptchaToken(null);
            },
            "error-callback": () => {
              setRecaptchaToken(null);
              setRecaptchaError(true);
            },
            theme: "dark",
            size: "normal",
          });
        }
      });
    };

    const grecaptcha = (window as unknown as { grecaptcha?: { ready: (cb: () => void) => void } }).grecaptcha;
    if (grecaptcha) {
      renderWidget();
    } else {
      const timer = setTimeout(renderWidget, 500);
      return () => clearTimeout(timer);
    }
  }, [siteKey]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fieldsOk = name.trim().length > 0 && email.trim().length > 0;
    const legalOk = legalAccepted;
    const marketingOk = marketingConsent;
    const recaptchaOk = !!recaptchaToken;
    setFieldsError(!fieldsOk);
    setLegalError(!legalOk);
    setMarketingError(!marketingOk);
    setRecaptchaError(!recaptchaOk);
    if (!fieldsOk || !legalOk || !marketingOk || !recaptchaOk) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), 15000)
      );
      const { data, error } = await Promise.race([
        supabase.functions.invoke("submit-contact", {
          body: { name, company, email, volume, message, subject, meetingDate: meetingDate ? meetingDate.toISOString() : null, marketingConsent, recaptchaToken },
        }),

        timeout,
      ]);

      if (error || !data?.success) {
        setSubmitStatus('error');
        setIsSubmitting(false);
        return;
      }

      setSubmitStatus('success');
      setIsSubmitting(false);
      setName("");
      setCompany("");
      setEmail("");
      setVolume("");
      setMessage("");
      setSubject("");
      setMeetingDate(undefined);

      setLegalAccepted(false);
      setMarketingConsent(false);
      setRecaptchaToken(null);
      if (recaptchaWidgetId.current !== null) {
        const grecaptcha = (window as unknown as { grecaptcha?: { reset: (id?: number) => void } }).grecaptcha;
        grecaptcha?.reset(recaptchaWidgetId.current);
      }
    } catch {
      setSubmitStatus('error');
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden" style={{ background: "linear-gradient(170deg, hsl(218,100%,12%) 0%, hsl(218,100%,8%) 100%)", color: "hsl(36,18%,96%)" }}>
      <div className="absolute top-[-200px] right-[-200px] w-[800px] h-[800px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, hsla(218,80%,30%,0.15) 0%, transparent 60%)" }} />
      <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, hsla(37,45%,61%,0.06) 0%, transparent 60%)" }} />
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="pt-[100px] md:pt-[160px] pb-[80px] md:pb-[100px]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16" ref={ref}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-[100px] items-start">
            <div>
              <p className="reveal text-[0.65rem] tracking-[0.35em] uppercase flex items-center gap-4 mb-6 font-semibold" style={{ color: "hsl(218,100%,60%)" }}>
                <span className="w-10 h-px flex-shrink-0" style={{ background: "linear-gradient(90deg, hsl(218,100%,60%), transparent)" }} />
                {t["contact.label"]}
              </p>
              <h2 className="reveal reveal-delay-1 font-['Cormorant_Garamond',serif] font-light leading-[1.08] tracking-[-0.02em] mb-8" style={{ fontSize: "clamp(2.4rem, 4.5vw, 4.5rem)", color: "hsl(36,18%,96%)" }} dangerouslySetInnerHTML={{ __html: t["contact.title"] }} />
              <p className="reveal reveal-delay-2 font-['DM_Sans',sans-serif] text-[0.92rem] leading-[1.9] font-light mb-16 max-w-[440px]" style={{ color: "rgba(247,245,241,0.6)" }}>{t["contact.intro"]}</p>

              <div className="space-y-0">
                {contactInfo.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
                    className="flex items-start gap-6 py-8 group"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(115,120,170,0.25)]" style={{ background: "linear-gradient(135deg, rgba(115,120,170,0.15) 0%, rgba(115,120,170,0.05) 100%)", border: "1.5px solid rgba(115,120,170,0.35)", boxShadow: "0 0 15px rgba(115,120,170,0.1)" }}>
                      <item.Icon size={20} className="transition-colors duration-300" style={{ color: "hsl(218,100%,65%)" }} />
                    </div>
                    <div>
                      <span className="block text-[0.65rem] tracking-[0.35em] uppercase mb-2.5 font-medium transition-colors" style={{ color: "hsl(218,100%,65%)" }}>{item.label}</span>
                      {item.isText ? (
                        item.href ? (
                          <a href={item.href} target={item.href.startsWith('https') ? '_blank' : undefined} rel="noopener noreferrer" className="font-['Cormorant_Garamond',serif] text-[1.3rem] font-light no-underline hover:opacity-70 transition-opacity" style={{ color: "hsl(36,18%,96%)" }}>{item.value}</a>
                        ) : (
                          <span className="font-['Cormorant_Garamond',serif] text-[1.3rem] font-light" style={{ color: "hsl(36,18%,96%)" }}>{item.value as string}</span>
                        )
                      ) : (
                        item.value
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative rounded-sm"
              style={{
                background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(24px)",
              }}
            >
              <div className="absolute top-0 left-0 w-full h-[2px] rounded-t-sm" style={{ background: "linear-gradient(90deg, hsl(218,100%,45%), hsl(37,45%,61%), transparent)" }} />
              
              <div className="p-8 md:p-12">
                {submitStatus === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center py-10 md:py-14"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-7"
                      style={{ background: "linear-gradient(135deg, hsl(218,80%,25%), hsl(218,60%,16%))", border: "1.5px solid hsl(218,100%,55%)", boxShadow: "0 0 30px rgba(70,112,178,0.25)" }}
                    >
                      <Check size={28} style={{ color: "hsl(218,100%,72%)" }} />
                    </div>
                    <h3 className="font-['Cormorant_Garamond',serif] font-light text-2xl md:text-[1.8rem] mb-4 tracking-[-0.01em]" style={{ color: "hsl(36,18%,96%)" }}>
                      {lang === 'en' ? 'Message received' : lang === 'es' ? 'Mensaje recibido' : lang === 'fr' ? 'Message reçu' : 'Mensagem recebida'}
                    </h3>
                    <p className="font-['DM_Sans',sans-serif] text-[0.9rem] leading-[1.85] font-light max-w-[320px] mb-9" style={{ color: "rgba(247,245,241,0.5)" }}>
                      {lang === 'en' ? 'Thank you for reaching out. Our team will review your inquiry and be in touch shortly.' : lang === 'es' ? 'Gracias por contactarnos. Nuestro equipo revisará su consulta y se pondrá en contacto en breve.' : lang === 'fr' ? 'Merci de nous avoir contactés. Notre équipe examinera votre demande et vous recontactera bientôt.' : 'Obrigado pelo contato. Nossa equipe vai analisar sua mensagem e retornar em breve.'}
                    </p>
                    <button
                      onClick={() => setSubmitStatus('idle')}
                      className="text-[0.68rem] tracking-[0.2em] uppercase underline underline-offset-4 transition-opacity hover:opacity-70 bg-transparent border-none cursor-pointer"
                      style={{ color: "hsl(218,100%,65%)" }}
                    >
                      {lang === 'en' ? 'Send another message' : lang === 'es' ? 'Enviar otro mensaje' : lang === 'fr' ? 'Envoyer un autre message' : 'Enviar outra mensagem'}
                    </button>
                  </motion.div>
                ) : (
                <>
                <h3 className="font-['Cormorant_Garamond',serif] font-light text-2xl md:text-[1.8rem] mb-10 tracking-[-0.01em]" style={{ color: "hsl(36,18%,96%)" }}>
                  {getFormTitle(lang)}
                </h3>

                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="group">
                      <label className="block text-[0.58rem] tracking-[0.25em] uppercase mb-2.5 transition-colors group-focus-within:text-[hsl(218,100%,60%)]" style={{ color: "rgba(247,245,241,0.55)" }}>{t["form.nome"]}</label>
                      <input name="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-0 py-3 font-['DM_Sans',sans-serif] text-[0.88rem] font-light outline-none transition-all bg-transparent" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", color: "hsl(36,18%,96%)" }} />
                    </div>
                    <div className="group">
                      <label className="block text-[0.58rem] tracking-[0.25em] uppercase mb-2.5 transition-colors group-focus-within:text-[hsl(218,100%,60%)]" style={{ color: "rgba(247,245,241,0.55)" }}>{t["form.empresa"]}</label>
                      <input name="company" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full px-0 py-3 font-['DM_Sans',sans-serif] text-[0.88rem] font-light outline-none transition-all bg-transparent" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", color: "hsl(36,18%,96%)" }} />
                    </div>
                    <div className="group md:col-span-2">
                      <label className="block text-[0.58rem] tracking-[0.25em] uppercase mb-2.5 transition-colors group-focus-within:text-[hsl(218,100%,60%)]" style={{ color: "rgba(247,245,241,0.55)" }}>{t["form.email"]}</label>
                      <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-0 py-3 font-['DM_Sans',sans-serif] text-[0.88rem] font-light outline-none transition-all bg-transparent" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", color: "hsl(36,18%,96%)" }} />
                    </div>
                    <div className="group">
                      <label className="block text-[0.58rem] tracking-[0.25em] uppercase mb-2.5 transition-colors group-focus-within:text-[hsl(218,100%,60%)]" style={{ color: "rgba(247,245,241,0.55)" }}>{t["form.volume"]}</label>
                      <input name="volume" value={volume} onChange={(e) => setVolume(e.target.value)} className="w-full px-0 py-3 font-['DM_Sans',sans-serif] text-[0.88rem] font-light outline-none transition-all bg-transparent" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", color: "hsl(36,18%,96%)" }} />
                    </div>
                    <div className="group">
                      <label className="block text-[0.58rem] tracking-[0.25em] uppercase mb-2.5 transition-colors group-focus-within:text-[hsl(218,100%,60%)]" style={{ color: "rgba(247,245,241,0.55)" }}>
                        {lang === 'en' ? 'Preferred Meeting Date' : lang === 'es' ? 'Fecha Preferida de Reunión' : lang === 'fr' ? 'Date de Réunion Souhaitée' : 'Data Preferida da Reunião'}
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            type="button"
                            className={cn(
                              "w-full flex items-center justify-between px-0 py-3 font-['DM_Sans',sans-serif] text-[0.88rem] font-light outline-none transition-all bg-transparent text-left",
                              !meetingDate && "opacity-60"
                            )}
                            style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", color: "hsl(36,18%,96%)" }}
                          >
                            <span>
                              {meetingDate
                                ? format(meetingDate, "PPP")
                                : (lang === 'en' ? 'Pick a date' : lang === 'es' ? 'Elegir fecha' : lang === 'fr' ? 'Choisir une date' : 'Escolher data')}
                            </span>
                            <CalendarIcon size={14} style={{ color: "hsl(218,100%,65%)" }} />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                          <Calendar
                            mode="single"
                            selected={meetingDate}
                            onSelect={setMeetingDate}
                            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="group md:col-span-2">
                      <label className="block text-[0.58rem] tracking-[0.25em] uppercase mb-2.5 transition-colors group-focus-within:text-[hsl(218,100%,60%)]" style={{ color: "rgba(247,245,241,0.55)" }}>
                        {lang === 'en' ? 'Subject' : lang === 'es' ? 'Asunto' : lang === 'fr' ? 'Sujet' : 'Assunto'}
                      </label>
                      <input name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder={lang === 'en' ? 'What is this about?' : lang === 'es' ? '¿De qué se trata?' : lang === 'fr' ? 'De quoi s\'agit-il ?' : 'Sobre o que é?'} className="w-full px-0 py-3 font-['DM_Sans',sans-serif] text-[0.88rem] font-light outline-none transition-all bg-transparent placeholder:opacity-40" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", color: "hsl(36,18%,96%)" }} />
                    </div>
                    <div className="group md:col-span-2">
                      <label className="block text-[0.58rem] tracking-[0.25em] uppercase mb-2.5 transition-colors group-focus-within:text-[hsl(218,100%,60%)]" style={{ color: "rgba(247,245,241,0.55)" }}>{t["form.msg"]}</label>
                      <textarea name="message" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-0 py-3 min-h-[100px] resize-y font-['DM_Sans',sans-serif] text-[0.88rem] font-light outline-none transition-all bg-transparent" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", color: "hsl(36,18%,96%)" }} />
                    </div>
                  </div>

                  {fieldsError && (
                    <p className="font-['DM_Sans',sans-serif] text-[0.72rem] leading-[1.6] -mt-2" style={{ color: "hsl(37,45%,61%)" }}>
                      {lang === 'en' ? 'Please fill in your name and email.' : lang === 'es' ? 'Por favor, complete su nombre y correo electrónico.' : lang === 'fr' ? 'Veuillez renseigner votre nom et e-mail.' : 'Preencha nome e e-mail.'}
                    </p>
                  )}

                  <AnimatePresence>
                    {name.trim() && email.trim() && (
                      <motion.div
                        key="consent"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col gap-4"
                      >
                        <label className="flex items-start gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={legalAccepted}
                            onChange={(e) => {
                              setLegalAccepted(e.target.checked);
                              if (e.target.checked) setLegalError(false);
                            }}
                            className="mt-0.5 w-4 h-4 cursor-pointer accent-[hsl(232,25%,56%)]"
                          />
                          <span className="font-['DM_Sans',sans-serif] text-[0.75rem] leading-[1.6] font-light transition-colors group-hover:opacity-90" style={{ color: "rgba(247,245,241,0.55)" }}>
                            {t["form.legal.start"]} <Link to="/terms" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70 transition-opacity" style={{ color: "hsl(218,100%,65%)" }}>{t["form.terms.link"]}</Link> {t["form.legal.middle"]} <Link to="/privacy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70 transition-opacity" style={{ color: "hsl(218,100%,65%)" }}>{t["form.privacy.link"]}</Link>.
                          </span>
                        </label>

                        {legalError && (
                          <p className="font-['DM_Sans',sans-serif] text-[0.72rem] leading-[1.6] -mt-2" style={{ color: "hsl(37,45%,61%)" }}>
                            {t["form.legal.required"]}
                          </p>
                        )}

                        <label className="flex items-start gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={marketingConsent}
                            onChange={(e) => {
                              setMarketingConsent(e.target.checked);
                              if (e.target.checked) setMarketingError(false);
                            }}
                            className="mt-0.5 w-4 h-4 cursor-pointer accent-[hsl(232,25%,56%)]"
                          />
                          <span className="font-['DM_Sans',sans-serif] text-[0.75rem] leading-[1.6] font-light transition-colors group-hover:opacity-90" style={{ color: "rgba(247,245,241,0.55)" }}>
                            {t["form.marketing"]}
                          </span>
                        </label>

                        {marketingError && (
                          <p className="font-['DM_Sans',sans-serif] text-[0.72rem] leading-[1.6] -mt-2" style={{ color: "hsl(37,45%,61%)" }}>
                            {t["form.marketing.required"]}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-2">
                    <div ref={recaptchaRef} className="g-recaptcha" />
                    {recaptchaError && (
                      <p className="font-['DM_Sans',sans-serif] text-[0.72rem] leading-[1.6] mt-2" style={{ color: "hsl(37,45%,61%)" }}>
                        {t["form.captcha.required"] || "Please complete the reCAPTCHA challenge."}
                      </p>
                    )}
                    {siteKey === "YOUR_SITE_KEY_HERE" && (
                      <p className="font-['DM_Sans',sans-serif] text-[0.72rem] leading-[1.6] mt-2" style={{ color: "hsl(37,45%,61%)" }}>
                        reCAPTCHA site key not configured. Please add VITE_RECAPTCHA_SITE_KEY to .env.
                      </p>
                    )}
                  </div>

                  {submitStatus === 'error' && (
                    <p className="font-['DM_Sans',sans-serif] text-[0.85rem] leading-[1.6]" style={{ color: "hsl(37,45%,61%)" }}>
                      {lang === 'en' ? 'Failed to send. Please try again.' : lang === 'es' ? 'Error al enviar. Inténtalo de nuevo.' : lang === 'fr' ? 'Échec de l\'envoi. Veuillez réessayer.' : 'Falha ao enviar. Tente novamente.'}
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="self-start mt-4 px-10 py-4 font-['DM_Sans',sans-serif] text-[0.7rem] tracking-[0.25em] uppercase relative overflow-hidden group flex items-center gap-3 rounded-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: "hsl(232,25%,56%)", color: "hsl(36,18%,96%)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <span className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-600" style={{ background: "hsl(232,25%,48%)" }} />
                    <span className="relative z-[1]">{isSubmitting ? (lang === 'en' ? 'Verifying...' : lang === 'es' ? 'Verificando...' : lang === 'fr' ? 'Vérification...' : 'Verificando...') : t["contact.btn"]}</span>
                    <ArrowRight size={14} className="relative z-[1] group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </form>
                </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-16">
          <div className="py-14 md:py-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full aspect-[21/9] md:aspect-[3/1] overflow-hidden relative group rounded-sm"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0976951740286!2d-46.69389492378835!3d-23.56714186135059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce576890c4f4c1%3A0x7f22e4e6d8e3e5f5!2sAv.%20Paulista%2C%20726%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1" width="100%" height="100%" style={{ border: 0, filter: "invert(0.92) hue-rotate(180deg) brightness(0.75) contrast(1.2) saturate(0.3)" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Lumnis Capital Partners — São Paulo" className="transition-all duration-700 group-hover:scale-[1.02]" />
              <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, hsla(218,100%,10%,0.4) 0%, transparent 30%, transparent 70%, hsla(218,100%,10%,0.6) 100%)" }} />
              <a href="https://www.google.com/maps/search/?api=1&query=Av.+Paulista%2C+726+-+Bela+Vista%2C+S%C3%A3o+Paulo+-+SP" target="_blank" rel="noopener noreferrer" className="absolute bottom-4 right-4 z-10 flex items-center gap-2 px-5 py-2.5 font-['DM_Sans',sans-serif] text-[0.65rem] tracking-[0.2em] uppercase no-underline transition-all hover:gap-3 rounded-sm" style={{ background: "hsl(232,25%,56%)", color: "hsl(36,18%,96%)", backdropFilter: "blur(10px)" }}>
                Get Directions
                <ArrowRight size={12} />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
