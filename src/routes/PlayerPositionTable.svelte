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
	import { QuestionCircleSolid, RedoOutline } from 'flowbite-svelte-icons';
	import countryFlagEmoji from 'country-flag-emoji';
	import { pascalCaseToWords } from '../utils/string.helpers';

	export let heading: string;
	export let players: Array<Player>;
	export let allIsRevealed: boolean = false;

	$: revealed = allIsRevealed ? players.map((player) => player._id) : [];
	$: isRevealed = (id: string) => revealed.includes(id);

	const handleReveal = (id: string) => {
		revealed = [...revealed, id];
	};

	const handleRetry = (retryId: string) => {
		const filteredArray = revealed.filter((id) => id !== retryId);
		revealed = filteredArray;
	};
</script>

<Table striped={true}>
	<caption class="p-5 text-lg font-semibold text-left text-gray-900" style="padding: 25px 0 0 0"
		>{heading}</caption
	>
	<TableHead>
		<TableHeadCell>Number</TableHeadCell>
		<TableHeadCell>Country</TableHeadCell>
		<TableHeadCell>Position</TableHeadCell>
		<TableHeadCell>Name</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each players as { number, countryUnicode, position, name, _id }}
			<TableBodyRow class="!h-12">
				<TableBodyCell class="!p-4">{number}</TableBodyCell>
				{#if countryUnicode !== undefined}
					<TableBodyCell class="!p-4">{countryFlagEmoji.get(countryUnicode)?.emoji}</TableBodyCell>
				{/if}
				<TableBodyCell class="!p-4">{pascalCaseToWords(position)}</TableBodyCell>
				<TableBodyCell style="width: 400px">
					<div class="reveal-container">
						{#if isRevealed(_id)}
							<p class="name">{name}</p>
							<Button on:click={() => handleRetry(_id)}>
								<RedoOutline class="w-4 h-4 mr-2" /> Retry
							</Button>
						{:else}
							<Button on:click={() => handleReveal(_id)}>
								<QuestionCircleSolid class="w-4 h-4 mr-2" /> Reveal
							</Button>
						{/if}
					</div>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>

<style>
	.cell {
		width: 500px;
	}
	.reveal-container {
		display: flex;
		gap: 10px;
		/* width: 250px; */
	}
	.name {
		font-weight: bold;
		line-height: 40px;
	}
</style>
