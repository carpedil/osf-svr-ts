import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const load = async (serverLoadEvent: { params: any }) => {
	const { params } = serverLoadEvent;
	const { moduleId } = params;

	const functions = await prisma.navFunc.findMany({
		where: {
			nav_path: {
				startsWith: `/${moduleId}`
			}
		}
	});

	functions.forEach((func) => {
		func.path = `${func.path}/api`;
	});

	// console.log(navFuncs)
	return {
		functions
	};
};
