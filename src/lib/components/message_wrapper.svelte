<script lang="ts">
	import { Textarea } from 'flowbite-svelte';
	import MessageAccordion from '$lib/components/message_accordion.svelte';
	import { ApiMessage } from '$lib/models';
	import { LogData, SendMessage } from '$lib/models';
	import type { Event } from '$lib/models';

	let old_messages: SendMessage[] = [];
	let new_messages: SendMessage[] = [];
	let api_messages: ApiMessage[] = [];

	const handleChangeOld: (evt: Event) => void = (evt) => {
		let logdata = new LogData(evt.target.value.trim());
		logdata.processLog();
		const list = [];
		for (let log of logdata.data) {
			// console.log('log\n', log);
			let msg = new SendMessage();
			msg.try_from('', log);
			// console.log(msg);
			list.push(msg);
		}
		old_messages = list;
		// console.log(old_messages);
		into_api_message(old_messages, new_messages);
	};
	const handleChangeNew: (evt: Event) => void = (evt) => {
		let logdata = new LogData(evt.target.value.trim());
		logdata.processLog();
		const list = [];
		for (let log of logdata.data) {
			let msg = new SendMessage();
			msg.try_from('', log);
			list.push(msg);
		}
		new_messages = list;
		into_api_message(old_messages, new_messages);
	};

	const into_api_message = (olist: SendMessage[], nlist: SendMessage[]) => {
		let tmp: Set<ApiMessage> = new Set();
		for (let i = 0; i < olist.length; i++) {
			let api = new ApiMessage();
			api.edition0 = olist[i].edition;
			api.name = olist[i].invoke;
			api.sendto0 = olist[i].sendto;
			api.send_p0 = olist[i].send_parms;
			api.set_hdr(api.send_p0[1]);
			api.received0 = olist[i].received;
			api.received_p0 = olist[i].received_params;
			if (nlist.length !== 0 && nlist.length <= olist.length) {
				api.edition1 = nlist[i] === undefined ? '' : nlist[i].edition;
				api.sendto1 = nlist[i] === undefined ? '' : nlist[i].sendto;
				api.send_p1 = nlist[i] === undefined ? [] : nlist[i].send_parms;
				api.received1 = nlist[i] === undefined ? '' : nlist[i].received;
				api.received_p1 = nlist[i] === undefined ? [] : nlist[i].received_params;
			}
			tmp.add(api);
		}
		// let set = new Set(tmp);
		api_messages = [...tmp];
		// console.log(api_messages);
	};
</script>

<div class="flex flex-row justify-stretch sticky top-5 z-10">
	<Textarea
		id="textarea-id"
		class="flex-1 pl-5 pr-5 bg-slate-100"
		placeholder="old message"
		rows="10"
		on:change={handleChangeOld}
	/>
	<Textarea
		id="textarea-id"
		class="flex-1 pl-5 pr-5"
		placeholder="new message"
		rows="10"
		on:change={handleChangeNew}
	/>
</div>
<MessageAccordion api_list={api_messages} />
