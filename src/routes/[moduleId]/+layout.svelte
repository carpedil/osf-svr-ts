<script>
	export let data;
</script>

<div
	class="flex justify-evenly h-screen border border-slate-200 hover:border-indigo-300 pl-2 pr-2 pt-5"
>
	<ul class="min-w-[15%] border-r border-slate-200 hover:border-indigo-300">
		{#each data.functions as func}
			<li><a href={func.path}>{func.name}</a></li>
		{/each}
	</ul>
	<div class="min-w-[85%] flex align-center flex-col overflow-y-auto scroll-smooth">
		<slot />
	</div>
</div>
