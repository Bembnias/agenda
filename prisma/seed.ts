import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.article.createMany({
    data: [
      {
        id: "dsfdskxchnusb2321hdsjdsad",
        title: "Best innovations in 2023",
        description:
          "Dive into our latest article to uncover the groundbreaking technology invention that's poised to revolutionize the way we live, work, and interact with the world around us. Learn how this cutting-edge innovation holds the potential to transform industries and redefine the future. Don't miss this exciting glimpse into the world of tomorrow – explore the possibilities today!",
        content:
          "Dive into our latest article to uncover the groundbreaking technology invention that's poised to revolutionize the way we live, work, and interact with the world around us. Learn how this cutting-edge innovation holds the potential to transform industries and redefine the future. Don't miss this exciting glimpse into the world of tomorrow – explore the possibilities today!",
        thumbnailUrl:
          "https://images.pexels.com/photos/212286/pexels-photo-212286.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        authorId: "clkrc8gzu0000tb1g3nt6as5t",
      },
      {
        id: "3249hndskj@3434j5b89sd",
        title: "Sleep efficiency",
        description:
          "Learn how optimizing your sleep can lead to improved cognitive function, enhanced mood, and better overall health.",
        content:
          "Learn how optimizing your sleep can lead to improved cognitive function, enhanced mood, and better overall health.",
        thumbnailUrl:
          "https://images.pexels.com/photos/3807624/pexels-photo-3807624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        authorId: "clkrc8gzu0000tb1g3nt6as5t",
        category: "BIOLOGY",
      },
    ],
  });
  await prisma.comment.create({
    data: {
      content: "Very interesting article, thanks for sharing your knowledge!",
      authorId: "clkrc8gzu0000tb1g3nt6as5t",
      articleId: "3249hndskj@3434j5b89sd",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
