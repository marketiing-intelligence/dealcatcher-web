import { Metadata } from "next";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/sections/home/Footer";
import { Container } from "@/components/shared/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { GradientText } from "@/components/ui/gradient-text";
import { Mail, Clock, MapPin } from "lucide-react";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { i18n, type Locale } from "@/lib/i18n/config";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const titles = {
    en: "Contact | DealCatcher",
    no: "Kontakt | DealCatcher",
  };

  const descriptions = {
    en: "Get in touch with us. We'll respond within 24 hours.",
    no: "Ta kontakt med oss. Vi svarer innen 24 timer.",
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <Navbar lang={lang} dict={dict} />
      <main className="pt-20">
        <section className="py-20 md:py-32">
          <Container>
            {/* Hero */}
            <div className="max-w-2xl mx-auto text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
                {dict.contactPage.badge}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-clash font-semibold mb-6">
                {dict.contactPage.title}{" "}
                <GradientText>{dict.contactPage.titleHighlight}</GradientText>
              </h1>
              <p className="text-lg text-muted-foreground">
                {dict.contactPage.subtitle}
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
              {/* Form */}
              <div className="lg:col-span-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-12">
                  <ContactForm
                    lang={lang}
                    dict={{
                      form: dict.contactPage.form,
                      validation: dict.contactPage.validation,
                    }}
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="lg:col-span-2 space-y-6">
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {dict.contactPage.info.email}
                      </p>
                      <a
                        href={`mailto:${dict.contactPage.info.emailValue}`}
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        {dict.contactPage.info.emailValue}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {dict.contactPage.info.responseTime}
                      </p>
                      <p className="text-foreground">
                        {dict.contactPage.info.responseValue}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {dict.contactPage.info.location}
                      </p>
                      <p className="text-foreground">
                        {dict.contactPage.info.locationValue}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Company Info */}
                <div className="text-sm text-muted-foreground space-y-1 pt-4">
                  <p className="font-medium text-foreground">DealCatcher</p>
                  <p>Rapid Software House sp. z o.o.</p>
                  <p>NIP: 5273033283</p>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer lang={lang} dict={dict.footer} />
    </>
  );
}
