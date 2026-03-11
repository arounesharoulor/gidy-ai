import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const profile = await prisma.profile.findFirst();
  if (!profile) {
    console.log("No profile found to attach experiences to.");
    return;
  }

  // Clear existing experiences if necessary, or just add these
  await prisma.workExperience.deleteMany({
    where: { profileId: profile.id }
  });

  console.log("Deleted existing experiences, adding new ones...");

  const exps = [
    {
      company: "NAMUVI Technologies",
      role: "React Native Developer",
      startDate: "Aug 2025",
      endDate: "Nov 2025",
      description: "• Developed cross-platform mobile applications using React Native, enabling consistent performance on iOS and Android.\n• Implemented responsive and modern UIs with Tailwind CSS, improving user experience and development speed.\n• Built and integrated RESTful APIs using Node.js and Express.js, handling data communication between frontend and backend services.",
      profileId: profile.id
    },
    {
      company: "Shiash Info Solutions",
      role: "Java Full Stack Developer",
      startDate: "Oct 2024",
      endDate: "Feb 2025",
      description: "• Contributed to full-stack web applications using Spring Boot for backend development, including REST API design and implementation.\n• Collaborated on end-to-end features, focusing on secure and efficient server-side logic.",
      profileId: profile.id
    },
    {
      company: "VEI Technologies",
      role: "Full Stack Developer",
      startDate: "Jan 2024",
      endDate: "Apr 2024",
      description: "• Worked on both frontend (React.js) and backend (Node.js, Java) for web applications.\n• Developed responsive user interfaces and integrated APIs to support dynamic data flow.",
      profileId: profile.id
    }
  ];

  for (const exp of exps) {
    await prisma.workExperience.create({
      data: exp
    });
  }

  console.log("Successfully seeded experiences!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
