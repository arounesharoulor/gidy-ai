import { NextResponse } from 'next/server'

// Static profile data — no database needed
const profileData = {
  id: 'static-profile-1',
  name: 'AROUNESH A',
  bio: 'Motivated B.Tech CSE graduate with 12+ months of hands-on internship experience in full-stack and mobile development. Proficient in building scalable web and cross-platform mobile applications using React.js, React Native, Node.js, Express.js, and Spring Boot. Passionate about delivering clean, efficient code and user-focused solutions. Seeking entry-level Software Engineer / Full-Stack / Backend Developer roles to contribute to innovative projects.',
  profilePicture: 'https://images.unsplash.com/photo-1623366302587-bca2c2cf1df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  email: 'arounesharoulor@gmail.com',
  location: 'Puducherry — 605007',
  phone: '93428 99663',
  skills: [
    { id: 'skill-1', name: 'JavaScript', count: 16, profileId: 'static-profile-1' },
    { id: 'skill-2', name: 'React.js', count: 15, profileId: 'static-profile-1' },
    { id: 'skill-3', name: 'Java', count: 14, profileId: 'static-profile-1' },
    { id: 'skill-4', name: 'HTML & CSS', count: 14, profileId: 'static-profile-1' },
    { id: 'skill-5', name: 'React Native', count: 12, profileId: 'static-profile-1' },
    { id: 'skill-6', name: 'Tailwind CSS', count: 12, profileId: 'static-profile-1' },
    { id: 'skill-7', name: 'RESTful APIs', count: 11, profileId: 'static-profile-1' },
    { id: 'skill-8', name: 'Node.js', count: 10, profileId: 'static-profile-1' },
    { id: 'skill-9', name: 'Express.js', count: 8, profileId: 'static-profile-1' },
    { id: 'skill-10', name: 'Spring Boot', count: 8, profileId: 'static-profile-1' },
    { id: 'skill-11', name: 'C++', count: 6, profileId: 'static-profile-1' },
    { id: 'skill-12', name: 'Python (Basics)', count: 5, profileId: 'static-profile-1' },
  ],
  socialLinks: [
    { id: 'link-1', platform: 'github', url: 'https://github.com/arounesharoulor', profileId: 'static-profile-1' },
    { id: 'link-2', platform: 'linkedin', url: 'https://linkedin.com/in/arounesharoumougam', profileId: 'static-profile-1' },
  ],
  experiences: [
    {
      id: 'exp-1',
      company: 'NAMUVI Technologies',
      role: 'React Native Developer',
      startDate: 'Aug 2025',
      endDate: 'Nov 2025',
      description: 'Developed cross-platform mobile applications using React Native. Implemented responsive UIs with Tailwind CSS and integrated RESTful APIs using Node.js and Express.js.',
      profileId: 'static-profile-1'
    },
    {
      id: 'exp-2',
      company: 'Shiash Info Solutions',
      role: 'Java Full Stack Developer',
      startDate: 'Oct 2024',
      endDate: 'Feb 2025',
      description: 'Contributed to full-stack web applications using Spring Boot for backend development, including REST API design and implementation. Collaborated on end-to-end features focusing on secure server-side logic.',
      profileId: 'static-profile-1'
    },
    {
      id: 'exp-3',
      company: 'VEI Technologies',
      role: 'Full Stack Developer',
      startDate: 'Jan 2024',
      endDate: 'Apr 2024',
      description: 'Worked on frontend (React.js) and backend (Node.js, Java) for web applications. Developed responsive user interfaces and integrated APIs to support dynamic data flow.',
      profileId: 'static-profile-1'
    }
  ],
  educations: [
    {
      id: 'edu-1',
      institution: 'Manakula Vinayagar Institute of Technology, Puducherry',
      degree: 'B.Tech – Computer Science & Engineering',
      duration: '2021 – 2025',
      score: 'CGPA: 7.03 / 10',
      profileId: 'static-profile-1'
    },
    {
      id: 'edu-2',
      institution: 'CSC Computer Education',
      degree: 'Diploma in Full Stack Developer',
      duration: '2023 – 2024',
      score: null,
      profileId: 'static-profile-1'
    },
    {
      id: 'edu-3',
      institution: 'Petit Seminaire Higher Secondary School, Puducherry',
      degree: 'Higher Secondary Certificate – HSC',
      duration: '2021',
      score: '78.4%',
      profileId: 'static-profile-1'
    },
    {
      id: 'edu-4',
      institution: 'Petit Seminaire Higher Secondary School, Puducherry',
      degree: 'SSLC',
      duration: '2019',
      score: '70.4%',
      profileId: 'static-profile-1'
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Travel Efficiency App',
      techStack: 'React Native, AI, ACO',
      description: 'Built a mobile application that suggests fuel-efficient routes using Artificial Intelligence and Ant Colony Optimization algorithms. Integrated real-time fuel alerts and location-based features to optimize travel and reduce costs.',
      profileId: 'static-profile-1'
    },
    {
      id: 'proj-2',
      title: 'CGPA Calculator Web App',
      techStack: 'Python, Django',
      description: 'Developed a full-stack web application for students to calculate CGPA, track academic performance, and visualize results. Implemented user authentication, data storage, and responsive UI.',
      profileId: 'static-profile-1'
    },
    {
      id: 'proj-3',
      title: 'IoT Fan Automation System',
      techStack: 'Arduino, Sensors',
      description: 'Created an automated system to control fan speed based on temperature readings using Arduino and sensors. Programmed logic for real-time monitoring and energy-efficient operation.',
      profileId: 'static-profile-1'
    }
  ]
}

// In-memory skill counts for the current session (endorsements)
const skillCounts: Record<string, number> = {}

export async function GET() {
  try {
    // Merge any in-session skill endorsements
    const skills = profileData.skills.map(skill => ({
      ...skill,
      count: skill.count + (skillCounts[skill.id] || 0)
    }))

    return NextResponse.json({ ...profileData, skills })
  } catch (error) {
    console.error('GET error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    // For static data, just return the merged profile with any changes
    // (changes won't persist across deployments, but the UI will work)
    const updated = { ...profileData, ...body, id: profileData.id }
    return NextResponse.json(updated)
  } catch (error) {
    console.error('PUT error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
