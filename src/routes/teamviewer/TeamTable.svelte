<script lang="ts">
	import type { Player } from '../../utils/domain-models';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Button
	} from 'flowbite-svelte';
	import { QuestionCircleSolid } from 'flowbite-svelte-icons';

	export let players: Array<Player>;

	let revealed: Array<string> = [];

	$: isRevealed = (id: string) => revealed.includes(id);

	const handleReveal = (id: string) => {
		revealed = [...revealed, id];
	};
</script>

<Table striped={true}>
	<TableHead>
		<TableHeadCell>Number</TableHeadCell>
		<TableHeadCell>Country</TableHeadCell>
		<TableHeadCell>Position</TableHeadCell>
		<TableHeadCell>Name</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each players as { number, countryUnitcode, position, name, _id }}
			<TableBodyRow class="!h-12">
				<TableBodyCell>{number}</TableBodyCell>
				<TableBodyCell>&#{countryUnitcode};</TableBodyCell>
				<TableBodyCell>{position}</TableBodyCell>
				<TableBodyCell>
					{#if isRevealed(_id)}
						<p class="name">{name}</p>
					{:else}
						<Button on:click={() => handleReveal(_id)}>
							<QuestionCircleSolid class="w-4 h-4 mr-2" /> Reveal
						</Button>
					{/if}
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>

<style>
	.name {
		font-weight: bold;
		line-height: 40px;
	}
</style>
