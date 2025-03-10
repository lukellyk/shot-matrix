import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { ClubDistanceMatrix } from '../components/ClubDistanceMatrix';
import { GradientTitle } from '../components/GradientTitle';

export default function HomePage() {
  return (
    <>
      <GradientTitle />
      <ClubDistanceMatrix />
      <ColorSchemeToggle />
    </>
  );
}
