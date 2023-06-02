<script lang="ts">
	//@ts-nocheck
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, DarkMode } from 'flowbite-svelte';
	import '../app.postcss';
	export let data;
</script>

<div class="flex flex-col justify-center overflow-y-auto scroll-smooth pr-5 pl-5">
	<Navbar let:hidden let:toggle>
		<NavBrand href="/">
			<img src="/logo.svg" class="mr-3 h-6 sm:h-9" alt="OSF Logo" />
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
				{data.title}
			</span>
		</NavBrand>
		<NavHamburger on:click={toggle} />
		<NavUl {hidden} class="flex flex-col">
			<NavLi href="/" active={true}>Home</NavLi>
			{#each data.menus as menu}
				<NavLi id={menu.name} class="cursor-pointer" href={menu.path}>{menu.name}</NavLi>
			{/each}
		</NavUl>
		<DarkMode />
	</Navbar>
	<slot />
</div>
