<script lang="ts">
	import {
		Alert,
		Heading,
		Label,
		Spinner,
		Input,
		NumberInput,
		Select,
		Button
	} from 'flowbite-svelte';
	import type { Position, Player } from '../../utils/domain-models';
	import PlayerModal from '../../components/PlayerModal.svelte';
	import positionItems from '../../data/positionItems';
	import emojiItems from '../../data/emojiItems';
	import { updatePlayer } from '../../utils/api';
	import StatusMessage from '../../components/StatusMessage.svelte';

	export let data: { players: Array<Player> };

	let playerToEdit: Player | null = null;
	let editedName: string = '';
	let editedNumber: number | null = null;
	let editedPosition: Position | null = null;
	let editedCountry: string = '';
	let statusMessage: 'success' | 'error' | 'hide' = 'hide';

	const handleSelectedPlayer = (player: Player) => {
		playerToEdit = player;
	};

	const handleEditName = (e) => {
		editedName = e.target.value;
	};

	const handleEditNumber = (e) => {
		editedNumber = e.target.value;
	};

	const handleEditPosition = (e) => {
		editedPosition = e.target.value;
	};

	const handleEditCountry = (e) => {
		editedCountry = e.target.value;
	};

	const handleSubmit = async () => {
		if (playerToEdit) {
			const editedPlayer: Player = {
				_id: playerToEdit?._id,
				name: editedName !== '' ? editedName : playerToEdit?.name,
				number: editedNumber !== null ? editedNumber : playerToEdit.number,
				position: editedPosition !== null ? editedPosition : playerToEdit.position,
				countryUnicode: editedCountry !== '' ? editedCountry : playerToEdit.countryUnicode
			};

			const response = await updatePlayer(editedPlayer);

			if ('error' in response) {
				statusMessage = 'error';
			} else {
				statusMessage = 'success';
			}
		}
	};
</script>

<svelte:head>
	<title>Edit player</title>
	<meta name="description" content="Edit player" />
</svelte:head>

<div>
	{#await data}
		<Spinner />
	{:then}
		<Heading>Edit Player</Heading>
		{#if playerToEdit !== null}
			<form on:submit={handleSubmit}>
				<div>
					<Label for="name" class="mb-2" style="align-self: flex-start">Name</Label>
					<Input
						type="text"
						id="name"
						value={playerToEdit.name}
						on:change={handleEditName}
						required
					/>
				</div>
				<div>
					<Label for="number" class="mb-2" style="align-self: flex-start">Number</Label>
					<NumberInput
						type="text"
						id="number"
						value={playerToEdit.number}
						on:change={handleEditNumber}
						required
					/>
				</div>
				<div>
					<Label for="position" class="mb-2" style="align-self: flex-start">Position</Label>
					<Select
						id="position"
						class="select"
						on:change={handleEditPosition}
						items={positionItems}
						value={playerToEdit.position}
						size="lg"
						style="maxWidth: 350px"
					/>
				</div>
				<div>
					<Label for="country" class="mb-2" style="align-self: flex-start">Country</Label>
					<Select
						id="country"
						class="select"
						on:change={handleEditCountry}
						value={playerToEdit.countryUnicode}
						items={emojiItems}
						size="lg"
						style="maxWidth: 350px"
					/>
				</div>
				<Button type="submit" style="width: 150px">Submit</Button>
			</form>
		{:else}
			<PlayerModal
				players={data.players}
				{handleSelectedPlayer}
				header="Select Player"
				buttonText="Edit"
			></PlayerModal>
		{/if}
		<StatusMessage {statusMessage} successMessage="Successfully updated player." />
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
