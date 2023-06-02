import { format } from 'date-fns';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const load = async (serverLoadEvent: { params: any }) => {
	const { params } = serverLoadEvent;
	const { moduleId, funcId } = params;
	// console.log(funcId);

	const navFunc = await prisma.navFunc.findFirst({
		where: {
			path: {
				equals: `/${moduleId}/${funcId}`
			}
		},
		include: {
			messages: {
				orderBy: {
					id: 'asc'
				}
			}
		}
	});

	// 处理消息日期格式
	if (navFunc !== null) {
		processDateTimeForamte(navFunc.messages);
		console.log(funcId, navFunc.messages.length);
		return { navFunc };
	}
};

function processDateTimeForamte(data: any[]) {
	data.forEach(
		(item: { created_at: string | number | Date; updated_at: string | number | Date }) => {
			item.created_at = format(new Date(item.created_at), 'yyyy-mm-dd HH:mm:ss');
			item.updated_at = format(new Date(item.updated_at), 'yyyy-mm-dd HH:mm:ss');
		}
	);
}
