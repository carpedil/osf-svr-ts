<script lang="ts">
	import MessageAccordion from '$lib/components/message_accordion.svelte';
	import MessageWrapper from '$lib/components/message_wrapper.svelte';
	import { onMount } from 'svelte';
	export let data: any;
	onMount(() => {
		console.log(data);
	});
	$: api_list = data.navFunc?.messages;
	$: curr_func = data.navFunc?.name;
</script>

<MessageWrapper />

{#if api_list !== undefined && api_list.length !== 0}
	<div class="flex flex-col justify-center">
		<MessageAccordion {api_list} enable={false} />
	</div>
{/if}
