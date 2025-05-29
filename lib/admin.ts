import { auth } from "@clerk/nextjs/server";


const adminIds = [
  "user_2wWtrPMU3yATd0f6POn8DDVgEuI",
  "user_2xmOKTeZdXARBQUn9aT8vuZDvAM",
];

export const isAdmin = async () => {
  const { userId } = await auth();

  if (!userId) {
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
};
