<script lang="ts">
	import { Heading, Input, Label, NumberInput, Button, Select, Alert } from 'flowbite-svelte';
	import countryFlagEmoji from 'country-flag-emoji';
	import { Position, type Player, League } from '../../utils/domain-models';
	import { postPlayers } from '../../utils/api';

	const positionItems = [
		{
			value: Position.Goalkeeper,
			name: Position.Goalkeeper
		},
		{
			value: Position.Defender,
			name: Position.Defender
		},
		{
			value: Position.Midfielder,
			name: Position.Midfielder
		},
		{
			value: Position.Forward,
			name: Position.Forward
		},
		{
			value: Position.Squad,
			name: Position.Squad
		}
	];
	const leaugeItems = [
		{
			value: League.PremierLeague,
			name: League.PremierLeague
		},
		{
			value: League.SerieA,
			name: League.SerieA
		}
	];
	const emojiItems = countryFlagEmoji.list.map((emojiData: any) => ({
		name: `${emojiData.emoji} ${emojiData.name}`,
		value: emojiData.code
	}));

	let name: string;
	let number: number;
	let position: Position;
	let league: League;
	let countryUniCode: string;
	let statusMessage: 'success' | 'error' | 'hide' = 'hide';

	const handleSubmit = async () => {
		const newPlayer: Player = {
			name,
			number,
			position,
			league,
			countryUnicode: countryUniCode
		};
		const response = await postPlayers(newPlayer);
		if ('error' in response) {
			console.error('Error', response.error);
			statusMessage = 'error';
		} else {
			statusMessage = 'success';
		}
	};
</script>

<svelte:head>
	<title>Add Player</title>
	<meta name="description" content="Add player" />
</svelte:head>

<div>
	<Heading>Add Player</Heading>
	<form on:submit={handleSubmit}>
		<div>
			<Label for="name" class="mb-2" style="align-self: flex-start">Name</Label>
			<Input type="text" id="name" bind:value={name} required />
		</div>
		<div>
			<Label for="number" class="mb-2" style="align-self: flex-start">Number</Label>
			<NumberInput type="text" id="number" bind:value={number} required />
		</div>
		<div>
			<Label for="position" class="mb-2" style="align-self: flex-start">Position</Label>
			<Select
				id="position"
				class="select"
				items={positionItems}
				bind:value={position}
				size="lg"
				style="maxWidth: 350px"
			/>
		</div>
		<div>
			<Label for="league" class="mb-2" style="align-self: flex-start">League</Label>
			<Select
				id="league"
				class="select"
				items={leaugeItems}
				bind:value={league}
				size="lg"
				style="maxWidth: 350px"
			/>
		</div>
		<div>
			<Label for="country" class="mb-2" style="align-self: flex-start">Country</Label>
			<Select
				id="country"
				class="select"
				items={emojiItems}
				bind:value={countryUniCode}
				size="lg"
				style="maxWidth: 350px"
			/>
		</div>
		<Button type="submit" style="width: 150px">Submit</Button>
	</form>
	<div class="alert">
		{#if statusMessage === 'error'}
			<Alert>
				<span class="font-medium">Error</span>
				Something went wrong when adding player to database
			</Alert>
		{:else if statusMessage === 'success'}
			<Alert color="green">
				<span class="font-medium">Success</span>
				Player added to the database
			</Alert>
		{/if}
	</div>
</div>

<style>
	div {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	form {
		width: 500px;
		display: flex;
		flex-direction: column;
		gap: 25px;
		margin-top: 50px;
		text-align: left;
	}

	.alert {
		margin: 20px;
		max-width: 500px;
	}
</style>
