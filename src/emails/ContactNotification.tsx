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

interface ContactNotificationProps {
  data: {
    name: string;
    email: string;
    company?: string;
    message: string;
  };
  lang?: "en" | "no";
}

export default function ContactNotification({
  data,
  lang = "en",
}: ContactNotificationProps) {
  const labels = {
    en: {
      preview: `New message from ${data.name}`,
      heading: "New contact form submission",
      name: "Full name:",
      email: "Email:",
      company: "Company:",
      message: "Message:",
    },
    no: {
      preview: `Ny melding fra ${data.name}`,
      heading: "Ny melding fra kontaktskjema",
      name: "Fullt navn:",
      email: "E-post:",
      company: "Firma:",
      message: "Melding:",
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

            {data.company && (
              <>
                <Text style={label}>{t.company}</Text>
                <Text style={value}>{data.company}</Text>
              </>
            )}

            <Hr style={hr} />

            <Text style={label}>{t.message}</Text>
            <Text style={messageText}>{data.message}</Text>
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
  color: "#34D399",
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

const messageText = {
  color: "#F5F5F5",
  fontSize: "16px",
  lineHeight: "1.6",
  whiteSpace: "pre-wrap" as const,
};
