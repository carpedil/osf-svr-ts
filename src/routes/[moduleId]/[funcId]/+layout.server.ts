import { PrismaClient, type NavFunc } from '@prisma/client';

const prisma = new PrismaClient();

export const load = async (serverLoadEvent: { params: any }) => {
	const { params } = serverLoadEvent;
	const { funcId } = params;

	const func = await prisma.navFunc.findFirst({
		where: {
			path: {
				endsWith: `${funcId}`
			}
		}
	});

	return {
		func
	};
};
