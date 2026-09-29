import { Body, Container, Head, Heading, Html, Link, Preview, Text } from "@react-email/components";

type QuoteConfirmationProps = {
  name: string;
  route: string;
  companyName: string;
  phone: string;
  phoneHref: string;
};

const ink = "#19283B";
const slate = "#4F5B6B";

/** Short confirmation to the customer — only sent when they gave an email address. */
export default function QuoteConfirmationEmail({
  name,
  route,
  companyName,
  phone,
  phoneHref,
}: QuoteConfirmationProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>We received your quote request — {route}</Preview>
      <Body style={{ backgroundColor: "#F3F5F8", fontFamily: "Arial, sans-serif", color: ink, margin: 0 }}>
        <Container
          style={{ backgroundColor: "#ffffff", padding: "28px", maxWidth: "560px", borderRadius: "8px" }}
        >
          <Heading as="h1" style={{ fontSize: "20px", margin: "0 0 12px" }}>
            Quote request received
          </Heading>
          <Text style={{ color: slate }}>Hello {name},</Text>
          <Text style={{ color: slate }}>
            Thank you for your quote request for {route}. Our team will review the details and contact you on
            the phone number you gave us with a quote.
          </Text>
          <Text style={{ color: slate }}>
            Need to talk sooner? Call us on{" "}
            <Link href={phoneHref} style={{ color: "#C74916", fontWeight: 600 }}>
              {phone}
            </Link>
            .
          </Text>
          <Text style={{ color: slate, margin: "24px 0 0" }}>— {companyName}</Text>
        </Container>
      </Body>
    </Html>
  );
}
