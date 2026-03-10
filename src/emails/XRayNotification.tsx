import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
  Preview,
} from "@react-email/components";

interface XRayNotificationProps {
  data: {
    name: string;
    email: string;
    company: string;
    companySize: string;
    problem: string;
    phone?: string;
  };
  lang?: "en" | "pl";
}

export default function XRayNotification({
  data,
  lang = "pl",
}: XRayNotificationProps) {
  const labels = {
    en: {
      preview: `X-Ray request from ${data.name} (${data.company})`,
      heading: "New X-Ray diagnostic request",
      name: "Full name:",
      email: "Email:",
      company: "Company:",
      companySize: "Company size:",
      problem: "Main problem/goal:",
      phone: "Phone:",
    },
    pl: {
      preview: `Zgłoszenie X-Ray od ${data.name} (${data.company})`,
      heading: "Nowe zgłoszenie X-Ray",
      name: "Imię i nazwisko:",
      email: "E-mail:",
      company: "Firma:",
      companySize: "Wielkość firmy:",
      problem: "Główny problem/cel:",
      phone: "Telefon:",
    },
  };

  const t = labels[lang];

  return (
    <Html>
      <Head />
      <Preview>{t.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>{t.heading}</Heading>
          <Section style={section}>
            <Text style={label}>{t.name}</Text>
            <Text style={value}>{data.name}</Text>

            <Text style={label}>{t.email}</Text>
            <Text style={value}>{data.email}</Text>

            {data.phone && (
              <>
                <Text style={label}>{t.phone}</Text>
                <Text style={value}>{data.phone}</Text>
              </>
            )}

            <Text style={label}>{t.company}</Text>
            <Text style={value}>{data.company}</Text>

            <Text style={label}>{t.companySize}</Text>
            <Text style={value}>{data.companySize}</Text>

            <Hr style={hr} />

            <Text style={label}>{t.problem}</Text>
            <Text style={problemText}>{data.problem}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#0A0A0A",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
};

const container = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "40px 20px",
};

const heading = {
  color: "#10B981", // Amber color for X-Ray (differentiate from contact)
  fontSize: "24px",
  fontWeight: "600",
  marginBottom: "24px",
};

const section = {
  backgroundColor: "#161616",
  borderRadius: "8px",
  padding: "24px",
  border: "1px solid #222222",
};

const label = {
  color: "#A1A1A1",
  fontSize: "12px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  marginBottom: "4px",
};

const value = {
  color: "#F5F5F5",
  fontSize: "16px",
  marginTop: "0",
  marginBottom: "16px",
};

const hr = {
  borderColor: "#222222",
  margin: "24px 0",
};

const problemText = {
  color: "#F5F5F5",
  fontSize: "16px",
  lineHeight: "1.6",
  whiteSpace: "pre-wrap" as const,
};
