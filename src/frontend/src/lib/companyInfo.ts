export const COMPANY_INFO = {
  name: 'Sanwariya Testing Lab LLP',
  shortName: 'Sanwariya Testing Lab',
  address: {
    line1: 'Ground Floor, Plot No.-G1-548',
    line2: 'RIICO industrial area, Sitapura',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302022',
  },
  gstin: '08AFQFS6982Q1ZK',
  email: 'sanwariyatestinglab@gmail.com',
  phones: ['8890074166', '7737031940'],
  googleMapsUrl: 'https://maps.app.goo.gl/KETasMvUVDqNtvUQA',
} as const;

export function getFullAddress(): string {
  const { address } = COMPANY_INFO;
  return `${address.line1}, ${address.line2}, ${address.city}, ${address.state} – ${address.pincode}`;
}
