import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/sections/home/Footer";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { WithdrawalForm } from "@/components/forms/WithdrawalForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  return {
    title:
      lang === "no"
        ? "Angreskjema | DealCatcher"
        : "Withdrawal Form | DealCatcher",
    description:
      lang === "no"
        ? "Bruk dette skjemaet for a trekke deg fra avtalen innen 14 dager i henhold til angrerettloven."
        : "Use this form to withdraw from your contract within 14 days under consumer law.",
  };
}

export default async function WithdrawalPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const withdrawal = dict.withdrawal;

  return (
    <>
      <Navbar lang={lang} dict={dict} />
      <main className="pt-16 md:pt-20">
        <div className="container mx-auto px-4 py-16 max-w-2xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            {withdrawal.title}
          </h1>
          <p className="text-muted-foreground mb-8">{withdrawal.subtitle}</p>

          {/* Recipient info */}
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {withdrawal.form.recipient}
            </p>
          </div>

          {/* Declaration */}
          <p className="text-muted-foreground mb-8">
            {withdrawal.form.declaration}
          </p>

          {/* Form */}
          <WithdrawalForm lang={lang} dict={withdrawal.form} />
        </div>
      </main>
      <Footer lang={lang} dict={dict.footer} />
    </>
  );
}
