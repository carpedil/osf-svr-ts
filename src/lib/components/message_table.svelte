<script lang="ts">
	import type { ApiMessage } from '$lib/models';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	export let api_list: ApiMessage[];
</script>

<Table>
	<TableHead>
		<TableHeadCell>N0.</TableHeadCell>
		<TableHeadCell>NAME</TableHeadCell>
		<TableHeadCell>HDR</TableHeadCell>
		<TableHeadCell>COMMENT0</TableHeadCell>
		<TableHeadCell>COMMENT1</TableHeadCell>
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		{#each api_list as item, index}
			<TableBodyRow>
				<TableBodyCell>{index + 1}</TableBodyCell>
				<TableBodyCell>{item.name}</TableBodyCell>
				<TableBodyCell>{item.hdr}</TableBodyCell>
				<TableBodyCell>{item.comment0}</TableBodyCell>
				<TableBodyCell>{item.comment1}</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
