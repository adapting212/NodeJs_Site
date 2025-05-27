'use client';

import ImageCarousel from '@/components/ImageCarousel';
import { Button, Card, CardBody } from '@heroui/react';
import { Mail, Calendar, Dumbbell } from 'lucide-react';

export default function Home() {
  const images = [
  '/Images/boxing1.jpg',
  '/Images/boxing2.jpg',
  '/Images/boxing3.jpg',
];
  return (
    <>
      {/* Full-width carousel, independent of layout formatting */}
      <section className="w-full overflow-hidden">
        <div className="w-full h-[50vh] relative">
          <ImageCarousel images={images} />
        </div>
      </section>

      {/* Standard content section */}
      <main className="py-16 px-4 space-y-16 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-5xl font-bold text-gray-900">Iron Fist Boxing Club</h1>
          <p className="text-lg text-gray-600">
            Train hard. Stay strong. Join the fight.
          </p>
          <Button size="lg">Get Started</Button>
        </section>

        {/* Feature Cards */}
        <section className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardBody className="text-center space-y-3 p-6">
              <Dumbbell className="mx-auto text-primary" size={36} />
              <h2 className="text-xl font-semibold">Training Programs</h2>
              <p className="text-gray-600">
                Personalized sessions for all skill levels.
              </p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="text-center space-y-3 p-6">
              <Calendar className="mx-auto text-primary" size={36} />
              <h2 className="text-xl font-semibold">Flexible Schedule</h2>
              <p className="text-gray-600">
                Classes available mornings, evenings, and weekends.
              </p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="text-center space-y-3 p-6">
              <Mail className="mx-auto text-primary" size={36} />
              <h2 className="text-xl font-semibold">Contact & Community</h2>
              <p className="text-gray-600">
                Reach out anytime. We’re here to help.
              </p>
            </CardBody>
          </Card>
        </section>
      </main>
    </>
  );
}
