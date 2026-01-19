import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/sections/home/Footer";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  return {
    title:
      lang === "no"
        ? "Personvernerklæring | DealCatcher"
        : "Privacy Policy | DealCatcher",
    description:
      lang === "no"
        ? "Les vår personvernerklæring for å forstå hvordan vi samler inn, bruker og beskytter dine personopplysninger."
        : "Read our privacy policy to understand how we collect, use, and protect your personal information.",
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const privacy = dict.privacy;

  return (
    <>
      <Navbar lang={lang} dict={dict} />
      <main className="pt-16 md:pt-20">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            {privacy.title}
          </h1>
          <p className="text-muted-foreground mb-12">{privacy.lastUpdated}</p>

          <div className="prose prose-invert prose-lg max-w-none">
            {/* Introduction */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                {privacy.sections.intro.title}
              </h2>
              <p className="text-muted-foreground">
                {privacy.sections.intro.content}
              </p>
            </section>

            {/* Data Controller */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                {privacy.sections.controller.title}
              </h2>
              <p className="text-muted-foreground mb-4">
                {privacy.sections.controller.content}
              </p>
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-foreground font-medium">
                  {privacy.sections.controller.company}
                </p>
                <p className="text-muted-foreground">
                  {privacy.sections.controller.address}
                </p>
                <p className="text-muted-foreground">
                  {privacy.sections.controller.krs}
                </p>
                <p className="text-muted-foreground">
                  {privacy.sections.controller.nip}
                </p>
                <p className="text-muted-foreground">
                  {privacy.sections.controller.email}
                </p>
              </div>
            </section>

            {/* Data Collected */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                {privacy.sections.dataCollected.title}
              </h2>
              <p className="text-muted-foreground mb-6">
                {privacy.sections.dataCollected.intro}
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-3">
                    {privacy.sections.dataCollected.contactForm.title}
                  </h3>
                  <ul className="space-y-2">
                    {privacy.sections.dataCollected.contactForm.items.map(
                      (item: string, index: number) => (
                        <li
                          key={index}
                          className="text-muted-foreground flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-3">
                    {privacy.sections.dataCollected.automatic.title}
                  </h3>
                  <ul className="space-y-2">
                    {privacy.sections.dataCollected.automatic.items.map(
                      (item: string, index: number) => (
                        <li
                          key={index}
                          className="text-muted-foreground flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </section>

            {/* Cookies */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                {privacy.sections.cookies.title}
              </h2>
              <p className="text-muted-foreground mb-6">
                {privacy.sections.cookies.content}
              </p>

              <div className="space-y-4">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-2">
                    {privacy.sections.cookies.types.essential.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {privacy.sections.cookies.types.essential.description}
                  </p>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-2">
                    {privacy.sections.cookies.types.analytics.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {privacy.sections.cookies.types.analytics.description}
                  </p>
                </div>
              </div>

              {/* Cookie consent info */}
              {privacy.sections.cookies.consent && (
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-4">
                  <p className="text-muted-foreground">
                    {privacy.sections.cookies.consent}
                  </p>
                </div>
              )}

              <p className="text-muted-foreground mt-4">
                {privacy.sections.cookies.manage}
              </p>
            </section>

            {/* Purpose */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                {privacy.sections.purpose.title}
              </h2>
              <p className="text-muted-foreground mb-6">
                {privacy.sections.purpose.intro}
              </p>

              <div className="space-y-4">
                {privacy.sections.purpose.purposes.map(
                  (
                    purpose: { title: string; basis: string },
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="bg-card border border-border rounded-lg p-4"
                    >
                      <p className="text-foreground font-medium">
                        {purpose.title}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {purpose.basis}
                      </p>
                    </div>
                  )
                )}
              </div>
            </section>

            {/* Retention */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                {privacy.sections.retention.title}
              </h2>
              <p className="text-muted-foreground mb-4">
                {privacy.sections.retention.content}
              </p>
              <ul className="space-y-2">
                {privacy.sections.retention.periods.map(
                  (period: string, index: number) => (
                    <li
                      key={index}
                      className="text-muted-foreground flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {period}
                    </li>
                  )
                )}
              </ul>
            </section>

            {/* Rights */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                {privacy.sections.rights.title}
              </h2>
              <p className="text-muted-foreground mb-6">
                {privacy.sections.rights.intro}
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {privacy.sections.rights.list.map(
                  (
                    right: { title: string; description: string },
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="bg-card border border-border rounded-lg p-4"
                    >
                      <h3 className="font-semibold text-foreground mb-1">
                        {right.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {right.description}
                      </p>
                    </div>
                  )
                )}
              </div>

              <p className="text-muted-foreground mt-6">
                {privacy.sections.rights.exercise}
              </p>
            </section>

            {/* Third Party */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                {privacy.sections.thirdParty.title}
              </h2>
              <p className="text-muted-foreground mb-4">
                {privacy.sections.thirdParty.content}
              </p>

              <div className="bg-card border border-border rounded-lg p-6">
                {privacy.sections.thirdParty.services.map(
                  (
                    service: { name: string; purpose: string; privacy: string },
                    index: number
                  ) => (
                    <div key={index}>
                      <p className="text-foreground font-medium">
                        {service.name}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {service.purpose}
                      </p>
                      <Link
                        href={service.privacy}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary text-sm hover:underline"
                      >
                        {service.privacy}
                      </Link>
                    </div>
                  )
                )}
              </div>
            </section>

            {/* International Transfers */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                {privacy.sections.transfers.title}
              </h2>
              <p className="text-muted-foreground">
                {privacy.sections.transfers.content}
              </p>
            </section>

            {/* Security */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                {privacy.sections.security.title}
              </h2>
              <p className="text-muted-foreground">
                {privacy.sections.security.content}
              </p>
            </section>

            {/* Changes */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                {privacy.sections.changes.title}
              </h2>
              <p className="text-muted-foreground">
                {privacy.sections.changes.content}
              </p>
            </section>

            {/* Contact */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                {privacy.sections.contact.title}
              </h2>
              <p className="text-muted-foreground mb-4">
                {privacy.sections.contact.content}
              </p>
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-muted-foreground">
                  {privacy.sections.contact.email}
                </p>
                <p className="text-muted-foreground">
                  {privacy.sections.contact.address}
                </p>
              </div>
              <p className="text-muted-foreground mt-4">
                {privacy.sections.contact.complaint}
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer lang={lang} dict={dict.footer} />
    </>
  );
}
