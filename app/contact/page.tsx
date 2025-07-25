"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MessageCircle, MapPin, Clock, Send } from "lucide-react"
import { FadeInSection } from "@/components/fade-in-section"
import { StaggeredFadeIn } from "@/components/staggered-fade-in"
import { AnimatedButton } from "@/components/animated-button"
import { ShimmerBackground } from "@/components/shimmer-background"
import { useState } from "react"

export default function ContactPage() {
  // State for form fields
  const [name, setName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // WhatsApp handler
  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = "201023594533";
    const fullMessage = `الاسم: ${name}\nرقم الهاتف: ${userPhone}\nالرسالة: ${message}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(fullMessage)}`, "_blank");
    setSubmitted(true);
    setName("");
    setUserPhone("");
    setMessage("");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <ShimmerBackground />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <FadeInSection>
            <div
              className="content-overlay max-w-4xl mx-auto text-center bg-white/90 rounded-2xl shadow-lg"
              style={{
                border: '4px solid #8B4513', // بني داكن
                boxShadow: '0 4px 32px #8B451344', // ظل بني خفيف
                padding: '2.5rem 1.5rem',
                backgroundImage: 'url("/backgrund1.svg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-black mb-4"
                style={{
                  fontFamily: 'Noto Serif',
                  color: '#fff',
                  letterSpacing: '1px',
                  textShadow: `
    0 0 2px #8B4513,
    0 0 4px #8B4513,
    0 2px 12px #000,
    0 6px 24px #000
  `,
                }}
              >
                Contact Us
              </h1>
              <p
                className="text-base sm:text-lg md:text-xl font-semibold mb-2"
                style={{
                  color: '#8B4513',
                  fontFamily: 'Noto Serif',
                  lineHeight: 1.7,
                  textShadow: `
  0 0 2px #fff,
  0 0 4px #fff,
  0 4px 16px #fffbe6,
  0 2px 8px #8B451344
`,
                }}
              >
                Ready to start your Islamic education journey?<br />
                <span style={{
                  color: '#000',
                  fontWeight: 900,
                  textShadow: `
    0 0 2px #fff,
    0 0 4px #fff,
    0 4px 16px #fffbe6,
    0 2px 8px #8B4513
  `,
                }}>
                  Get in touch with us today
                </span> and let us help you find the perfect program.
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <FadeInSection direction="left">
              <Card className="enhanced-card rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500">
                <CardHeader className="pb-8">
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                    <Send className="w-8 h-8 text-amber-600 mr-3 hover:scale-110 hover:rotate-12 transition-all duration-300" />
                    Send us a Message
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleWhatsAppSend} className="space-y-6">
                      <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-700 font-semibold">Name</Label>
                        <Input
                        id="name"
                        placeholder="Enter your name"
                          className="border-2 border-amber-200 focus:border-amber-400 rounded-xl hover:shadow-md transition-all duration-300"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="userPhone" className="text-gray-700 font-semibold">Phone Number</Label>
                      <Input
                        id="userPhone"
                        type="tel"
                        placeholder="Enter your phone number"
                        className="border-2 border-amber-200 focus:border-amber-400 rounded-xl hover:shadow-md transition-all duration-300"
                        value={userPhone}
                        onChange={e => setUserPhone(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-700 font-semibold">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Type your message here..."
                        rows={6}
                        className="border-2 border-amber-200 focus:border-amber-400 rounded-xl resize-none hover:shadow-md transition-all duration-300"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className="w-full">
                      <a
                        href="#"
                        onClick={handleWhatsAppSend}
                        className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white py-3 text-sm rounded-xl font-bold border border-[#128C7E] transition-all duration-200 shadow"
                        style={{ borderWidth: '1.2px', fontFamily: 'Noto Serif', fontWeight: 900, boxShadow: '0 6px 24px #000b' }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.151-.174.2-.298.3-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.007-.372-.009-.571-.009-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.2 5.077 4.363.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 5.421h-.001a8.933 8.933 0 0 1-4.548-1.252l-.326-.194-3.377.893.902-3.292-.212-.336a8.922 8.922 0 0 1-1.365-4.722c.001-4.941 4.011-8.951 8.952-8.951 2.389 0 4.637.933 6.324 2.624a8.822 8.822 0 0 1 2.627 6.327c-.003 4.941-4.013 8.951-8.953 8.951m7.688-16.641a10.892 10.892 0 0 0-7.688-3.184c-6.075 0-11.022 4.947-11.025 11.021a10.96 10.96 0 0 0 1.605 5.729l-1.708 6.233a1 1 0 0 0 1.225 1.225l6.1-1.654a10.96 10.96 0 0 0 5.3 1.348h.004c6.073 0 11.02-4.947 11.023-11.021a10.89 10.89 0 0 0-3.186-7.697"/></svg>
                        Send via WhatsApp
                      </a>
                    </button>
                    {submitted && (
                      <div className="text-green-700 mt-3 font-bold text-center">
                        Your message has been sent successfully! We will reply to you soon via WhatsApp.
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </FadeInSection>

            {/* Contact Information */}
            <div className="space-y-8">
              <StaggeredFadeIn>
                <Card className="enhanced-card rounded-3xl shadow-lg hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <Mail className="w-8 h-8 text-amber-600 transition-transform duration-200 hover:scale-125" style={{ background: 'linear-gradient(145deg, #fffbe6 60%, #e8d5b7 100%)', borderRadius: '50%', padding: '4px' }} />
                      <h3 className="text-lg font-bold" style={{ color: '#5a2600', fontFamily: 'Noto Serif' }}>Email Us</h3>
                    </div>
                    <p className="text-sm mb-2 text-center" style={{ color: '#5a2600' }}>We'll respond within 24 hours</p>
                    <div className="text-sm font-semibold text-center mb-1" style={{ color: '#5a2600' }}>
                        al.azhar.school.london@gmail.com
                    </div>
                    <div className="text-center" style={{ color: '#a67c52', fontSize: '0.95em' }}>General inquiries and registration</div>
                  </CardContent>
                </Card>

                <Card className="enhanced-card rounded-3xl shadow-lg hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <MessageCircle className="w-8 h-8 text-amber-600 transition-transform duration-200 hover:scale-125" style={{ background: 'linear-gradient(145deg, #fffbe6 60%, #e8d5b7 100%)', borderRadius: '50%', padding: '4px' }} />
                      <h3 className="text-lg font-bold" style={{ color: '#5a2600', fontFamily: 'Noto Serif' }}>WhatsApp</h3>
                    </div>
                    <p className="text-sm mb-2 text-center" style={{ color: '#5a2600' }}>Quick support and inquiries</p>
                      <a
                        href="https://wa.me/201023594533"
                        target="_blank"
                        rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 text-lg font-bold underline hover:no-underline mb-1"
                      style={{ color: '#5a2600' }}
                      >
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" className="inline-block transition-transform duration-200 hover:scale-125" style={{ marginRight: '6px', background: 'linear-gradient(145deg, #fffbe6 60%, #e8d5b7 100%)', borderRadius: '50%', padding: '4px' }}>
                          <g>
                            <circle cx="16" cy="16" r="16" fill="#25D366"/>
                            <path d="M16 6.667c-5.13 0-9.333 4.203-9.333 9.333 0 1.646.44 3.25 1.273 4.646l-1.36 4.973a.667.667 0 0 0 .82.82l4.973-1.36A9.26 9.26 0 0 0 16 25.333c5.13 0 9.333-4.203 9.333-9.333S21.13 6.667 16 6.667zm0 16a7.94 7.94 0 0 1-4.073-1.13.667.667 0 0 0-.5-.06l-3.36.92.92-3.36a.667.667 0 0 0-.06-.5A7.94 7.94 0 0 1 8 16c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8zm4.36-5.227c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.42-1.34-1.66-.14-.24-.02-.36.1-.48.1-.1.24-.26.36-.4.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.42-.54-.42-.14 0-.3-.02-.46-.02-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.54.58.2 1.04.32 1.4.42.58.18 1.1.16 1.52.1.46-.06 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" fill="#fff"/>
                          </g>
                        </svg>
                        002-01023594533
                      </a>
                    <div className="text-center" style={{ color: '#a67c52', fontSize: '0.95em' }}>Available {'{ 24 / 7 }'} (GMT+2) Cairo, Egypt</div>
                  </CardContent>
                </Card>

                <Card className="enhanced-card rounded-3xl shadow-lg hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6 justify-center">
                      <h3 className="text-xl font-black text-gray-900 flex items-center gap-3" style={{ fontFamily: 'Noto Serif' }}>
                        <Clock className="w-8 h-8 text-amber-600 transition-transform duration-200 hover:scale-125" style={{ background: 'linear-gradient(145deg, #fffbe6 60%, #e8d5b7 100%)', borderRadius: '50%', padding: '4px' }} />
                        Office Hours
                      </h3>
                    </div>
                    <ul className="text-base font-semibold space-y-2 text-center" style={{ fontFamily: 'Noto Serif', color: '#5a2600' }}>
                      <li>From Saturday to Friday</li>
                      <li>All days of the week</li>
                      <li>24 hours a day</li>
                      <li>Immediate response from the support team</li>
                      <li className="text-sm font-normal" style={{ color: '#a67c52' }}>All times are GMT +2 (Cairo time)</li>
                    </ul>
                  </CardContent>
                </Card>
              </StaggeredFadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Location Map Section */}
      <section className="py-16 px-4 section-light" style={{
        position: 'relative',
        backgroundImage: 'url(/backgrund1.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(255,255,255,0.75)', // طبقة شفافة بيضاء
          zIndex: 1,
          pointerEvents: 'none',
        }} />
        <div className="max-w-6xl mx-auto" style={{ position: 'relative', zIndex: 2 }}>
          <FadeInSection>
            <Card className="enhanced-card rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center">
                  <MapPin 
                    className="w-8 h-8 text-amber-600 mr-3 hover:scale-110 hover:bounce transition-all duration-300"
                    style={{
                      background: 'linear-gradient(145deg, #fffbe6 60%, #a67c52 100%)',
                      borderRadius: '50%',
                      padding: '6px',
                      border: '2.5px solid #d4af37',
                    }}
                  />
                  Our Location
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  While we operate online globally, our headquarters is located in Cairo, Egypt
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-auto min-h-[28rem] content-overlay-light flex flex-col items-center justify-center gap-2 py-8 px-2 hover:bg-amber-50 transition-all duration-500">
                  <div className="text-center mb-4">
                    <MapPin 
                      className="w-16 h-16 text-amber-600 mx-auto mb-4 hover:scale-110 hover:bounce transition-all duration-300"
                      style={{
                        background: 'linear-gradient(145deg, #fffbe6 60%, #a67c52 100%)',
                        borderRadius: '50%',
                        padding: '12px',
                        border: '3.5px solid #d4af37',
                      }}
                    />
                    <div className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Noto Serif' }}>Cairo, Egypt</div>
                    <div className="text-gray-600" style={{ fontFamily: 'Noto Serif', fontWeight: 600 }}>Near Al-Azhar University</div>
                    <div className="text-sm text-gray-500 mt-2 mb-4" style={{ fontFamily: 'Noto Serif' }}>Interactive map below</div>
                  </div>
                  <div className="flex justify-center w-full">
                    <iframe
                      title="Cairo Egypt Map"
                      src="https://www.google.com/maps?q=Cairo,+Egypt&hl=en&z=12&output=embed"
                      width="100%"
                      height="320"
                      style={{
                        border: 0,
                        borderRadius: '1.5rem',
                        boxShadow: '0 4px 32px #0002',
                        margin: '0 auto',
                        maxWidth: '540px',
                        minWidth: '260px',
                        background: '#fff',
                        display: 'block'
                      }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeInSection>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInSection>
            <div
              className="text-enhanced-readability mb-12 bg-white/90 rounded-2xl shadow-lg"
              style={{
                border: '4px solid #8B4513', // بني داكن
                boxShadow: '0 4px 32px #8B451344', // ظل بني خفيف
                padding: '2.5rem 1.5rem',
                display: 'inline-block'
              }}
            >
              <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            </div>
          </FadeInSection>

          <StaggeredFadeIn className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="enhanced-card rounded-2xl p-6 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-1">
              <h3 className="font-bold text-gray-900 mb-2 hover:text-amber-600 transition-colors duration-200">
                Do teachers speak English?
              </h3>
              <p className="text-gray-600 text-sm">
                Yes, all our teachers are fluent in English and Arabic, with many speaking additional languages.
              </p>
            </Card>
            <Card className="enhanced-card rounded-2xl p-6 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-1">
              <h3 className="font-bold text-gray-900 mb-2 hover:text-amber-600 transition-colors duration-200">
                Are certificates provided?
              </h3>
              <p className="text-gray-600 text-sm">
                Yes, we provide certificates of completion for all our courses upon successful completion.
              </p>
            </Card>
            <Card className="enhanced-card rounded-2xl p-6 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-1">
              <h3 className="font-bold text-gray-900 mb-2 hover:text-amber-600 transition-colors duration-200">
                What payment methods are available?
              </h3>
              <p className="text-gray-600 text-sm">
                We accept credit cards, PayPal, bank transfers, and various digital payment methods.
              </p>
            </Card>
            <Card className="enhanced-card rounded-2xl p-6 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-1">
              <h3 className="font-bold text-gray-900 mb-2 hover:text-amber-600 transition-colors duration-200">
                How are lesson times scheduled?
              </h3>
              <p className="text-gray-600 text-sm">
                You can choose flexible time slots that work with your schedule across different time zones.
              </p>
            </Card>
          </StaggeredFadeIn>

          <FadeInSection delay={600}>
            <div
              className="content-overlay-light bg-white/90 rounded-2xl shadow-lg flex flex-col items-center w-full"
              style={{
                border: '4px solid #8B4513', // بني داكن
                boxShadow: '0 4px 32px #8B451344', // ظل بني خفيف
                padding: '2.5rem 1.5rem'
                // لا تضع display: 'inline-block'
              }}
            >
              <p className="text-gray-600 mb-4">Didn't find your answer?</p>
              <AnimatedButton
                asChild
                animation="glow"
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full"
              >
                <a href="/faq">View All FAQs</a>
              </AnimatedButton>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 text-center relative overflow-hidden" style={{
        backgroundImage: 'url(/backgrund1.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(255,255,255,0.75)',
          zIndex: 1,
          pointerEvents: 'none',
        }} />
        <div className="max-w-4xl mx-auto relative z-10">
          <FadeInSection>
            <div
              className="content-overlay-heavy bg-white/80 text-[#5a2600] rounded-2xl p-8 shadow-lg"
              style={{
                border: '4px solid #8B4513', // بني داكن
                boxShadow: '0 4px 32px #8B451344', // ظل بني خفيف
              }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Noto Serif', color: '#5a2600' }}>Ready to Begin?</h2>
              <p className="text-xl mb-8" style={{ color: '#8b4513' }}>
                Take the first step towards deepening your Islamic knowledge. Our team is here to guide you every step of the way.
              </p>
              <AnimatedButton
                asChild
                size="lg"
                animation="pulse"
                className="bg-white text-[#5a2600] hover:bg-gray-100 px-8 py-4 text-lg rounded-full hover:shadow-2xl hover:shadow-white/25 font-bold"
              >
                <a href="/services">Explore Our Programs</a>
              </AnimatedButton>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  )
}
