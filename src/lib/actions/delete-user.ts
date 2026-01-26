import prisma from "../prisma";

export async function deleteUnverifiedUsers() {
  // 1️⃣ Calculer la date limite (maintenant - 20 minutes)
  const twentyMinutesAgo = new Date(Date.now() - 20 * 60 * 1000);

  // 2️⃣ Supprimer tous les users non vérifiés et trop anciens
  const result = await prisma.user.deleteMany({
    where: {
      emailVerified: false, // ou emailVerifiedAt: null
      createdAt: {
        lt: twentyMinutesAgo,
      },
    },
  });

  return result;
}
