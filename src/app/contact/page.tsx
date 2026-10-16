import { Suspense } from "react";
import { PageHeader } from "@/components/ui/Primitives";
import { ContactView } from "./ContactView";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Contact, Discuss a Robotics Project",
  description:
    "Discuss a robotics project, request a controlled pilot discussion or arrange a private PERSONA consultation. BUCKBOTICS, 26-2359 Royal Windsor Drive, Mississauga, Ontario, Canada.",
  path: "/contact",
});

export default function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  return (
    <Suspense
      fallback={
        <PageHeader
          eyebrow="Contact"
          title="Discuss a Robotics Project"
          intro="One form, routed by intent. Your enquiry goes to a company-controlled inbox with consent recorded, we never claim a booking, pilot or delivery is confirmed by submitting it."
        />
      }
    >
      <ContactView searchParams={searchParams} />
    </Suspense>
  );
}
