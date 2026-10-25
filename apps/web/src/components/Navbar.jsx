import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header style={{
      backgroundColor: 'var(--que-canvas-surface)',
      borderBottom: '1px solid var(--que-border)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div className="que-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '72px'
      }}>
        {/* Logo and Tagline */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}>
          <img
            src="/que_logo.png"
            alt="QUE Solutions Logo"
            style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: '50%' }}
          />
          <div>
            <div style={{
              fontSize: '20px',
              fontWeight: '700',
              letterSpacing: '-0.02em',
              color: 'var(--que-forest-base)',
              lineHeight: 1.1
            }}>
              QUE SOLUTIONS
            </div>
            <div style={{
              fontSize: '11px',
              fontWeight: '600',
              letterSpacing: '0.08em',
              color: 'var(--que-olive-base)',
              textTransform: 'uppercase'
            }}>
              People • Process • Progress
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '32px' }} className="desktop-nav">
          <a href="#services" style={{ textDecoration: 'none', color: 'var(--que-text-primary)', fontWeight: '500', fontSize: '15px' }}>
            Services
          </a>
          <a href="#about" style={{ textDecoration: 'none', color: 'var(--que-text-primary)', fontWeight: '500', fontSize: '15px' }}>
            About Us
          </a>
          <a href="#contact" style={{ textDecoration: 'none', color: 'var(--que-text-primary)', fontWeight: '500', fontSize: '15px' }}>
            Contact
          </a>
          <Link
            to="/que"
            className="que-btn que-btn-outline"
            style={{ height: '38px', padding: '0 14px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <ShieldCheck size={16} color="var(--que-olive-base)" />
            <span>Super Admin</span>
          </Link>
          <a href="#contact" className="que-btn que-btn-forest" style={{ height: '40px', padding: '0 20px' }}>
            <span>Get Started</span>
            <ArrowRight size={16} />
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            color: 'var(--que-forest-base)'
          }}
          className="mobile-menu-btn"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: 'var(--que-canvas-surface)',
          borderBottom: '1px solid var(--que-border)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            style={{ textDecoration: 'none', color: 'var(--que-text-primary)', fontWeight: '500', fontSize: '16px' }}
          >
            Services
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            style={{ textDecoration: 'none', color: 'var(--que-text-primary)', fontWeight: '500', fontSize: '16px' }}
          >
            About Us
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            style={{ textDecoration: 'none', color: 'var(--que-text-primary)', fontWeight: '500', fontSize: '16px' }}
          >
            Contact
          </a>
          <Link
            to="/que"
            onClick={() => setMobileMenuOpen(false)}
            className="que-btn que-btn-outline"
            style={{ justifyContent: 'center' }}
          >
            <ShieldCheck size={16} color="var(--que-olive-base)" />
            <span>Super Admin Portal</span>
          </Link>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
}
