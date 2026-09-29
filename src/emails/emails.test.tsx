import { render } from "@react-email/render";
import { describe, expect, it } from "vitest";
import QuoteConfirmationEmail from "./quote-confirmation";
import QuoteNotificationEmail from "./quote-notification";

describe("email templates", () => {
  it("renders the RCS notification with every row and a tel: link", async () => {
    const html = await render(
      QuoteNotificationEmail({
        title: "New quote: Cuttack → Kolkata (Part Truck Load)",
        rows: [
          { label: "Name", value: "Test Buyer" },
          { label: "Phone", value: "+919876543210" },
        ],
        phone: "+919876543210",
        reference: "test-id",
      }),
    );
    expect(html).toContain("New quote: Cuttack → Kolkata (Part Truck Load)");
    expect(html).toContain("Test Buyer");
    expect(html).toContain('href="tel:+919876543210"');
    expect(html).toContain("test-id");
  });

  it("renders the customer confirmation with the RCS phone number", async () => {
    const html = await render(
      QuoteConfirmationEmail({
        name: "Test Buyer",
        route: "Cuttack → Kolkata",
        companyName: "RCS Logistic Solutions",
        phone: "+91 99388 74147",
        phoneHref: "tel:+919938874147",
      }),
    );
    expect(html).toContain("Quote request received");
    expect(html).toContain("Cuttack → Kolkata");
    expect(html).toContain("tel:+919938874147");
  });
});
