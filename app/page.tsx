import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { ClubDistanceMatrix } from '../components/ClubDistanceMatrix';
import { Welcome } from '@/components/Welcome/Welcome';

export default function HomePage() {
  return (
    <>
      <Welcome />
      <ClubDistanceMatrix />
      <ColorSchemeToggle />
    </>
  );
}
