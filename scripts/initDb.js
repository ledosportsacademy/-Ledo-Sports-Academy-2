const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load models
const Hero = require('../models/Hero');
const Activity = require('../models/Activity');
const Member = require('../models/Member');
const Donation = require('../models/Donation');
const Expense = require('../models/Expense');
const Experience = require('../models/Experience');
const WeeklyFee = require('../models/WeeklyFee');
const Gallery = require('../models/Gallery');

// Load environment variables
dotenv.config();

// Sample data from frontend app.js
const sampleData = {
  heroSlides: [
    {
      title: "Welcome to Ledo Sports Academy",
      subtitle: "Where Champions Are Born",
      description: "Join India's premier sports academy and unlock your potential with world-class training facilities and expert coaches.",
      backgroundImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=800&fit=crop",
      ctaText: "Join Today",
      ctaLink: "#members",
      redirectUrl: "https://forms.google.com/register",
      openNewTab: true
    },
    {
      title: "Championship Victory 2024",
      subtitle: "Making History Together",
      description: "Celebrating our regional championship win with exceptional team performance and dedication.",
      backgroundImage: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=1200&h=800&fit=crop",
      ctaText: "Our Journey",
      ctaLink: "#experiences",
      redirectUrl: "",
      openNewTab: false
    },
    {
      title: "State-of-the-Art Facilities",
      subtitle: "Training Excellence",
      description: "Experience training like never before with our modern facilities, synthetic turf, and advanced equipment.",
      backgroundImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop",
      ctaText: "Explore",
      ctaLink: "#activities",
      redirectUrl: "",
      openNewTab: false
    },
    {
      title: "Community Sports Festival",
      subtitle: "Building Tomorrow's Athletes",
      description: "Fostering sports culture and healthy competition with over 500 participants from local schools.",
      backgroundImage: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=1200&h=800&fit=crop",
      ctaText: "Support Us",
      ctaLink: "#donations",
      redirectUrl: "https://donate.example.com/ledo-academy",
      openNewTab: true
    }
  ],
  activities: [
    {
      title: "Championship League Match vs Eagles FC",
      date: "2025-08-12",
      time: "16:00",
      description: "Ledo Sports Academy vs Eagles FC - Championship League Quarter Final match at home ground.",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop",
      status: "upcoming",
      type: "match",
      priority: "high",
      redirectUrl: "https://tickets.example.com/eagles-match",
      openNewTab: true
    },
    {
      title: "Annual Sports Day Celebration",
      date: "2025-08-18",
      time: "09:00",
      description: "Join us for our annual sports day with competitions, awards ceremony, and community celebration.",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
      status: "upcoming",
      type: "event",
      priority: "high",
      redirectUrl: "https://events.example.com/sports-day-2025",
      openNewTab: true
    },
    {
      title: "Weekly Training Session",
      date: "2025-08-06",
      time: "17:30",
      description: "Regular training session for all academy members at the main practice field.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      status: "recent",
      type: "training",
      priority: "medium",
      redirectUrl: "",
      openNewTab: false
    },
    {
      title: "Junior Academy Trials",
      date: "2025-08-22",
      time: "14:00",
      description: "Open trials for junior academy program. Ages 8-16 welcome to showcase their talent.",
      image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&h=600&fit=crop",
      status: "upcoming",
      type: "trial",
      priority: "high",
      redirectUrl: "https://trials.example.com/junior-academy",
      openNewTab: true
    },
    {
      title: "Inter-Academy Tournament",
      date: "2025-08-25",
      time: "10:00",
      description: "Regional tournament featuring top sports academies. Multiple matches throughout the day.",
      image: "https://images.unsplash.com/photo-1526232761682-d26e85d9d5c8?w=800&h=600&fit=crop",
      status: "upcoming",
      type: "tournament",
      priority: "high",
      redirectUrl: "",
      openNewTab: false
    },
    {
      title: "Skills Development Workshop",
      date: "2025-08-08",
      time: "15:00",
      description: "Special workshop focusing on advanced football techniques and tactical awareness.",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
      status: "upcoming",
      type: "workshop",
      priority: "medium",
      redirectUrl: "https://workshop.example.com/skills-dev",
      openNewTab: true
    }
  ],
  members: [
    {
      name: "Arjun Sharma",
      contact: "arjun@email.com",
      phone: "+91-9876-543210",
      joinDate: "2023-01-15",
      role: "Team Captain",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Priya Patel",
      contact: "priya@email.com",
      phone: "+91-9876-543211",
      joinDate: "2023-02-20",
      role: "Vice Captain",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332b6d9?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Rohit Kumar",
      contact: "rohit@email.com",
      phone: "+91-9876-543212",
      joinDate: "2023-03-10",
      role: "Senior Player",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Anita Singh",
      contact: "anita@email.com",
      phone: "+91-9876-543213",
      joinDate: "2023-04-05",
      role: "Goalkeeper Coach",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Vikram Gupta",
      contact: "vikram@email.com",
      phone: "+91-9876-543214",
      joinDate: "2023-05-12",
      role: "Defense Specialist",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Deepika Rao",
      contact: "deepika@email.com",
      phone: "+91-9876-543215",
      joinDate: "2023-06-18",
      role: "Forward",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Rahul Verma",
      contact: "rahul@email.com",
      phone: "+91-9876-543216",
      joinDate: "2023-07-22",
      role: "Midfielder",
      image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Sneha Joshi",
      contact: "sneha@email.com",
      phone: "+91-9876-543217",
      joinDate: "2023-08-15",
      role: "Junior Trainer",
      image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150&h=150&fit=crop&crop=face"
    }
  ],
  donations: [
    {
      donorName: "Ledo Foundation Trust",
      amount: 50000,
      date: "2025-07-10",
      purpose: "Infrastructure Development"
    },
    {
      donorName: "Local Sports Committee",
      amount: 25000,
      date: "2025-07-15",
      purpose: "Equipment Purchase"
    },
    {
      donorName: "Arjun Sharma",
      amount: 5000,
      date: "2025-07-20",
      purpose: "Youth Development Program"
    },
    {
      donorName: "City Business Association",
      amount: 15000,
      date: "2025-07-25",
      purpose: "Tournament Participation"
    },
    {
      donorName: "Anonymous Supporter",
      amount: 8000,
      date: "2025-08-01",
      purpose: "General Academy Operations"
    },
    {
      donorName: "Parents Association",
      amount: 12000,
      date: "2025-08-02",
      purpose: "New Uniforms and Kit"
    }
  ],
  expenses: [
    {
      description: "Training Equipment Purchase",
      amount: 15000,
      date: "2025-07-05",
      category: "Equipment",
      vendor: "Sports Pro Equipment Ltd",
      paymentMethod: "Bank Transfer"
    },
    {
      description: "Monthly Ground Maintenance",
      amount: 8000,
      date: "2025-07-01",
      category: "Maintenance",
      vendor: "Green Fields Services",
      paymentMethod: "Cash"
    },
    {
      description: "Coach Transportation Allowance",
      amount: 3500,
      date: "2025-07-10",
      category: "Transportation",
      vendor: "Coaching Staff",
      paymentMethod: "UPI"
    },
    {
      description: "Utility Bills - Electricity",
      amount: 4200,
      date: "2025-07-15",
      category: "Utilities",
      vendor: "State Electricity Board",
      paymentMethod: "Online"
    },
    {
      description: "Medical Kit and First Aid Supplies",
      amount: 2800,
      date: "2025-07-18",
      category: "Medical",
      vendor: "MedCare Supplies",
      paymentMethod: "Card"
    },
    {
      description: "Tournament Registration Fees",
      amount: 12000,
      date: "2025-07-22",
      category: "Tournament",
      vendor: "Regional Sports Federation",
      paymentMethod: "Bank Transfer"
    },
    {
      description: "Marketing and Publicity Materials",
      amount: 5500,
      date: "2025-07-25",
      category: "Marketing",
      vendor: "Creative Print Solutions",
      paymentMethod: "Cash"
    },
    {
      description: "Insurance Premium",
      amount: 18000,
      date: "2025-07-28",
      category: "Insurance",
      vendor: "National Insurance Co",
      paymentMethod: "Bank Transfer"
    },
    {
      description: "Refreshments for Training Sessions",
      amount: 3200,
      date: "2025-08-01",
      category: "Food & Beverage",
      vendor: "Local Caterers",
      paymentMethod: "UPI"
    },
    {
      description: "Office Supplies and Stationery",
      amount: 1800,
      date: "2025-08-02",
      category: "Office",
      vendor: "Office Mart",
      paymentMethod: "Card"
    }
  ],
  experiences: [
    {
      title: "Regional Championship Victory 2024",
      date: "2024-12-20",
      description: "Ledo Sports Academy clinched the regional championship title after defeating three top academies. Our players showcased exceptional skill and teamwork throughout the tournament.",
      image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400&h=300&fit=crop"
    },
    {
      title: "New Training Complex Inauguration",
      date: "2024-10-15",
      description: "Official opening of our state-of-the-art training complex with modern facilities, synthetic turf, and advanced training equipment. A milestone achievement for Ledo Sports Academy.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
    },
    {
      title: "Community Sports Festival Success",
      date: "2024-08-18",
      description: "Organized and hosted the annual community sports festival with over 500 participants from 15 local schools. The event promoted sports culture and healthy competition.",
      image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=400&h=300&fit=crop"
    },
    {
      title: "Academy's 5th Anniversary Celebration",
      date: "2024-06-10",
      description: "Celebrated Ledo Sports Academy's 5th anniversary with a grand ceremony attended by over 400 members, alumni, and supporters. Honored our achievements and future vision.",
      image: "https://images.unsplash.com/photo-1555717588-d53f4e5ea81c?w=400&h=300&fit=crop"
    },
    {
      title: "First National Tournament Participation",
      date: "2024-04-25",
      description: "Ledo Sports Academy made its debut in the national tournament, reaching the semi-finals. A proud moment that marked our entry into elite-level competition.",
      image: "https://images.unsplash.com/photo-1526232761682-d26e85d9d5c8?w=400&h=300&fit=crop"
    }
  ],
  gallery: [
    {
      title: "Training Session",
      url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
      album: "Training",
      isTopFive: true,
      order: 1
    },
    {
      title: "Championship Trophy",
      url: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=800",
      album: "Awards",
      isTopFive: true,
      order: 2
    },
    {
      title: "Team Photo",
      url: "https://images.unsplash.com/photo-1555717588-d53f4e5ea81c?w=800",
      album: "Team",
      isTopFive: true,
      order: 3
    },
    {
      title: "Youth Program",
      url: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800",
      album: "Youth",
      isTopFive: true,
      order: 4
    },
    {
      title: "New Facility",
      url: "https://images.unsplash.com/photo-1526232761682-d26e85d9d5c8?w=800",
      album: "Facilities",
      isTopFive: true,
      order: 5
    }
  ]
};

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://ledosportsacademy:I9R3MjfaSSYFXMKS@cluster0.l6exrot.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function initializeDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Hero.deleteMany({});
    await Activity.deleteMany({});
    await Member.deleteMany({});
    await Donation.deleteMany({});
    await Expense.deleteMany({});
    await Experience.deleteMany({});
    await WeeklyFee.deleteMany({});
    await Gallery.deleteMany({});

    console.log('Cleared existing data');

    // Insert hero slides
    await Hero.insertMany(sampleData.heroSlides);
    console.log('Inserted hero slides');

    // Insert activities
    await Activity.insertMany(sampleData.activities);
    console.log('Inserted activities');

    // Insert members
    const members = await Member.insertMany(sampleData.members);
    console.log('Inserted members');

    // Insert donations
    await Donation.insertMany(sampleData.donations);
    console.log('Inserted donations');

    // Insert expenses
    await Expense.insertMany(sampleData.expenses);
    console.log('Inserted expenses');

    // Insert experiences
    await Experience.insertMany(sampleData.experiences);
    console.log('Inserted experiences');

    // Insert gallery items
    await Gallery.insertMany(sampleData.gallery);
    console.log('Inserted gallery items');

    // Create weekly fees for each member
    const weeklyFees = [];
    
    // Sample payment data from frontend
    const paymentTemplates = [
      [
        {"date": "2025-07-06", "amount": 20, "status": "paid"},
        {"date": "2025-07-13", "amount": 20, "status": "paid"},
        {"date": "2025-07-20", "amount": 20, "status": "paid"},
        {"date": "2025-07-27", "amount": 20, "status": "paid"},
        {"date": "2025-08-03", "amount": 20, "status": "pending"}
      ],
      [
        {"date": "2025-07-06", "amount": 20, "status": "paid"},
        {"date": "2025-07-13", "amount": 20, "status": "paid"},
        {"date": "2025-07-20", "amount": 20, "status": "overdue"},
        {"date": "2025-07-27", "amount": 20, "status": "paid"},
        {"date": "2025-08-03", "amount": 20, "status": "pending"}
      ],
      [
        {"date": "2025-07-06", "amount": 20, "status": "paid"},
        {"date": "2025-07-13", "amount": 20, "status": "paid"},
        {"date": "2025-07-20", "amount": 20, "status": "paid"},
        {"date": "2025-07-27", "amount": 20, "status": "paid"},
        {"date": "2025-08-03", "amount": 20, "status": "paid"}
      ]
    ];
    
    for (let i = 0; i < members.length; i++) {
      const member = members[i];
      const templateIndex = i % paymentTemplates.length;
      
      // Convert payment dates to Date objects
      const payments = paymentTemplates[templateIndex].map(payment => ({
        date: new Date(payment.date),
        amount: payment.amount,
        status: payment.status
      }));
      
      weeklyFees.push({
        memberId: member._id,
        memberName: member.name,
        payments: payments
      });
    }
    
    await WeeklyFee.insertMany(weeklyFees);
    console.log('Inserted weekly fees');

    console.log('Database initialization complete!');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

initializeDatabase();