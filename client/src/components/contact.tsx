import { useFadeInAnimation } from "@/hooks/use-gsap";
import { contactInfo } from "@/lib/data";

export default function Contact() {
  useFadeInAnimation(".section-reveal");

  return (
    <section id="contact" className="py-20 bg-gray-50 section-reveal">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get in{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about UnitedMUN? Our team is here to help you succeed
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 text-center shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                <i className={`${info.icon} text-white text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {info.title}
              </h3>
              <p className="text-gray-600 mb-4">{info.description}</p>
              <a
                href={info.href}
                className="text-red-500 font-semibold hover:text-orange-500 transition-colors whitespace-pre-line"
              >
                {info.contact}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
