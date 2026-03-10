import { FileText, Car, HeartPulse, Building2, FileBadge, Briefcase } from 'lucide-react';

export const quickServices = [
  { id: '1', title: 'National Identity Card (NIC)', desc: 'Apply for a new NIC or request a replacement for a lost card.', icon: FileBadge },
  { id: '2', title: 'Vehicle Revenue License', desc: 'Renew your annual revenue license online without visiting the Divisional Secretariat.', icon: Car },
  { id: '3', title: 'Birth Certificate Copies', desc: 'Request certified copies of birth, marriage, or death certificates.', icon: FileText },
  { id: '4', title: 'Business Registration', desc: 'Register a sole proprietorship, partnership, or limited liability company.', icon: Briefcase },
  { id: '5', title: 'Healthcare Registration', desc: 'Enroll for regional public healthcare benefits and clinic appointments.', icon: HeartPulse },
  { id: '6', title: 'Property Tax Payment', desc: 'Assess and pay municipal council taxes securely.', icon: Building2 },
];

export const activeApplications = [
  { id: 'APP-2024-8991', type: 'NIC Replacement', date: '2024-03-01', status: 'Processing', authority: 'Department of Registration of Persons' },
  { id: 'APP-2024-7432', type: 'Revenue License Renewal', date: '2024-02-28', status: 'Completed', authority: 'Department of Motor Traffic' },
  { id: 'APP-2024-6100', type: 'Birth Certificate Copy', date: '2024-02-15', status: 'Mailed to Address', authority: 'Registrar General\'s Department' },
  { id: 'APP-2024-5002', type: 'Business Name Registration', date: '2024-01-10', status: 'Pending Review', authority: 'Provincial Registrar of Companies' },
];

export const faqs = [
  {
    category: 'Digital Identity',
    items: [
      { q: 'How long does NIC processing take?', a: 'Standard processing takes 14 working days. One-day service is available at the head office.' },
      { q: 'Can I change my address online?', a: 'Yes, but you will need to upload a certified Grama Niladhari certificate as proof of residence.' }
    ]
  },
  {
    category: 'Vehicles & Transport',
    items: [
      { q: 'What documents do I need for a revenue license?', a: 'You must provide your current insurance card, eco test certificate, and vehicle registration book.' },
      { q: 'Why is my vehicle registration blocked?', a: 'Blocks usually occur due to unpaid traffic fines or leasing restrictions. Please check the Status page.' }
    ]
  }
];
