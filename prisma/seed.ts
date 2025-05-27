// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'
import { hash } from 'bcrypt'
import * as XLSX from 'xlsx'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

async function main() {
  console.log('Clearing existing data...')
  // Delete in the correct order to avoid foreign key constraint issues
  await prisma.newsItem.deleteMany({}) // Add this to delete NewsItems first
  await prisma.client.deleteMany({})
  await prisma.user.deleteMany({})
  
  // Create admin user
  const adminPasswordHash = await hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'ericbradshaw98@gmail.com' },
    update: {},
    create: {
      id: randomUUID(),
      username: 'admin',
      email: 'ericbradshaw98@gmail.com',
      passwordHash: adminPasswordHash,
      isAdmin: true, // This user is an admin
    },
  })
  
  // Create regular user
  const userPasswordHash = await hash('user123', 10)
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      id: randomUUID(),
      username: 'user',
      email: 'user@example.com',
      passwordHash: userPasswordHash,
      isAdmin: false, // This is a regular user
    },
  })

  console.log({ admin, user })
  
  // ============= Create Testimonials =============
  console.log('Creating testimonials...')
  
  const clients = [
    {
      clientName: 'Amer Networks & Amer Mounts',
      testimonialText: 'Amer Networks is a leading manufacturer of networking products including desktop switches, rackmount switches, third–party OEM–compatible transceivers, and network accessories.',
      clientImage: '/images/logo-amer-networks.png',
      logoImage: '/images/logo-amer-mounts.png',
      htmlDescription: '<p>Amer Networks is a leading manufacturer of networking products including desktop switches, rackmount switches, third-party OEM-compatible transceivers, and network accessories. Amer Networks has earned a reputation as a provider of reliable hardware backed by the most comprehensive support and customer-focused product warranties on the market with a growing line of innovative products that enhance productivity and improve efficiency — anywhere and everywhere that people connect. </p>',
    },
    {
      clientName: 'Apricorn',
      testimonialText: 'DataLocker - Military-grade Encryption',
      clientImage: '/images/logo-apricorn.png',
      htmlDescription: '<p>Apricorns patented approach to data security and portable drive encryption is centered on absolute independence from all software and operating systems. With their self-contained authentication and encryption processes, all critical security parameters take place within the drive itself and are never shared with its host. From high-capacity desktop drives to ultra-portable USB thumb drives, secure Apricorn devices are the safest places in the world for your data.</p>',
    },
    {
      clientName: 'Fluke Networks',
      testimonialText: 'The Fluke Networks Certified Cabling Test Technician (CCTT) course provides expert-level training to certify employees in the installation and testing of high-speed structured cabling systems. Their two-day course covers every aspect of the setup, configuration, testing, and results management through classroom training, hands-on labs, certification exercises, and a final exam.\n\nInvesting in the Fluke Networks CCTT training and certification program will not only improve cabling technician installer skills, but also their effectiveness and productivity on the job in testing, certifying, and troubleshooting structured cabling systems.\n\nFor dates and cost of the CCTT course, please reach out to anobile@keating.com',
      clientImage: '/images/logo-fluke-networks.png',
      htmlDescription: '<p>Fluke Networks is the worldwide leader in certification, troubleshooting, and installation tools for professionals who install and maintain critical network cabling infrastructure. Customers include Datacom Contractors and Data Center/Network and Communications Service Technicians. Products include Cabling Certification Testers (Copper and Fiber), Installation and Test Tools, and Telcom Test Tools. From installing the most advanced data centers to restoring telephone service after a disaster, our combination of legendary reliability and unmatched performance ensure jobs are done efficiently. </p>',
      htmlDescription2: '<p>The Fluke Networks Certified Cabling Test Technician (CCTT) course provides expert-level training to certify employees in the installation and testing of high-speed structured cabling systems. Their two-day course covers every aspect of the setup, configuration, testing, and results management through classroom training, hands-on labs, certification exercises, and a final exam.</p>\n\n<p>Investing in the Fluke Networks CCTT training and certification program will not only improve cabling technician installer skills, but also their effectiveness and productivity on the job in testing, certifying, and troubleshooting structured cabling systems.</p>\n\n<p>For dates and cost of the CCTT course, please reach out to <a href="mailto:anobile@keating.com">anobile@keating.com</a></p>',
    },
    {
      clientName: 'IOGEAR',
      testimonialText: 'IOGEAR - Innovative Consumer Electronics and Information Technology Solutions',
      clientImage: '/images/logo-iogear.png',
      htmlDescription: '<p>IOGEAR is committed to providing innovative all-in-one computer connectivity solutions and support for users. Our goal is to provide economical, ecological and user-friendly tools for the user to access complex and sophisticated technology. IOGEAR\'s solutions are designed to help the user enhance and enjoy their lives with the convenience of state-of-the-art hi-tech products.</p>',
    },
    {
      clientName: 'Kensington',
      testimonialText: 'Kensington',
      clientImage: '/images/logo-kensington.png',
      htmlDescription: '<p>From docking stations and power delivery to input devices and ergonomics (and much more), Kensington designs, engineers, and builds award-winning products that have been trusted by professionals for over 40 years. They identify areas of improvement in the modern workplace and produce high-quality solutions for organizations that want to empower their staff to do their best work.\nKensington is a division of ACCO Brands, one of the world\'s largest designers, marketers, and manufacturers of branded business, academic, and consumer products, sold in more than 100 countries around the globe.</p>',
    },
    {
      clientName: 'LapCabby',
      testimonialText: 'LapCabby - Portable and Static IT Storage, Charge and Sync Solutions',
      clientImage: '/images/logo-lapcabby.png',
      htmlDescription: '<p>LapCabby has been developing innovative products that our customers love for the past 20 years. LapCabby make portable storage carts and charging solutions for notebooks, tablets, e-readers and chromebooks.</p>\n<p>Our carts are used everywhere, from Education, Healthcare, Corporate and all 3 levels of government.</p>',
    },
    {
      clientName: 'NetAlly',
      testimonialText: 'NetAlly - NetAlly Network Testing Tools',
      clientImage: '/images/logo-netally.png',
      htmlDescription: '<p>\nNetAlly are experts in the field of network testing and analysis, with a portfolio of tools that encompass the heritage of former brands, Fluke Networks, Inc., and NETSCOUT Systems, Inc. NetAllys tools deliver simplicity of execution through automated testing that a non-expert can interpret, presented clearly and simply. NetAlly provide visibility across wireless and wired infrastructure, actionable information and depth of analysis, saving network teams time, and the business money! NetAlly provides a cloud-delivered service enabling sharing of accumulated test data, driving collaboration with team members ensuring the cause of network problems, even intermittent ones, can be documented to close the trouble ticket.</p>',
    },
    {
      clientName: 'NPC',
      testimonialText: 'NPC Cybersecurity Services',
      clientImage: '/images/logo-npc.png',
      htmlDescription: '<p>\nNPC specializes in secure computing that takes the risk and hassle out of IT. Their turn-key cybersecurity solution helps keep businesses safe by keeping their data secure. NPC DataGuard not only reduces the time lost in the event of a security breach, but it also improves productivity by connecting data security, device security, cloud storage, and technical support into a single, powerful solution that empowers and protects businesses. NPC DataGuard is a division of Compugen Inc.</p>',
      htmlDescription2: '<p>\nNPC offers additional services for those who want to evaluate their cybersecurity readiness or reveal any potential vulnerabilities. These Cybersecurity Assessments, internal Vulnerability Assessments, and external Penetration Testing enable businesses and organizations of all sizes get peace of mind by closing vulnerabilities before they become liabilities and ensuring regulatory compliance are met or exceeded.</p>',
    },
    {
      clientName: 'Siemon',
      testimonialText: 'Siemon - A global provider of innovative network cabling solutions',
      clientImage: '/images/logo-siemon.png',
      htmlDescription: '<p>\nSiemon is an industry leader in the design and manufacturing of high–quality, high–performance IT infrastructure solutions and services for data centers, intelligent buildings, enterprise LANs, and wireless.</p>\n\n<p>Siemon offers the most comprehensive suites of copper and optical fiber cabling systems, cabinets, racks, cable management, data center power and cooling systems.</p>',
    },
    {
      clientName: 'Ventev',
      testimonialText: 'Ventev - Industry-leading manufactures of wireless infrastructure products',
      clientImage: '/images/logo-ventev.png',
      htmlDescription: `<p>\nVentev engineers and manufactures infrastructure products designed to power, protect, connect, and conceal wireless networks. Ventev's innovative products improve network performance and solve deployment challenges. Products are available for indoor and outdoor Wi-Fi, LTE, DAS, SCADA, CBRS, and other wireless networks.</p>`,
    },
    {
      clientName: 'Wilson Electronics',
      testimonialText: 'Wilson Electronics - Leading manufacturer of cellular signal booster technology',
      clientImage: '/images/logo-wilson-electronics.png',
      htmlDescription: '<p>\nWilson Electronics — makers of the WilsonPro and weBoost line of cellular signal boosters — is a leader in wireless communications infrastructure and dedicated to delivering access to communications for everyone, everywhere. The company has designed and manufactured cell phone signal boosters, antennas, and related components for workplaces, vehicles, and commercial buildings.</p>',
    },
  ];

  console.log(`Seeding ${clients.length} clients...`);

  let clientId = 1; // Start with ID 1

  for (const client of clients) {
    await prisma.client.create({
      data: {
        id: clientId++, // Explicitly set and increment the ID
        clientName: client.clientName,
        testimonialText: client.testimonialText,
        clientImage: client.clientImage,
        logoImage: client.logoImage,
        htmlDescription: client.htmlDescription,
        htmlDescription2: client.htmlDescription2 || null,
      }
    });
  }
  
  console.log('Client seeding completed!')

  function parseExcelDate(dateString: any): Date | null {
    if (!dateString) return null;
    
    // If it's already a Date object, return it
    if (dateString instanceof Date) return dateString;
    
    // If it's a string, try to parse it
    if (typeof dateString === 'string') {
      // First, check if it has the MM/DD/YYYY format with time
      const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})$/;
      const match = dateString.match(dateRegex);
      
      if (match) {
        // Extract components: [full match, month, day, year, hours, minutes]
        const month = parseInt(match[1]) - 1; // Month is 0-indexed in JavaScript
        const day = parseInt(match[2]);
        const year = parseInt(match[3]);
        const hours = parseInt(match[4]);
        const minutes = parseInt(match[5]);
        
        return new Date(year, month, day, hours, minutes);
      }
      
      // If the regex didn't match, try standard Date parsing
      const parsedDate = new Date(dateString);
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate;
      }
    }
    
    // Handle Excel serial date numbers (days since 1/1/1900)
    if (typeof dateString === 'number') {
      // Excel's date system has a bug where it incorrectly treats 1900 as a leap year
      // We need to adjust dates after 2/28/1900
      const excelEpoch = new Date(1899, 11, 30); // 12/30/1899
      const daysSinceEpoch = dateString;
      const millisecondsSinceEpoch = daysSinceEpoch * 24 * 60 * 60 * 1000;
      return new Date(excelEpoch.getTime() + millisecondsSinceEpoch);
    }
    
    console.warn(`Could not parse date: ${dateString}`);
    return null;
  }
  
  // ============= Import NewsItems from Excel =============
  console.log('Importing NewsItems from Excel...')
  
  try {
    const excelFilePath = path.resolve(__dirname, '../data/news_items.csv')
    
    // Read the Excel file
    const workbook = XLSX.readFile(excelFilePath)
    
    // Get the first worksheet
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]

    interface NewsItemExcel {
      post_title?: string;
      post_content?: string;
      post_author?: string;
      name?: string;
      image_url?: string;
      guid?: string;
      post_type?: string;
      post_date?: string | Date;
      post_modified?: string | Date;
      [key: string]: any; // Allow for additional properties
    }
    
    // Convert the worksheet to JSON
    const newsItems = XLSX.utils.sheet_to_json(worksheet) as NewsItemExcel[];

    const reversedItems = [...newsItems].reverse();
    
    console.log(`Found ${newsItems.length} news items in Excel file`)
    

    let newsId = 1;
    // Process and insert each news item
    for (const item of reversedItems) {
      await prisma.newsItem.create({
        data: {
          id: newsId++,
          title: String(item.post_title || ''),
          content: String(item.post_content || ''),
          author: item.post_author ? String(item.post_author) : null,
          name: item.name ? String(item.name) : null,
          imageUrl: item.image_url ? String(item.image_url) : null,
          guid: String(item.guid || randomUUID()), // Use provided GUID or generate one
          postType: String(item.post_type || 'post'),
          postDate: parseExcelDate(item.post_date),
          postModified: parseExcelDate(item.post_modified),
        }
      })
    }
    
    console.log('NewsItems seeding completed!')
  } catch (error) {
    console.error('Error importing NewsItems from Excel:', error)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })