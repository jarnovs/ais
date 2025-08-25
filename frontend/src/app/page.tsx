export const dynamic = 'force-dynamic';

import Navbar from "@/widgets/eaip/navbar";
import Hero from "@/widgets/eaip/hero";
import Issues from "@/widgets/eaip/issues";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Issues />
    </div>
  );
}
