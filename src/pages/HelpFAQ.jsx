import React from 'react';
import { 
  AdaptiveText, 
  AdaptiveCard, 
  AdaptiveList,
  useAdaptive
} from '@aura-adaptive/aura-ui-adaptor';
import { faqs } from '../data/mockData';
import { HelpCircle } from 'lucide-react';

export default function HelpFAQ() {
  const { tokens } = useAdaptive();
  const { spacing, colors } = tokens;

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: spacing.gapY * 2, maxWidth: 800, margin: '0 auto' }}>
      
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 16, 
        borderBottom: `2px solid ${colors.primary}`, 
        paddingBottom: spacing.gapY 
      }}>
        <div style={{ padding: 12, backgroundColor: colors.primary, borderRadius: 8 }}>
          <HelpCircle size={32} color="white" />
        </div>
        <div>
          <AdaptiveText variant="display" weight="bold" className="h-formal">
            Help & Knowledge Base
          </AdaptiveText>
          <AdaptiveText variant="lead" muted>
            Find answers to commonly asked questions regarding public services.
          </AdaptiveText>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.gapY * 2 }}>
        {faqs.map((category, idx) => (
          <section key={idx}>
            <AdaptiveText variant="h2" weight="bold" style={{ marginBottom: spacing.gapY }}>
              {category.category}
            </AdaptiveText>

            <AdaptiveCard variant="content" detailed className="civic-card">
              <AdaptiveList ordered={false}>
                {category.items.map((faq, fIdx) => (
                  <li key={fIdx} style={{ marginBottom: fIdx !== category.items.length - 1 ? spacing.gapY : 0 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <AdaptiveText variant="h3" weight="semibold">{faq.q}</AdaptiveText>
                      <AdaptiveText variant="body" muted>{faq.a}</AdaptiveText>
                    </div>
                  </li>
                ))}
              </AdaptiveList>
            </AdaptiveCard>
          </section>
        ))}
      </div>

      <div style={{ 
        marginTop: spacing.gapY * 2, 
        padding: spacing.gapY * 1.5, 
        backgroundColor: colors.surface, 
        borderRadius: 8,
        textAlign: 'center'
      }}>
        <AdaptiveText variant="h3" weight="bold">Still need help?</AdaptiveText>
        <AdaptiveText variant="body">Contact the Government Information Centre at <strong>1919</strong>.</AdaptiveText>
      </div>

    </div>
  );
}
