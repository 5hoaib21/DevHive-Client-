import type { Metadata } from "next";
import { Mail, MapPin, MessageSquare, Clock } from "lucide-react";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the DevHive team. We are here to help with questions, feedback, or collaboration opportunities.",
};

const contactInfo = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: "Email",
    value: "hello@devhive.dev",
    href: "mailto:hello@devhive.dev",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: "Location",
    value: "Dhaka, Bangladesh",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    label: "Response Time",
    value: "Within 24 hours",
  },
];

const ContactPage = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-white border-b border-gray-100 py-20 sm:py-24">
        <div className="dh-container text-center max-w-4xl">
          <div className="w-12 h-12 rounded-lg bg-dh-teal/10 flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-6 h-6 text-dh-teal" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-6">
            We Would Love to{" "}
            <span className="text-dh-teal">Hear from You</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Have a question, feedback, or a collaboration idea? Reach out and
            we will get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-20 sm:py-24 bg-dh-surface">
        <div className="dh-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="dh-card p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Send Us a Message
                </h2>
                <ContactForm />
              </div>
            </div>

            {/* Info sidebar */}
            <div className="space-y-5">
              {contactInfo.map((item) => (
                <div key={item.label} className="dh-card p-5">
                  <div className="w-10 h-10 rounded-lg bg-dh-teal/10 flex items-center justify-center text-dh-teal mb-3">
                    {item.icon}
                  </div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {item.label}
                  </h3>
                  {item.href ? (
                    <a href={item.href} className="text-gray-900 font-medium hover:text-dh-teal transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-gray-900 font-medium">{item.value}</p>
                  )}
                </div>
              ))}

              <div className="dh-card p-5 bg-dh-teal/5 border-dh-teal/20">
                <h3 className="font-bold text-gray-900 mb-1">Response Time</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  We typically respond within 24 hours on business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
