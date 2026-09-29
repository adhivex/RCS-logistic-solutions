import { describe, expect, it } from "vitest";
import {
  createQuoteSchema,
  emptyQuoteValues,
  isIndianMobile,
  normalizeIndianMobile,
  todayInIndia,
  type QuoteFormValues,
} from "./quote";

describe("Indian mobile numbers", () => {
  it.each([
    ["9876543210", "+919876543210"],
    ["+91 98765 43210", "+919876543210"],
    ["919876543210", "+919876543210"],
    ["09876543210", "+919876543210"],
    ["98765-43210", "+919876543210"],
    ["(+91) 99388 74147", "+919938874147"],
  ])("accepts %s and normalises it to %s", (input, expected) => {
    expect(isIndianMobile(input)).toBe(true);
    expect(normalizeIndianMobile(input)).toBe(expected);
  });

  it.each(["5876543210", "987654321", "98765432101", "+1 9876543210", "abc", ""])("rejects %s", (input) => {
    expect(isIndianMobile(input)).toBe(false);
    expect(() => normalizeIndianMobile(input)).toThrow();
  });
});

describe("todayInIndia", () => {
  it("uses the IST calendar date", () => {
    // 20:00 UTC on 28 Sep is already 29 Sep in India (UTC+5:30).
    expect(todayInIndia(new Date("2026-09-28T20:00:00Z"))).toBe("2026-09-29");
  });
});

describe("quote schema", () => {
  const now = new Date("2026-09-29T06:00:00Z");
  const schema = createQuoteSchema(now);
  const valid: QuoteFormValues = {
    ...emptyQuoteValues("full_truck_load"),
    name: "Test Buyer",
    phone: "98765 43210",
    fromCity: "Cuttack",
    toCity: "Kolkata",
  };

  it("accepts the minimum required fields and normalises output", () => {
    const result = schema.safeParse(valid);
    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data.phone).toBe("+919876543210");
    expect(result.data.email).toBeUndefined();
    expect(result.data.weightTons).toBeUndefined();
    expect(result.data.pickupDate).toBeUndefined();
  });

  it("parses optional fields", () => {
    const result = schema.safeParse({
      ...valid,
      email: "buyer@example.com",
      weightTons: "12.5",
      pickupDate: "2026-10-02",
      cargoType: "Steel coils",
    });
    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data.weightTons).toBe(12.5);
    expect(result.data.pickupDate).toBe("2026-10-02");
  });

  const fieldError = (values: Partial<QuoteFormValues>, field: keyof QuoteFormValues) => {
    const result = schema.safeParse({ ...valid, ...values });
    expect(result.success).toBe(false);
    return result.error?.issues.find((issue) => issue.path[0] === field)?.message;
  };

  it("requires name, phone, service and both cities", () => {
    expect(fieldError({ name: "" }, "name")).toBe("Enter your name");
    expect(fieldError({ phone: "" }, "phone")).toBe("Enter your mobile number");
    expect(fieldError({ service: "" as QuoteFormValues["service"] }, "service")).toBe("Choose a service");
    expect(fieldError({ fromCity: "" }, "fromCity")).toBe("Enter the pickup city");
    expect(fieldError({ toCity: " " }, "toCity")).toBe("Enter the delivery city");
  });

  it("validates phone, email, weight and date", () => {
    expect(fieldError({ phone: "12345" }, "phone")).toBe("Enter a 10-digit mobile number");
    expect(fieldError({ email: "not-an-email" }, "email")).toMatch(/valid email/);
    expect(fieldError({ weightTons: "0" }, "weightTons")).toMatch(/between 0.1 and 100/);
    expect(fieldError({ weightTons: "150" }, "weightTons")).toMatch(/between 0.1 and 100/);
    expect(fieldError({ weightTons: "heavy" }, "weightTons")).toMatch(/Enter a number/);
    expect(fieldError({ pickupDate: "2026-09-28" }, "pickupDate")).toBe("Choose today or a later date");
  });

  it("enforces length limits", () => {
    expect(fieldError({ name: "x".repeat(81) }, "name")).toMatch(/under 80/);
    expect(fieldError({ details: "x".repeat(1001) }, "details")).toMatch(/under 1000/);
    expect(fieldError({ fromCity: "x".repeat(61) }, "fromCity")).toMatch(/under 60/);
  });
});

describe("customer type", () => {
  const schema = createQuoteSchema(new Date("2026-09-29T06:00:00Z"));
  const base: QuoteFormValues = {
    ...emptyQuoteValues("part_truck_load"),
    name: "Test Person",
    phone: "9876543210",
    fromCity: "Cuttack",
    toCity: "Bhubaneswar",
  };

  it("defaults to business and keeps the company", () => {
    const result = schema.safeParse({ ...base, company: "Acme Steel" });
    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data.customerType).toBe("business");
    expect(result.data.company).toBe("Acme Steel");
  });

  it("drops the company for individuals", () => {
    const result = schema.safeParse({ ...base, customerType: "individual", company: "Leftover" });
    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data.customerType).toBe("individual");
    expect(result.data.company).toBeUndefined();
  });

  it("rejects unknown customer types", () => {
    const result = schema.safeParse({ ...base, customerType: "robot" as QuoteFormValues["customerType"] });
    expect(result.success).toBe(false);
  });
});
