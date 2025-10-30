import { HomeScreen } from '@/components/HomeScreen';

export default function Page() {
  // Here you would fetch the actual bonus status
  const canUserClaimBonus = true; 
  return <HomeScreen canClaimBonus={canUserClaimBonus} />;
}
