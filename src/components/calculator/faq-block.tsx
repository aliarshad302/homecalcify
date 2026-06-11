import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqBlockProps {
  faqs: { question: string; answer: string }[];
  heading?: string;
}

/** Renders FAQs as an accordion. Pair with faqSchema() for FAQPage rich results. */
export function FaqBlock({ faqs, heading = "Frequently asked questions" }: FaqBlockProps) {
  if (!faqs.length) return null;
  return (
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="font-display text-2xl font-bold tracking-tight">
        {heading}
      </h2>
      <Accordion type="single" collapsible className="mt-3">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger>{f.question}</AccordionTrigger>
            <AccordionContent>{f.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
