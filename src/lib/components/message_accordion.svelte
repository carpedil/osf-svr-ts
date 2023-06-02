<script lang="ts">
	import { AccordionItem, Accordion, Badge, FloatingLabelInput } from 'flowbite-svelte';
	import Event from '$lib/components/message_event.svelte';
	import MessageModal from '$lib/components/message_modal.svelte';
	import type { ApiMessage } from '$lib/models';

	export let api_list: ApiMessage[];
	export let enable: boolean = true;
</script>

<div class="flex flex-col break-all">
	{#if api_list.length !== 0}
		{#each api_list as api, index}
			<Accordion class="flex-1 ">
				<AccordionItem transitionType="fade" transitionParams={{ duration: 200 }}>
					<span slot="header" class="w-full">
						<Badge color="purple" border class="mr-1.5 mb-5"
							>{api.scenario_no < 0 ? index + 1 : api.scenario_no}</Badge
						>
						<span class="text-black-600"> /{api.name}</span>
						<span class="text-orange-500"> {api.send_p0[1]}</span>
						<span class="text-purple-500"> {api.comment0}</span>
						<span class="text-blue-500 float-right mr-10"> {api.scenario}</span>
					</span>
					<div class="flex flex-row">
						{#if api.edition0 !== ''}
							<div class="flex-1 p-5 text-2xl">
								<Badge color="red" border class="mr-1.5 mb-5">@{api.edition0} | {api.hdr}</Badge>
								<Event
									sendto={api.sendto0}
									received={api.received0}
									send_p={api.send_p0}
									received_p={api.received_p0}
								/>
								<FloatingLabelInput
									color="red"
									style="standard"
									id="floating_helper"
									aria-describedby="floating_helper_text"
									name="floating_helper"
									bind:value={api.comment0}
									type="text"
									label="any comments ?"
								/>
							</div>
						{/if}
						{#if api.edition1 !== ''}
							<div class="flex-1 p-5 text-2xl">
								<Badge color="blue" border class="mr-1.5 mb-5">@{api.edition1} | {api.hdr}</Badge>
								<Event
									sendto={api.sendto1}
									received={api.received1}
									send_p={api.send_p1}
									received_p={api.received_p1}
								/>
								<FloatingLabelInput
									color="red"
									style="standard"
									id="floating_helper"
									aria-describedby="floating_helper_text"
									name="floating_helper"
									bind:value={api.comment1}
									type="text"
									label="any comments ?"
								/>
							</div>
						{/if}
					</div>
				</AccordionItem>
			</Accordion>
		{/each}
		<MessageModal {api_list} {enable} />
	{:else}
		<div class="flex-1 pl-5">No data...</div>
	{/if}
</div>
