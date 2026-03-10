import React, { useMemo, useState } from 'react';
import { 
  AdaptiveText, 
  AdaptiveTable, 
  AdaptiveCard, 
  AdaptiveDialog,
  AdaptiveButton,
  useAdaptive
} from '@aura-adaptive/aura-ui-adaptor';
import { activeApplications } from '../data/mockData';
import { BadgeCheck, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function StatusTracking() {
  const { tokens } = useAdaptive();
  const { spacing, colors } = tokens;
  
  const [selectedApp, setSelectedApp] = useState(null);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed': return <CheckCircle2 size={16} color="green" />;
      case 'Processing': return <Clock size={16} color={colors.primary} />;
      case 'Pending Review': return <AlertCircle size={16} color="orange" />;
      case 'Mailed to Address': return <BadgeCheck size={16} color="purple" />;
      default: return <Clock size={16} />;
    }
  };

  const columns = useMemo(() => [
    { id: 'id', header: 'Reference No.', accessor: 'id', sortable: true },
    { id: 'type', header: 'Service Type', accessor: 'type', sortable: true },
    { id: 'date', header: 'Submitted Date', accessor: 'date', sortable: true },
    { id: 'authority', header: 'Issuing Authority', accessor: 'authority' },
    { 
      id: 'status', 
      header: 'Current Status', 
      accessor: 'status',
      cell: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {getStatusIcon(row.status)}
          <AdaptiveText weight="semibold">{row.status}</AdaptiveText>
        </div>
      )
    },
    {
      id: 'action',
      header: '',
      accessor: 'id',
      align: 'right',
      cell: (row) => (
        <AdaptiveButton variant="secondary" onClick={() => setSelectedApp(row)}>
          View Details
        </AdaptiveButton>
      )
    }
  ], []);

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: spacing.gapY * 2 }}>
      
      <div style={{ borderBottom: `2px solid ${colors.primary}`, paddingBottom: spacing.gapY }}>
        <AdaptiveText variant="display" weight="bold" className="h-formal">
          Application Status Tracking
        </AdaptiveText>
        <AdaptiveText variant="lead" muted>
          View real-time updates for your submitted applications and requested documents below.
        </AdaptiveText>
      </div>

      <AdaptiveCard variant="content" detailed className="civic-card">
        <AdaptiveTable 
          columns={columns} 
          data={activeApplications} 
          rowKey="id" 
          variant="zebra" 
        />
      </AdaptiveCard>

      <AdaptiveDialog 
        open={!!selectedApp} 
        onClose={() => setSelectedApp(null)}
        title={`Status Details: ${selectedApp?.id}`}
      >
        {selectedApp && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.gapY }}>
            <div style={{ padding: spacing.gapY, backgroundColor: colors.surface, borderRadius: 6 }}>
              <AdaptiveText variant="overline" muted>Request Type</AdaptiveText>
              <AdaptiveText variant="h3" weight="bold">{selectedApp.type}</AdaptiveText>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
              {getStatusIcon(selectedApp.status)}
              <AdaptiveText>Status: <strong>{selectedApp.status}</strong></AdaptiveText>
            </div>
            
            <AdaptiveText muted>
              This application is currently being handled by the <strong>{selectedApp.authority}</strong>. 
              No further action is required from you at this time.
            </AdaptiveText>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: spacing.gapY }}>
              <AdaptiveButton variant="primary" onClick={() => setSelectedApp(null)}>
                Close Window
              </AdaptiveButton>
            </div>
          </div>
        )}
      </AdaptiveDialog>

    </div>
  );
}
