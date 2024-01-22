<script lang="ts">
	import PlayerTable from '../../components/PlayerTable.svelte';
	import type { Player, Team } from '../../utils/domain-models';
	import { Heading, Select, Label, Spinner, Alert, Input, Button } from 'flowbite-svelte';

	export let data: { teams: Array<Team> };
	let selectedTeamId: string = '';

	$: teamOptions = data.teams.map((team: Team) => ({
		value: team._id,
		name: team.name
	}));
	$: selectedTeam = data.teams.find((team: Team) => team._id === selectedTeamId);

	let removedPlayerIds: Array<string> = [];
	let stadium: string = '';
	let manager: string = '';

	const handleRemovePlayer = (player: Player) => {
		if (player._id) {
			removedPlayerIds = [...removedPlayerIds, player._id];
		}
	};

	const handleSubmit = () => {
		console.log('selectedTeam', selectedTeam);
		console.log('name', name);
	};
</script>

<svelte:head>
	<title>Edit team</title>
	<meta name="description" content="Team viewer" />
</svelte:head>

<div>
	{#await data}
		<Spinner />
	{:then}
		<Heading>Edit Team</Heading>
		<div class="select-container">
			<Label>
				Choose a team
				<Select
					class="select"
					items={teamOptions}
					bind:value={selectedTeamId}
					size="lg"
					style="width: 350px"
				/>
			</Label>
		</div>
		{#if selectedTeam}
			<form on:submit={handleSubmit}>
				<Heading tag="h2">{selectedTeam.name}</Heading>
				<div class="inputs">
					<div>
						<Label for="staduim" class="mb-2" style="align-self: flex-start">Stadium</Label>
						<Input
							type="text"
							id="stadium"
							bind:value={stadium}
							required
							placeholder={selectedTeam.stadium}
						/>
					</div>
					<div>
						<Label for="staduim" class="mb-2" style="align-self: flex-start">Manager</Label>
						<Input
							type="text"
							id="stadium"
							bind:value={manager}
							required
							placeholder={selectedTeam.manager}
						/>
					</div>
				</div>
				<PlayerTable players={selectedTeam.players} {handleRemovePlayer} {removedPlayerIds} />
				<Button type="submit" style="margin: 15px 0">Save Team</Button>
			</form>
		{/if}
	{:catch}
		<Alert>
			<span class="font-medium">Error</span>
			Change a few things up and try submitting again.
		</Alert>
	{/await}
</div>

<style>
	div {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	form {
		margin-top: 25px;
	}
	.inputs {
		margin-top: 25px;
	}
	.select-container {
		margin-top: 25px;
	}
</style>
