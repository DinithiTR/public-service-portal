import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AdaptiveText,
  AdaptiveGrid,
  AdaptiveCard,
  AdaptiveButton,
  useAdaptive
} from '@aura-adaptive/aura-ui-adaptor';
import { quickServices } from '../data/mockData';
import { ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const { tokens } = useAdaptive();
  const { spacing, colors } = tokens;
  const navigate = useNavigate();

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: spacing.gapY * 3 }}>

      {/* Civic Hero Section */}
      <div className="civic-hero" style={{ padding: '3rem 2rem' }}>
        <div className="civic-hero-content" style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 600 }}>
          <AdaptiveText variant="display" weight="bold" style={{ color: 'white' }}>
            Welcome to the Citizen e-Services Portal
          </AdaptiveText>
          <AdaptiveText variant="lead" style={{ color: 'rgba(255,255,255,0.9)' }}>
            Access government services, apply for essential documents, and track your application status securely online.
          </AdaptiveText>
        </div>
      </div>

      <section>
        <div style={{ marginBottom: spacing.gapY }}>
          <AdaptiveText variant="h2" className="h-formal" weight="bold">
            Most Requested Services
          </AdaptiveText>
          <AdaptiveText variant="body" muted>
            Select a service category below to begin your application.
          </AdaptiveText>
        </div>

        <AdaptiveGrid columns={3} minColumnWidth={280} withContainerPadding>
          {quickServices.map((service) => (
            <AdaptiveCard
              key={service.id}
              variant="action"
              className="civic-card"
              onClick={() => navigate('/apply')}
            >
              <AdaptiveCard.Body style={{ display: 'flex', flexDirection: 'column', gap: spacing.gapY }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{
                    padding: 12,
                    borderRadius: 8,
                    backgroundColor: `${colors.primary}15`,
                    color: colors.primary
                  }}>
                    <service.icon size={28} />
                  </div>
                  <ArrowRight size={20} color={colors.primary} />
                </div>
                <div>
                  <AdaptiveText variant="h3" weight="bold" style={{ marginBottom: 4 }}>
                    {service.title}
                  </AdaptiveText>
                  <AdaptiveText variant="body" muted maxLines={2}>
                    {service.desc}
                  </AdaptiveText>
                </div>
              </AdaptiveCard.Body>
            </AdaptiveCard>
          ))}
        </AdaptiveGrid>
      </section>

      <div style={{
        marginTop: spacing.gapY * 2,
        padding: '2rem',
        backgroundColor: colors.surface,
        borderRadius: 8,
        border: `1px solid ${colors.border}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: spacing.gapY
      }}>
        <AdaptiveText variant="h3" className="h-formal">Looking to check an existing application?</AdaptiveText>
        <AdaptiveText variant="body" style={{ maxWidth: 500 }}>
          If you have already submitted your documents and possess a tracking reference number, you can view the live progress of your request.
        </AdaptiveText>
        <AdaptiveButton variant="primary" onClick={() => navigate('/status')} style={{ marginTop: 8 }}>
          Track Application Status
        </AdaptiveButton>
      </div>

    </div>
  );
}
