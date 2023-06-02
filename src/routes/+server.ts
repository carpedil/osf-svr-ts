import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
	const data = await prisma.navFunc.findMany({
		select: {
			name: true
		},
		orderBy: {
			id: 'asc'
		}
	});

	return json(data);
}

export async function POST(RequestEvent: any) {
	const { request } = RequestEvent;
	const reqData = await request.json();
	console.log('data received:', reqData);

	const message = await prisma.apiMessage.createMany({
		data: reqData,
		skipDuplicates: true
	});
	const jsonStr = JSON.stringify(message, null, 4);

	return json({
		code: 200,
		message: `data save !!!\n${jsonStr}`
	});
}
