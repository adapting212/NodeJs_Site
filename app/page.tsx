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
        <section className="h-[80vh] flex flex-col md:flex-row items-center justify-between px-4 space-y-8 md:space-y-0">
          {/* Text Block */}
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-5xl font-bold text-gray-900">New Energy Muay-Thai</h1>
            <p className="text-lg text-gray-600">
              Train hard. Stay strong. Join the fight.
            </p>
            <Button size="lg">Get Started</Button>
          </div>

          {/* Image Block */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/Images/logo.jpg" // Ensure this path is correct
              alt="Boxer"
              className="h-[60vh] w-auto rounded-xl shadow-lg object-cover"
            />
          </div>
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
