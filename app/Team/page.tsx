import { title } from "@/components/primitives";
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardBody } from '@heroui/react';

const teamMembers = [
  {
    name: 'John Doe',
    role: 'Head Coach',
    image: '/images/john.jpg',
    slug: 'john-doe',
  },
  {
    name: 'Jane Smith',
    role: 'Muay Thai Specialist',
    image: '/images/jane.jpg',
    slug: 'jane-smith',
  },
  {
    name: 'Mike Lee',
    role: 'Boxing Trainer',
    image: '/images/mike.jpg',
    slug: 'mike-lee',
  },
  // Add more members here...
];

export default function TeamPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Meet Our Team</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
          <Link key={member.slug} href={`/team/${member.slug}`}>
            <Card className="cursor-pointer hover:shadow-xl transition-shadow duration-300">
              <CardBody className="p-0">
                <div className="relative h-64 w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-t-xl"
                  />
                </div>
                <div className="p-4 text-center">
                  <h2 className="text-xl font-semibold">{member.name}</h2>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
