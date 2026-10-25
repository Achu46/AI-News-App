import React, { useState } from 'react';
import { 
  Headphones, 
  Monitor, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  Send 
} from 'lucide-react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function LandingPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: 'Customer Care Support', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'inquiries'), {
        ...form,
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', service: 'Customer Care Support', message: '' });
    } catch (err) {
      console.error('Inquiry submit error:', err);
      // Still show success to user if offline
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const services = [
    {
      title: 'Customer Care Support',
      description: 'Dedicated inbound, outbound, and omnichannel call centre solutions delivering an exceptional customer journey everyday.',
      icon: Headphones,
      points: ['24/7 Multi-channel Desk', 'First-contact resolution SLA', 'Dedicated team onboarding']
    },
    {
      title: 'Website Development and Support',
      description: 'Modern, high-velocity responsive web platforms, bespoke client portals, and ongoing infrastructure maintenance.',
      icon: Monitor,
      points: ['React.js & Cloud Architecture', 'Enterprise security & SEO', 'Continuous support & uptime monitoring']
    },
    {
      title: 'Digital Marketing',
      description: 'Targeted brand growth campaigns, search optimization, and social media acceleration tailored to corporate ROI.',
      icon: TrendingUp,
      points: ['Performance Marketing', 'Lead Acquisition Funnels', 'Data-driven Analytics & Reporting']
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--que-canvas-base)' }}>
      {/* Hero Section */}
      <section style={{
        padding: '80px 0 100px 0',
        backgroundColor: 'var(--que-canvas-surface)',
        borderBottom: '1px solid var(--que-border)',
        position: 'relative'
      }}>
        <div className="que-container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          alignItems: 'center'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--que-olive-tint)',
              color: 'var(--que-olive-active)',
              padding: '6px 14px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '20px'
            }}>
              <span>Official Enterprise Partner</span>
            </div>

            <h1 className="que-display" style={{ fontSize: 'clamp(32px, 4.5vw, 48px)', lineHeight: 1.15, marginBottom: '20px' }}>
              People • Process • Progress.
            </h1>

            <p style={{
              fontSize: '18px',
              lineHeight: '28px',
              color: 'var(--que-text-secondary)',
              marginBottom: '32px',
              maxWidth: '560px'
            }}>
              At QUE Solutions, we put people at the heart of every conversation. Supporting people, powering growth, and providing a better customer experience everyday.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href="#contact" className="que-btn que-btn-forest" style={{ height: '48px', padding: '0 28px', fontSize: '15px' }}>
                <span>Partner With Us</span>
                <ArrowRight size={18} />
              </a>
              <a href="#services" className="que-btn que-btn-outline" style={{ height: '48px', padding: '0 24px', fontSize: '15px' }}>
                <span>Explore Services</span>
              </a>
            </div>

            {/* Micro Highlights */}
            <div style={{
              display: 'flex',
              gap: '28px',
              marginTop: '40px',
              paddingTop: '28px',
              borderTop: '1px solid var(--que-border)',
              flexWrap: 'wrap'
            }}>
              <div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--que-forest-base)' }}>99.8%</div>
                <div style={{ fontSize: '12px', color: 'var(--que-text-secondary)', fontWeight: '500' }}>SLA Commitment</div>
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--que-forest-base)' }}>24/7</div>
                <div style={{ fontSize: '12px', color: 'var(--que-text-secondary)', fontWeight: '500' }}>Operational Support</div>
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--que-forest-base)' }}>100%</div>
                <div style={{ fontSize: '12px', color: 'var(--que-text-secondary)', fontWeight: '500' }}>Process-Driven</div>
              </div>
            </div>
          </div>

          {/* Hero Banner Visual */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              backgroundColor: 'var(--que-canvas-base)',
              padding: '16px',
              borderRadius: '20px',
              border: '1px solid var(--que-border)',
              boxShadow: 'var(--que-shadow-card)',
              display: 'inline-block',
              maxWidth: '100%'
            }}>
              <img
                src="/que_brand_banner.png"
                alt="QUE Solutions - Customer Care & Call Centre Services"
                style={{
                  width: '100%',
                  maxHeight: '340px',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  display: 'block'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" style={{ padding: '90px 0' }}>
        <div className="que-container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 56px auto' }}>
            <span style={{
              fontSize: '12px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--que-olive-base)'
            }}>
              What We Do
            </span>
            <h2 className="que-h1" style={{ marginTop: '8px', marginBottom: '16px' }}>
              Specialized Business Solutions
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--que-text-secondary)', lineHeight: '24px', margin: 0 }}>
              Engineered to support modern enterprises with operational rigor, digital innovation, and dedicated care.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px'
          }}>
            {services.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div key={idx} className="que-card que-card-interactive" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--que-olive-tint)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--que-olive-base)',
                    marginBottom: '20px'
                  }}>
                    <Icon size={26} />
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--que-forest-base)', margin: '0 0 12px 0' }}>
                    {srv.title}
                  </h3>
                  <p style={{ fontSize: '14px', lineHeight: '22px', color: 'var(--que-text-secondary)', marginBottom: '24px', flex: 1 }}>
                    {srv.description}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '16px', borderTop: '1px solid var(--que-border)' }}>
                    {srv.points.map((pt, pIdx) => (
                      <div key={pIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--que-text-primary)' }}>
                        <CheckCircle2 size={16} color="var(--que-olive-base)" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{
        padding: '80px 0',
        backgroundColor: 'var(--que-canvas-surface)',
        borderTop: '1px solid var(--que-border)',
        borderBottom: '1px solid var(--que-border)'
      }}>
        <div className="que-container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          alignItems: 'center'
        }}>
          <div>
            <span style={{
              fontSize: '12px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--que-olive-base)'
            }}>
              Our Philosophy
            </span>
            <h2 className="que-h1" style={{ marginTop: '8px', marginBottom: '20px' }}>
              Support Today. Stronger Tomorrow.
            </h2>
            <p style={{ fontSize: '15px', lineHeight: '24px', color: 'var(--que-text-secondary)', marginBottom: '16px' }}>
              At QUE Solutions, we believe sustainable business progress requires combining capable, empathetic people with robust, audited processes.
            </p>
            <p style={{ fontSize: '15px', lineHeight: '24px', color: 'var(--que-text-secondary)', marginBottom: '28px' }}>
              Headquartered in Erode, Tamil Nadu, we assist ambitious organizations worldwide across contact centre support, web engineering, and enterprise AI workflow automation.
            </p>

            <div style={{
              backgroundColor: 'var(--que-canvas-base)',
              padding: '20px',
              borderRadius: '12px',
              borderLeft: '4px solid var(--que-forest-base)'
            }}>
              <p style={{ margin: 0, fontStyle: 'italic', fontSize: '14px', color: 'var(--que-text-primary)' }}>
                "Listen. Solve. Support. Grow."
              </p>
              <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--que-text-secondary)', marginTop: '6px' }}>
                — Mohamed Asfaque A, Founder & CEO
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <img
              src="/que_services_card.png"
              alt="QUE Solutions Visiting Card & Services"
              style={{
                width: '100%',
                maxHeight: '360px',
                objectFit: 'contain',
                borderRadius: '16px',
                boxShadow: 'var(--que-shadow-card)',
                border: '1px solid var(--que-border)'
              }}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: '90px 0' }}>
        <div className="que-container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px'
        }}>
          {/* Contact Details */}
          <div>
            <span style={{
              fontSize: '12px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--que-olive-base)'
            }}>
              Get In Touch
            </span>
            <h2 className="que-h1" style={{ marginTop: '8px', marginBottom: '16px' }}>
              Let's Build Better Experiences
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--que-text-secondary)', lineHeight: '24px', marginBottom: '32px' }}>
              Have a project, call centre inquiry, or need website support? Reach out directly and our team will get back to you within 24 hours.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--que-olive-tint)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--que-olive-base)'
                }}>
                  <Phone size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--que-text-secondary)' }}>Direct Telephone</div>
                  <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--que-text-primary)' }}>+91 7092490337</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--que-olive-tint)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--que-olive-base)'
                }}>
                  <Mail size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--que-text-secondary)' }}>Corporate Email</div>
                  <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--que-text-primary)' }}>que.solutions.service@gmail.com</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--que-olive-tint)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--que-olive-base)'
                }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--que-text-secondary)' }}>Headquarters</div>
                  <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--que-text-primary)' }}>Erode, Tamil Nadu, India</div>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="que-card">
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--que-forest-base)', margin: '0 0 16px 0' }}>
              Send an Inquiry
            </h3>

            {submitted ? (
              <div style={{
                backgroundColor: 'var(--que-success-bg)',
                border: '1px solid #C8E6C9',
                borderRadius: '8px',
                padding: '24px',
                textAlign: 'center'
              }}>
                <CheckCircle2 size={36} color="var(--que-success)" style={{ margin: '0 auto 12px auto' }} />
                <h4 style={{ margin: '0 0 8px 0', color: 'var(--que-success)' }}>Thank You!</h4>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--que-text-secondary)' }}>
                  Your inquiry has been received. Our executive team will reach out to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="que-btn que-btn-outline"
                  style={{ marginTop: '16px' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="que-input-group">
                  <label className="que-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="que-input"
                    placeholder="e.g. Mohamed Asfaque"
                  />
                </div>

                <div className="que-input-group">
                  <label className="que-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="que-input"
                    placeholder="name@company.com"
                  />
                </div>

                <div className="que-input-group">
                  <label className="que-label">Phone Number</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="que-input"
                    placeholder="+91 9876543210"
                  />
                </div>

                <div className="que-input-group">
                  <label className="que-label">Select Service</label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="que-input"
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="Customer Care Support">Customer Care Support</option>
                    <option value="Website Development and Support">Website Development & Support</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Enterprise AI Consultation">Enterprise AI Consultation</option>
                  </select>
                </div>

                <div className="que-input-group">
                  <label className="que-label">Message / Details *</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="que-input"
                    style={{ height: 'auto', padding: '10px 14px' }}
                    placeholder="Tell us about your requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="que-btn que-btn-forest"
                  style={{ width: '100%', height: '46px', marginTop: '8px' }}
                >
                  <Send size={16} />
                  <span>{submitting ? 'Submitting...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
