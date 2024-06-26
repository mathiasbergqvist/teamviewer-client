<script lang="ts">
	import { Heading, Input, Label, Button, Select, Toast } from 'flowbite-svelte';
	import { League, type Player, type Team } from '../../utils/domain-models';
	import PlayerModal from '../../components/PlayerModal.svelte';
	import PlayerTable from '../../components/PlayerTable.svelte';
	import { postTeams } from '../../utils/api';
	import StatusMessage from '../../components/StatusMessage.svelte';
	import { CheckCircleSolid } from 'flowbite-svelte-icons';

	export let data: { players: Array<Player> };

	let name: string;
	let stadium: string;
	let manager: string;
	let league: League | undefined;
	let selectedPlayers: Array<Player> = [];
	let statusMessage: 'success' | 'error' | 'hide' | 'incomplete';
	let displayToaster: boolean = false;

	const clearForm = () => {
		name = '';
		stadium = '';
		manager = '';
		league = undefined;
		selectedPlayers = [];

		setTimeout(() => {
			statusMessage = 'hide';
		}, 2000);
	};

	const toggleToaster = () => {
		displayToaster = true;
		setTimeout(() => {
			displayToaster = false;
		}, 2000);
	};

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
			value: League.Bundesliga,
			name: League.Bundesliga
		},
		{
			value: League.Ligue1,
			name: League.Ligue1
		},
		{
			value: League.NFL,
			name: League.NFL
		}
	];

	const handleSubmit = async () => {
		if (league) {
			const newTeam: Team = {
				name,
				stadium,
				manager,
				league,
				players: selectedPlayers
			};

			const response = await postTeams(newTeam);
			if ('error' in response) {
				statusMessage = 'error';
				clearForm();
			} else {
				statusMessage = 'success';
				clearForm();
			}
		} else {
			statusMessage = 'incomplete';
		}
	};

	const handleSelectedPlayer = (selectedPlayer: Player) => {
		selectedPlayers = [...selectedPlayers, selectedPlayer];
		toggleToaster();
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
	{#if displayToaster}
		<Toast style="position: fixed; top: 10px; z-index: 100" color="green">
			<svelte:fragment slot="icon">
				<CheckCircleSolid class="w-5 h-5" />
				<span class="sr-only">Check icon</span>
			</svelte:fragment>
			Player added successfully.
		</Toast>
	{/if}
	<Heading>Add Team</Heading>
	<form on:submit={handleSubmit}>
		<div>
			<Label for="name" class="mb-2" style="align-self: flex-start">Name</Label>
			<Input type="text" id="name" bind:value={name} required />
		</div>
		<div>
			<Label for="stadium" class="mb-2" style="align-self: flex-start">Stadium</Label>
			<Input type="text" id="stadium" bind:value={stadium} required />
		</div>
		<div>
			<Label for="manager" class="mb-2" style="align-self: flex-start">Manager</Label>
			<Input type="text" id="manager" bind:value={manager} required />
		</div>
		<div>
			<Label for="position" class="mb-2" style="align-self: flex-start">League</Label>
			<Select
				id="position"
				class="select"
				items={leagueItems}
				bind:value={league}
				size="lg"
				style="maxWidth: 350px"
			/>
		</div>
		<PlayerTable players={selectedPlayers} {handleRemovePlayer} />
		<Button type="submit" style="margin: 15px 0">Save Team</Button>
	</form>
	<PlayerModal {handleSelectedPlayer} players={data.players} header="Add player" buttonText="Add" />
	<StatusMessage {statusMessage} successMessage="Team added to the database" />
</div>

<style>
	div {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	form {
		min-width: 700px;
		display: flex;
		flex-direction: column;
		gap: 25px;
	}
</style>
