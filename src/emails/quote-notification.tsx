import { Body, Container, Head, Heading, Html, Link, Preview, Section, Text } from "@react-email/components";

export type QuoteEmailRow = { label: string; value: string };

type QuoteNotificationProps = {
  title: string;
  rows: QuoteEmailRow[];
  phone: string;
  reference: string;
};

const ink = "#16181D";
const slate = "#4A4F58";

/** Internal email to RCS (QUOTE_NOTIFY_TO): every field in a simple table plus a tel: link. */
export default function QuoteNotificationEmail({ title, rows, phone, reference }: QuoteNotificationProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{title}</Preview>
      <Body style={{ backgroundColor: "#F5F5F4", fontFamily: "Arial, sans-serif", color: ink, margin: 0 }}>
        <Container
          style={{ backgroundColor: "#ffffff", padding: "28px", maxWidth: "600px", borderRadius: "8px" }}
        >
          <Heading as="h1" style={{ fontSize: "20px", margin: "0 0 4px" }}>
            {title}
          </Heading>
          <Text style={{ color: slate, margin: "0 0 20px" }}>Submitted through the website quote form.</Text>
          <Section>
            <table cellPadding={6} style={{ borderCollapse: "collapse", width: "100%" }}>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} style={{ borderTop: "1px solid #E4E4E2" }}>
                    <td style={{ color: slate, whiteSpace: "nowrap", verticalAlign: "top", width: "38%" }}>
                      {row.label}
                    </td>
                    <td style={{ whiteSpace: "pre-wrap" }}>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>
          <Text style={{ margin: "24px 0 0" }}>
            <Link
              href={`tel:${phone}`}
              style={{
                backgroundColor: "#B94A15",
                color: "#ffffff",
                padding: "10px 18px",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Call {phone}
            </Link>
          </Text>
          <Text style={{ color: slate, fontSize: "12px", margin: "24px 0 0" }}>Reference: {reference}</Text>
        </Container>
      </Body>
    </Html>
  );
}
