<script lang="ts">
	import { Heading, Input, Label, Button, Select, Alert } from 'flowbite-svelte';
	import { League, type Player, type Team } from '../../utils/domain-models';
	import PlayerModal from './PlayerModal.svelte';
	import PlayerTable from './PlayerTable.svelte';
	import { postTeams } from '../../utils/api';

	export let data: { players: Array<Player> };

	let name: string;
	let stadium: string;
	let manager: string;
	let league: League;
	let selectedPlayers: Array<Player> = [];
	let modalOpen: boolean = false;
	let statusMessage: 'success' | 'error' | 'hide' = 'hide';

	const leagueItems = [
		{
			value: League.PremierLeague,
			name: League.PremierLeague
		},
		{
			value: League.SerieA,
			name: League.SerieA
		},
		{
			value: League.LaLiga,
			name: League.LaLiga
		},
		{
			value: League.NFL,
			name: League.NFL
		}
	];

	const handleSubmit = async () => {
		const newTeam: Team = {
			name,
			stadium,
			manager,
			league,
			playerIds: selectedPlayers
		};

		const response = await postTeams(newTeam);
		if ('error' in response) {
			console.error('Error', response.error);
			statusMessage = 'error';
		} else {
			statusMessage = 'success';
		}
	};

	const handleSelectedPlayer = (selectedPlayer: Player) => {
		selectedPlayers = [...selectedPlayers, selectedPlayer];
	};
	const handleRemovePlayer = (player: Player) => {
		selectedPlayers = selectedPlayers.filter(
			(selectedPlayer: Player) => selectedPlayer._id !== player._id
		);
	};
</script>

<svelte:head>
	<title>Add Team</title>
	<meta name="description" content="Add team" />
</svelte:head>
<div>
	<Heading>Add Team</Heading>

	<form on:submit={handleSubmit}>
		<div>
			<Label for="name" class="mb-2">Name</Label>
			<Input type="text" id="name" bind:value={name} required />
		</div>
		<div>
			<Label for="stadium" class="mb-2">Stadium</Label>
			<Input type="text" id="stadium" bind:value={stadium} required />
		</div>
		<div>
			<Label for="manager" class="mb-2">Manager</Label>
			<Input type="text" id="manager" bind:value={manager} required />
		</div>
		<div>
			<Label for="position" class="mb-2">League</Label>
			<Select
				id="position"
				class="select"
				items={leagueItems}
				bind:value={league}
				size="lg"
				style="maxWidth: 350px"
			/>
		</div>
		<Button on:click={() => (modalOpen = true)} style="margin: 15px 0">Add player</Button>
		<PlayerTable players={selectedPlayers} {handleRemovePlayer} />
		<Button type="submit" style="margin: 15px 0">Save Team</Button>
	</form>
	<PlayerModal {handleSelectedPlayer} {modalOpen} players={data.players} />
	<div class="alert">
		{#if statusMessage === 'error'}
			<Alert>
				<span class="font-medium">Error</span>
				Something went wrong when adding the team to database
			</Alert>
		{:else if statusMessage === 'success'}
			<Alert color="green">
				<span class="font-medium">Success</span>
				Team added to the database
			</Alert>
		{/if}
	</div>
</div>

<style>
	div {
		width: 100%;
	}

	form {
		max-width: 500px;
		display: flex;
		flex-direction: column;
		gap: 25px;
	}

	.alert {
		margin: 20px;
		max-width: 500px;
	}
</style>
