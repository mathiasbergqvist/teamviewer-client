<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/main-logo.jpeg';
</script>

<header>
	<div class="logo-container">
		<img alt="Team Viewer main logo" src={logo} width="180" height="180" />
		<p class="logo-text">Team Viewer</p>
	</div>
	<div class="nav-container">
		<div class="corner"></div>
		<nav>
			<svg viewBox="0 0 2 3" aria-hidden="true">
				<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
			</svg>
			<ul>
				<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
					<a href="/">Team viewer</a>
				</li>
				<li aria-current={$page.url.pathname.startsWith('/add-player') ? 'page' : undefined}>
					<a href="/add-player">Add Player</a>
				</li>
				<li aria-current={$page.url.pathname.startsWith('/edit-player') ? 'page' : undefined}>
					<a href="/edit-player">Edit Player</a>
				</li>
				<li aria-current={$page.url.pathname.startsWith('/add-team') ? 'page' : undefined}>
					<a href="/add-team">Add Team</a>
				</li>
				<li aria-current={$page.url.pathname.startsWith('/edit-team') ? 'page' : undefined}>
					<a href="/edit-team">Edit Team</a>
				</li>
			</ul>
			<svg viewBox="0 0 2 3" aria-hidden="true">
				<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
			</svg>
		</nav>
		<div class="corner"></div>
	</div>
</header>

<style>
	header {
		display: flex;
		flex-direction: column;
	}

	.logo-container {
		display: flex;
		align-items: center;
		width: 100%;
		height: 200px;
		gap: 50px;
		background: var(--color-theme-1);
		justify-content: center;
	}

	.logo-text {
		font-family: var(--font-montserrat);
		color: var(--color-bg-1);
		text-shadow: black 1px 0 10px;
		font-size: 2.5rem;
		font-weight: bold;
	}

	.nav-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>
