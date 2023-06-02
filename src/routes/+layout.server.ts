import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const load = async () => {
	let title = 'OSF Server Api A/B Test Function';
	const menus = await prisma.navMenu.findMany({
		include: {
			funcs: true
		}
	});

	return {
		title,
		menus
	};
};
