import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/sections/home/Footer";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  return {
    title:
      lang === "no"
        ? "Vilkår for Bruk | DealCatcher"
        : "Terms of Service | DealCatcher",
    description:
      lang === "no"
        ? "Les våre vilkår for bruk av DealCatcher sine tjenester og nettsted."
        : "Read our terms of service for using DealCatcher's services and website.",
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const terms = dict.terms;

  return (
    <>
      <Navbar lang={lang} dict={dict} />
      <main className="pt-16 md:pt-20">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            {terms.title}
          </h1>
          <p className="text-muted-foreground mb-12">{terms.lastUpdated}</p>

          <div className="prose prose-invert prose-lg max-w-none">
            {/* Introduction */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                {terms.sections.intro.title}
              </h2>
              <p className="text-muted-foreground">
                {terms.sections.intro.content}
              </p>
            </section>

            {/* Definitions */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                {terms.sections.definitions.title}
              </h2>
              <div className="space-y-4">
                {terms.sections.definitions.items.map(
                  (
                    item: { term: string; definition: string },
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="bg-card border border-border rounded-lg p-4"
                    >
                      <p className="text-foreground font-semibold">
                        {item.term}
                      </p>
                      <p className="text-muted-foreground">{item.definition}</p>
                    </div>
                  )
                )}
              </div>
            </section>

            {/* Services */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                {terms.sections.services.title}
              </h2>
              <p className="text-muted-foreground mb-4">
                {terms.sections.services.content}
              </p>
              <ul className="space-y-2 mb-4">
                {terms.sections.services.list.map(
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
              <p className="text-muted-foreground text-sm italic">
                {terms.sections.services.note}
              </p>
            </section>

            {/* Use of Website */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                {terms.sections.useOfWebsite.title}
              </h2>
              <p className="text-muted-foreground mb-4">
                {terms.sections.useOfWebsite.intro}
              </p>
              <ul className="space-y-2">
                {terms.sections.useOfWebsite.rules.map(
                  (rule: string, index: number) => (
                    <li
                      key={index}
                      className="text-muted-foreground flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {rule}
                    </li>
                  )
                )}
              </ul>
            </section>

            {/* Intellectual Property */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                {terms.sections.intellectualProperty.title}
              </h2>
              <p className="text-muted-foreground">
                {terms.sections.intellectualProperty.content}
              </p>
            </section>

            {/* Disclaimer */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                {terms.sections.disclaimer.title}
              </h2>
              <p className="text-muted-foreground">
                {terms.sections.disclaimer.content}
              </p>
            </section>

            {/* Liability */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                {terms.sections.liability.title}
              </h2>
              <p className="text-muted-foreground">
                {terms.sections.liability.content}
              </p>
            </section>

            {/* Third Party */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                {terms.sections.thirdParty.title}
              </h2>
              <p className="text-muted-foreground">
                {terms.sections.thirdParty.content}
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                {terms.sections.governing.title}
              </h2>
              <p className="text-muted-foreground">
                {terms.sections.governing.content}
              </p>
            </section>

            {/* Changes */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                {terms.sections.changes.title}
              </h2>
              <p className="text-muted-foreground">
                {terms.sections.changes.content}
              </p>
            </section>

            {/* Contact */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                {terms.sections.contact.title}
              </h2>
              <p className="text-muted-foreground mb-4">
                {terms.sections.contact.content}
              </p>
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-foreground font-medium">
                  {terms.sections.contact.company}
                </p>
                <p className="text-muted-foreground">
                  {terms.sections.contact.address}
                </p>
                <p className="text-muted-foreground">
                  {terms.sections.contact.email}
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer lang={lang} dict={dict.footer} />
    </>
  );
}
