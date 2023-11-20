<script lang="ts">
    import {Button, P} from 'flowbite-svelte';

    export let answer: string;
    export let title: string;
    export let revealed: boolean = false;

    const handleReveal = () => {
        revealed = true;
    };
</script>

<div>
    <P size="lg">
        {title}:
        {#if revealed}
            {answer}
        {:else}
            <Button on:click={handleReveal}>???</Button>
        {/if}
    </P>
</div>

<style>
    div {
        margin: 15px 0;
    }
</style>