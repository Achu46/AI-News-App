import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--que-forest-base)',
      color: 'var(--que-forest-contrast)',
      paddingTop: '64px',
      paddingBottom: '32px',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      <div className="que-container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '40px',
          marginBottom: '48px'
        }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <img
                src="/que_logo.png"
                alt="QUE Solutions Logo"
                style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#FFF' }}
              />
              <div>
                <span style={{ fontSize: '18px', fontWeight: '700', letterSpacing: '-0.01em', color: '#FFF' }}>
                  QUE SOLUTIONS
                </span>
                <div style={{ fontSize: '11px', color: 'var(--que-olive-tint)', letterSpacing: '0.06em' }}>
                  People • Process • Progress
                </div>
              </div>
            </div>
            <p style={{ fontSize: '14px', lineHeight: '22px', color: '#CCD6CD', margin: 0 }}>
              People at the heart of every conversation. Providing premier Customer Care, Website Development, and Digital Marketing services to power enterprise growth.
            </p>
          </div>

          {/* Core Services */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#FFF', marginBottom: '16px' }}>
              Our Services
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#CCD6CD' }}>
              <li>Customer Care Support</li>
              <li>Website Development and Support</li>
              <li>Digital Marketing</li>
              <li>Business Process Optimization</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#FFF', marginBottom: '16px' }}>
              Contact Us
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#CCD6CD' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={16} color="var(--que-olive-tint)" />
                <span>+91 7092490337</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} color="var(--que-olive-tint)" />
                <span>que.solutions.service@gmail.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={16} color="var(--que-olive-tint)" />
                <span>Erode, Tamil Nadu, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '13px',
          color: '#A2B0A4'
        }}>
          <div>
            &copy; {new Date().getFullYear()} QUE Solutions. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#privacy" style={{ color: '#A2B0A4', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#terms" style={{ color: '#A2B0A4', textDecoration: 'none' }}>Terms of Service</a>
            <Link to="/que" style={{ color: 'var(--que-olive-tint)', textDecoration: 'none', fontWeight: '600' }}>
              Super Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
