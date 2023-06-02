<script lang="ts">
	import { Activity, ActivityItem } from 'flowbite-svelte';
	export let sendto;
	export let send_p: string[];
	export let received;
	export let received_p: string[];
	let activities = [
		{
			title: sendto ? sendto : 'no data yet',
			date: '',
			alt: '',
			src: '/logo.svg'
		},
		{
			title: received ? received : 'no data yet',
			date: '',
			alt: '',
			src: '/logo.svg',
			text: ''
		}
	];
</script>

<Activity>
	<ActivityItem {activities} />
</Activity>

<div class="flex justify-around">
	<div class="flex-1 flex-row h-96 overflow-y-auto">
		<div class="list-decimal">
			{#each send_p as param}
				<li class="px-2 py-1.5 border-t-cyan-300">{param}</li>
			{/each}
		</div>
	</div>

	<div class="flex-1 flex-row h-96 overflow-y-auto">
		<div class="list-decimal">
			{#each received_p as param}
				<li class="pl-5 px-2 py-1.5 border-t-cyan-300">{param}</li>
			{/each}
		</div>
	</div>
</div>
