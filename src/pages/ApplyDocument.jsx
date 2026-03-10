import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AdaptiveText, 
  AdaptiveCard, 
  AdaptiveGrid, 
  AdaptiveInput, 
  AdaptiveSelect, 
  AdaptiveCheckbox, 
  AdaptiveButton,
  AdaptiveAlert,
  useAdaptive
} from '@aura-adaptive/aura-ui-adaptor';

export default function ApplyDocument() {
  const { tokens } = useAdaptive();
  const { spacing, colors } = tokens;
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    docType: '',
    nic: '',
    fullName: '',
    address: '',
    district: '',
    termsAccepted: false
  });
  const [submitted, setSubmitted] = useState(false);

  const districts = ['Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Galle', 'Jaffna', 'Matara'];
  const docTypes = ['National Identity Card (New)', 'NIC Replacement', 'Birth Certificate Copy', 'Vehicle Revenue License'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      setSubmitted(true);
      setTimeout(() => navigate('/status'), 3500);
    }
  };

  if (submitted) {
    return (
      <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
        <AdaptiveCard className="civic-card" style={{ maxWidth: 600, width: '100%' }}>
          <AdaptiveCard.Body>
            <AdaptiveAlert
              variant="success"
              title="Application Submitted Successfully!"
              message="Your reference number is APP-2024-9005. You can use this number to track your progress. Redirecting you to the tracking portal..."
              filled={true}
              emphasis="icon"
            />
          </AdaptiveCard.Body>
        </AdaptiveCard>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: spacing.gapY * 2, maxWidth: 800, margin: '0 auto' }}>
      
      <div style={{ borderBottom: `2px solid ${colors.primary}`, paddingBottom: spacing.gapY }}>
        <AdaptiveText variant="display" weight="bold" className="h-formal">
          Document Application Form
        </AdaptiveText>
        <AdaptiveText variant="lead" muted>
          Please complete the mandatory fields below to officially lodge your request.
        </AdaptiveText>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: spacing.gapY }}>
        <div className="step-indicator" style={{ background: step === 1 ? colors.primary : colors.border }}>1</div>
        <AdaptiveText weight="bold" muted={step !== 1}>Applicant Details</AdaptiveText>
        <div style={{ height: 2, flex: 1, background: colors.border, margin: '0 8px' }} />
        <div className="step-indicator" style={{ background: step === 2 ? colors.primary : colors.border }}>2</div>
        <AdaptiveText weight="bold" muted={step !== 2}>Supporting Information</AdaptiveText>
      </div>

      <AdaptiveCard variant="content" detailed className="civic-card">
        <AdaptiveCard.Body>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: spacing.gapY * 1.5 }}>
            
            {step === 1 && (
              <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: spacing.gapY * 1.5 }}>
                <AdaptiveSelect
                  label="Document Type Required"
                  options={docTypes.map(d => ({ value: d, label: d }))}
                  value={formData.docType}
                  onChange={(val) => setFormData({ ...formData, docType: val })}
                  placeholder="Select a service from the list..."
                  helperText="Fees may vary based on the document type."
                />

                <AdaptiveGrid columns={2} minColumnWidth={250} withContainerPadding={true}>
                  <AdaptiveInput
                    label="National Identity Card Number"
                    placeholder="e.g. 199012345678 or 901234567V"
                    value={formData.nic}
                    onChange={(e) => setFormData({ ...formData, nic: e.target.value })}
                    required
                  />
                  <AdaptiveInput
                    label="Full Legal Name"
                    placeholder="As appearing on your birth certificate"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </AdaptiveGrid>
              </div>
            )}

            {step === 2 && (
              <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: spacing.gapY * 1.5 }}>
                <AdaptiveGrid columns={2} minColumnWidth={250} withContainerPadding={true}>
                  <AdaptiveSelect
                    label="Residential District"
                    options={districts.map(d => ({ value: d, label: d }))}
                    value={formData.district}
                    onChange={(val) => setFormData({ ...formData, district: val })}
                    placeholder="Select district..."
                    required
                  />
                  <AdaptiveInput
                    label="Current Address"
                    placeholder="Street, City, Postal Code"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                </AdaptiveGrid>

                <div style={{ marginTop: spacing.gapY, padding: spacing.gapY, backgroundColor: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 4 }}>
                  <AdaptiveCheckbox
                    label="I solemnly declare that the information provided above is true and accurate to the best of my knowledge under the Penal Code of Sri Lanka."
                    checked={formData.termsAccepted}
                    onChange={(val) => setFormData({ ...formData, termsAccepted: val })}
                  />
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: spacing.gapX, marginTop: spacing.gapY }}>
              {step === 2 && (
                <AdaptiveButton variant="secondary" onClick={() => setStep(1)} type="button">
                  Back
                </AdaptiveButton>
              )}
              <AdaptiveButton variant="primary" type="submit" disabled={step === 2 && !formData.termsAccepted}>
                {step === 1 ? 'Next Step' : 'Submit Application'}
              </AdaptiveButton>
            </div>

          </form>
        </AdaptiveCard.Body>
      </AdaptiveCard>

    </div>
  );
}
