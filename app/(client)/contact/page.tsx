import ContactForm from '@/components/ContactForm';
import Container from '@/components/Container';
import SocialMedia from '@/components/SocialMedia';
import { SubText, SubTitle, Title } from '@/components/ui/text';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Shopek — we are here to help with orders, products, and more.',
};

const contactInfo = [
  {
    title: 'Visit Us',
    subtitle: 'New Orleans, USA',
    href: 'https://maps.google.com',
    icon: MapPin,
  },
  {
    title: 'Call Us',
    subtitle: '+48 222 112 233',
    href: 'tel:+48222112233',
    icon: Phone,
  },
  {
    title: 'Working Hours',
    subtitle: 'Mon – Sat: 10:00 AM – 7:00 PM',
    icon: Clock,
  },
  {
    title: 'Email Us',
    subtitle: 'shoperk@shopek.com',
    href: 'mailto:shoperk@shopek.com',
    icon: Mail,
  },
];

const faqItems = [
  {
    question: 'How long does shipping take?',
    answer:
      'Standard delivery takes 3–5 business days. Express shipping is available at checkout and typically arrives within 1–2 business days.',
  },
  {
    question: 'What is your return policy?',
    answer:
      'You can return unused items within 30 days of delivery. Contact us with your order number and we will guide you through the process.',
  },
  {
    question: 'How can I track my order?',
    answer:
      'Once your order ships, you will receive a tracking link by email. You can also view order status in your account under Orders.',
  },
  {
    question: 'Do you offer international shipping?',
    answer:
      'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by destination and are shown at checkout.',
  },
];

const ContactPage = () => {
  return (
    <div>
      <section className="border-b border-line bg-surface">
        <Container className="py-14 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-p/10 px-4 py-1.5 text-sm font-medium text-accent-p">
              <MessageCircle className="size-4" />
              We are here to help
            </div>
            <Title className="text-4xl font-bold md:text-5xl">Contact Us</Title>
            <SubText className="mx-auto mt-4 max-w-lg text-base text-ink/80">
              Have a question about your order, a product, or anything else? Send us a message and
              our team will get back to you within 24 hours.
            </SubText>
          </div>
        </Container>
      </section>

      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-14">
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-line bg-white p-6 shadow-(--shadow) md:p-8">
              <SubTitle className="text-xl">Send us a message</SubTitle>
              <SubText className="mt-1">
                Fill out the form below and we will respond as soon as possible.
              </SubText>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div className="group flex items-start gap-4 rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent-p/30 hover:bg-white hoverEffect">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent-p/10 text-accent-p transition-colors group-hover:bg-accent-p group-hover:text-white hoverEffect">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-ink">{item.title}</h3>
                      <p className="mt-1 text-sm text-ink/80">{item.subtitle}</p>
                    </div>
                  </div>
                );

                if (item.href) {
                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="block"
                    >
                      {content}
                    </Link>
                  );
                }

                return <div key={item.title}>{content}</div>;
              })}
            </div>

            <div className="rounded-xl border border-line bg-surface p-5">
              <SubTitle>Follow us</SubTitle>
              <SubText className="mt-1">Stay updated on new arrivals and exclusive deals.</SubText>
              <SocialMedia
                className="mt-4 text-ink/60"
                iconClassName="border-line hover:border-accent-p hover:text-accent-p hover:bg-accent-p/5"
              />
            </div>
          </div>
        </div>
      </Container>

      <section className="border-t border-line bg-surface">
        <Container className="py-12 md:py-16">
          <div className="mb-8 text-center">
            <Title className="text-2xl font-semibold md:text-3xl">Frequently asked questions</Title>
            <SubText className="mx-auto mt-2 max-w-md">
              Quick answers to common questions. Can&apos;t find what you need? Use the form above.
            </SubText>
          </div>

          <Accordion
            type="single"
            collapsible
            className="mx-auto max-w-2xl rounded-xl border border-line bg-white px-6 shadow-(--shadow)"
          >
            {faqItems.map((item, index) => (
              <AccordionItem key={item.question} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium text-ink-muted hover:text-accent-p hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-ink/60">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </section>
    </div>
  );
};

export default ContactPage;
