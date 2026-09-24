import Link from "next/link";
import type { ComponentProps } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { talkToTeamHref, whatsappUrl } from "@/lib/site-config";

type TalkToTeamButtonProps = Pick<ComponentProps<typeof Button>, "size" | "className"> & {
  onClick?: () => void;
};

/** Secondary CTA: WhatsApp click-to-chat when configured, otherwise the contact page. */
export function TalkToTeamButton({ size, className, onClick }: TalkToTeamButtonProps) {
  return (
    <Button asChild variant="secondary" size={size} className={className}>
      {whatsappUrl ? (
        <a href={talkToTeamHref} target="_blank" rel="noopener noreferrer" onClick={onClick}>
          <MessageCircle aria-hidden="true" />
          Talk to our team
          <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
        </a>
      ) : (
        <Link href={talkToTeamHref} onClick={onClick}>
          Talk to our team
        </Link>
      )}
    </Button>
  );
}
