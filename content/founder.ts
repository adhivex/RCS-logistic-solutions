/**
 * Founder section copy. Name and designation come from lib/site-config.ts.
 * Message is a draft pending client approval (docs/open-questions.md).
 */
export const founderSection = {
  heading: "Moving Businesses Forward, Together.",
  message:
    "At RCS Logistic Solutions, we believe logistics is about trust. Businesses rely on us to move what matters to them, on time and with care. We focus on clear communication, dependable service and long-term relationships, so that our partners can concentrate on growing their business. When you work with RCS, you work with a team that treats your shipment as its own.",
  /** Used only when `features.founderPortrait` is true. Supply the real file before enabling. */
  portrait: { src: "/images/founder-satya-swain.jpg", width: 960, height: 1200 },
  /** Used only when `features.founderSignature` is true. Must be a scan of a real signature. */
  signature: { src: "/images/founder-signature.png", width: 320, height: 120 },
} as const;
