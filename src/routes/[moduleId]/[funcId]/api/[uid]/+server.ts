// import { json } from '@sveltejs/kit';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function POST(RequestEvent) {
// 	const {request} = RequestEvent;
// 	const reqData = await request.json();
// 	console.log('data received:', reqData);

// 	const message = await prisma.sendMessage.update({
// 		where: {
// 			id: reqData.id
// 		},
// 		data: {
// 			function: reqData.function,
// 			edition: reqData.edition,
// 			invoke: reqData.invoke,
// 			sendto: reqData.sendto,
// 			received: reqData.received,
// 			send_parms: reqData.send_parms.join(';'),
// 			received_params: reqData.received_params.join(';'),
// 			comment: reqData.comment
// 		}
// 	});
// 	const jsonStr = JSON.stringify(message, null, 4);

// 	return json({
// 		message: `data updated !!!\n${jsonStr}`
// 	});
// }
