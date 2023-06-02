<script lang="ts">
	import { Button, Modal, Select, Label, FloatingLabelInput } from 'flowbite-svelte';
	import type { ApiMessage } from '$lib/models';
	import { onMount } from 'svelte';
	import MessageTable from './message_table.svelte';
	import type { PageData } from '../../routes/$types';
	// export let data:PageData;

	export let api_list: ApiMessage[];
	export let enable: boolean;
	let defaultModal = false;
	let funcs: { name: string }[] = [];
	let funcname: string = '';
	let scenario_text: string = '';

	onMount(async () => {
		let response = await fetch('/', {
			method: 'GET'
		});

		funcs = await response.json();
	});

	const save = async () => {
		api_list.forEach((item, index) => {
			item.func = funcname;
			item.scenario = scenario_text;
			item.scenario_no = index + 1;
		});
		// console.log(data,funcname,scenario_text)
		let response = await fetch('/', {
			method: 'POST',
			body: JSON.stringify(api_list)
		});

		const res = await response.json();
		location.reload();
		alert(res.message);
	};
</script>

{#if enable}
	<Button on:click={() => (defaultModal = true)} size="lg" color="blue">Save</Button>
{/if}
<Modal id="default-modal" title="Save for ?" bind:open={defaultModal} autoclose size="xl">
	<MessageTable {api_list} />
	<div class="flex flex-col w-auto">
		<Label for="funclist"><p class="text-xl dark:text-white">Function Name:</p></Label>
		<Select
			id="funclist"
			size="sm"
			class="mt-2 text-2xl dark:text-white"
			bind:value={funcname}
			placeholder="select a function name... "
		>
			{#each funcs as { name }}
				<option value={name} selected>{name}</option>
			{/each}
		</Select>
	</div>
	<div class="flex flex-col w-auto">
		<Label for="scenario-desc"><p class="text-xl dark:text-white">Scenario Desc:</p></Label>
		<FloatingLabelInput
			size="small"
			style="filled"
			id="scenario-desc"
			name="default_filled"
			bind:value={scenario_text}
			type="text"
			label="Default filled"
		/>
	</div>

	<svelte:fragment slot="footer">
		<Button on:click={save}>Save</Button>
		<Button color="alternative">Cancel</Button>
	</svelte:fragment>
</Modal>
