import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  AdaptiveNavbar, 
  AdaptiveText, 
  useAdaptive 
} from '@aura-adaptive/aura-ui-adaptor';
import Logo from '../assets/lion-logo.svg';
import { Landmark, FileSignature, SearchCheck, Info } from 'lucide-react';

export default function Layout() {
  const { pathname } = useLocation();
  const { tokens } = useAdaptive();
  const { spacing, colors } = tokens;

  const navItems = [
    { path: '/dashboard', label: 'Services', icon: Landmark },
    { path: '/apply', label: 'Apply Online', icon: FileSignature },
    { path: '/status', label: 'Track Status', icon: SearchCheck },
    { path: '/help', label: 'Help & FAQ', icon: Info },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Authoritative top municipal bar */}
      <div style={{ 
        background: colors.secondary || colors.primary, 
        color: '#ffffff', 
        padding: '8px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src={Logo} alt="National Emblem" style={{ height: 24, filter: 'brightness(0) invert(1)' }} />
          <AdaptiveText variant="caption" style={{ letterSpacing: '0.05em', opacity: 0.9 }}>GOVERNMENT OF SRI LANKA</AdaptiveText>
        </div>
        <AdaptiveText variant="caption" style={{ opacity: 0.8 }}>Citizen Portal e-Services</AdaptiveText>
      </div>

      <AdaptiveNavbar sticky bordered>
        <AdaptiveNavbar.Brand>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: 8 }}>
            <AdaptiveText variant="h2" className="h-formal" weight="bold">PublicService</AdaptiveText>
          </Link>
        </AdaptiveNavbar.Brand>

        <AdaptiveNavbar.Nav>
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.path);
            return (
              <Link key={item.path} to={item.path} style={{ textDecoration: 'none' }}>
                <AdaptiveNavbar.Item as="button" active={isActive}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <item.icon size={18} color={isActive ? colors.primary : colors.text} />
                    <AdaptiveText variant="body" weight={isActive ? "semibold" : "normal"}>{item.label}</AdaptiveText>
                  </div>
                </AdaptiveNavbar.Item>
              </Link>
            );
          })}
        </AdaptiveNavbar.Nav>
      </AdaptiveNavbar>

      <main style={{ 
        flex: 1, 
        padding: `${spacing.gapY * 2}px ${spacing.pagePaddingX}px`,
        maxWidth: 1200,
        margin: '0 auto',
        width: '100%'
      }}>
        <Outlet />
      </main>
      
      <footer style={{
        marginTop: 'auto',
        borderTop: `1px solid ${colors.border}`,
        padding: `${spacing.gapY * 2}px ${spacing.pagePaddingX}px`,
        textAlign: 'center',
        background: colors.surface
      }}>
        <AdaptiveText variant="caption" muted>© 2026 Government Information Centre. All rights reserved.</AdaptiveText>
      </footer>
    </div>
  );
}
