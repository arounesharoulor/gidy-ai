const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.profile.deleteMany({})

  const profile = await prisma.profile.create({
    data: {
      name: 'AROUNESH A',
      bio: 'Motivated B.Tech CSE graduate with 12+ months of hands-on internship experience in full-stack and mobile development. Proficient in building scalable web and cross-platform mobile applications using React.js, React Native, Node.js, Express.js, and Spring Boot. Passionate about delivering clean, efficient code and user-focused solutions. Seeking entry-level Software Engineer / Full-Stack / Backend Developer roles to contribute to innovative projects.',
      profilePicture: 'https://images.unsplash.com/photo-1623366302587-bca2c2cf1df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      email: 'arounesharoulor@gmail.com',
      location: 'Puducherry — 605007',
      phone: '93428 99663',
      skills: {
        create: [
          { name: 'React Native', count: 12 },
          { name: 'React.js', count: 15 },
          { name: 'Node.js', count: 10 },
          { name: 'Express.js', count: 8 },
          { name: 'Java', count: 14 },
          { name: 'Spring Boot', count: 8 },
          { name: 'JavaScript', count: 16 },
          { name: 'Tailwind CSS', count: 12 },
          { name: 'RESTful APIs', count: 11 },
          { name: 'Python (Basics)', count: 5 },
          { name: 'C++', count: 6 },
          { name: 'HTML & CSS', count: 14 }
        ]
      },
      socialLinks: {
        create: [
          { platform: 'github', url: 'https://github.com/arounesharoulor' },
          { platform: 'linkedin', url: 'https://linkedin.com/in/arounesharoumougam' },
        ]
      },
      experiences: {
        create: [
          {
            company: 'NAMUVI Technologies',
            role: 'React Native Developer',
            startDate: 'Aug 2025',
            endDate: 'Nov 2025',
            description: 'Developed cross-platform mobile applications using React Native. Implemented responsive UIs with Tailwind CSS and integrated RESTful APIs using Node.js and Express.js.'
          },
          {
            company: 'Shiash Info Solutions',
            role: 'Java Full Stack Developer',
            startDate: 'Oct 2024',
            endDate: 'Feb 2025',
            description: 'Contributed to full-stack web applications using Spring Boot for backend development, including REST API design and implementation. Collaborated on end-to-end features focusing on secure server-side logic.'
          },
          {
            company: 'VEI Technologies',
            role: 'Full Stack Developer',
            startDate: 'Jan 2024',
            endDate: 'Apr 2024',
            description: 'Worked on frontend (React.js) and backend (Node.js, Java) for web applications. Developed responsive user interfaces and integrated APIs to support dynamic data flow.'
          }
        ]
      },
      educations: {
        create: [
          {
            institution: 'Manakula Vinayagar Institute of Technology, Puducherry',
            degree: 'B.Tech – Computer Science & Engineering',
            duration: '2021 – 2025',
            score: 'CGPA: 7.03 / 10'
          },
          {
            institution: 'CSC Computer Education',
            degree: 'Diploma in Full Stack Developer',
            duration: '2023 – 2024',
            score: null
          },
          {
            institution: 'Petit Seminaire Higher Secondary School, Puducherry',
            degree: 'Higher Secondary Certificate – HSC',
            duration: '2021',
            score: '78.4%'
          },
          {
            institution: 'Petit Seminaire Higher Secondary School, Puducherry',
            degree: 'SSLC',
            duration: '2019',
            score: '70.4%'
          }
        ]
      },
      projects: {
        create: [
          {
            title: 'Travel Efficiency App',
            techStack: 'React Native, AI, ACO',
            description: 'Built a mobile application that suggests fuel-efficient routes using Artificial Intelligence and Ant Colony Optimization algorithms. Integrated real-time fuel alerts and location-based features to optimize travel and reduce costs.'
          },
          {
            title: 'CGPA Calculator Web App',
            techStack: 'Python, Django',
            description: 'Developed a full-stack web application for students to calculate CGPA, track academic performance, and visualize results. Implemented user authentication, data storage, and responsive UI.'
          },
          {
            title: 'IoT Fan Automation System',
            techStack: 'Arduino, Sensors',
            description: 'Created an automated system to control fan speed based on temperature readings using Arduino and sensors. Programmed logic for real-time monitoring and energy-efficient operation.'
          }
        ]
      }
    }
  })
  console.log('Database seeded with profile:', profile.name)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
