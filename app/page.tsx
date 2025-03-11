import { Welcome } from '@/components/Welcome/Welcome';
import { ClubDistanceMatrix } from '../components/ClubDistanceMatrix';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';

export default function HomePage() {
  return (
    <>
      <Welcome />
      <ClubDistanceMatrix />
      <ColorSchemeToggle />
    </>
  );
}
