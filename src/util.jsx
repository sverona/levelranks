
export function passed(song) {
	const { perfect, good, average, miss } = song.scores
	const totalNotes = perfect + good + average + miss
	return totalNotes === song.info.notes
}

export function rawGoods(song) {
	if (!passed(song)) {
		return Infinity;
	}
	return 2 * song.info.notes - song.scores.raw_score / 25
}

export function isAAA(song) {
	return rawGoods(song) === 0
}

export function isUnplayed(song) {
	return song.scores.played === 0
}

export function isBlackFlag(song) {
	return (rawGoods(song) === 1.0) && (song.scores.good === 1)
}

export function isSingleDigitGood(song) {
	return rawGoods(song) < 10
}

export function isFullCombo(song) {
	return song.scores.combo === song.info.notes
}

export function rank(song) {
    return isAAA(song) ? 1 : song.scores.rank
}

export const allFilters = {
	'aaa': {
		filter: (song) => rawGoods(song) === 0,
		name: 'AAAs',
	},
	'unplayed': {
		filter: (song) => song.scores.played === 0,
		name: 'Unplayed',
	},
	'eventToken': {
		filter: (song) => [2699, 2700, 2701, 2706, 3408, 3411, 3346, 3449, 3450, 3409, 3410, 3667, 3679, 3691, 3704, 3716].includes(song.info.level),
		name: 'Event Tokens',
	},
	'achievementToken': {
		filter: (song) => song.info.genre === 10,
		name: 'Achievement Tokens',
	},
	'skillToken': {
		filter: (song) => song.info.genre === 12,
		name: 'Skill Tokens',
	}
};

export const allAxes = {
	'id': {
		key: (song) => song.info.level,
		name: 'Song ID',
	},
	'rank': {
		key: (song) => rank(song),
		name: 'Rank',
	},
	'difficulty': {
		key: (song) => song.info.difficulty,
		name: 'Difficulty',
	},
	'scoreDate': {
		key: (song) => song.scores.timestamp,
		name: 'Score date',
	},
};

export const allFlags = [
	{
		condition: isAAA,
		name: "AAA",
		background: "yellow",
	},
	{
		condition: isBlackFlag,
		name: "BF",
		background: "black",
		color: "white",
	},
	{
		condition: isSingleDigitGood,
		name: "SDG",
		background: "orange",
	},
	{
		condition: isFullCombo,
		name: "FC",
		background: "limegreen",
	}
];

export const allColumns = [
	{
		label: '#',
		accessor: song => rank(song),
	},
	{
		label: 'D',
		accessor: song => song.info.difficulty,
		key: song => (song.info.difficulty === 0 ? Infinity : song.info.difficulty),
	},
	{
		label: 'Title',
		accessor: song => (<a href={`https://www.flashflashrevolution.com/levelstats.php?level=${song.info.level}`}>{song.info.name}</a>),
		key: song => song.info.name,
	},
	{
		label: 'Raw',
		accessor: song => song.scores.raw_score,
		needsPlayed: true,
	},
	{
		label: 'Score',
		accessor: song => song.scores.score,
		needsPlayed: true,
	},
	{
		label: 'P',
		accessor: song => song.scores.perfect,
		needsPlayed: true,
	},
	{
		label: 'G',
		accessor: song => song.scores.good,
		needsPlayed: true,
	},
	{
		label: 'A',
		accessor: song => song.scores.average,
		needsPlayed: true,
	},
	{
		label: 'M',
		accessor: song => song.scores.miss,
		needsPlayed: true,
	},
	{
		label: 'B',
		accessor: song => song.scores.boo,
		needsPlayed: true,
	},
	{
		label: 'C',
		accessor: song => song.scores.combo,
		needsPlayed: true,
	},
	{
		label: 'RG',
		accessor: song => (passed(song) ? rawGoods(song).toFixed(1) : "∞"),
		key: rawGoods,
		needsPlayed: true,
	},
	{
		label: 'Plays',
		accessor: song => song.scores.played,
		needsPlayed: true,
	},
	{
		label: 'Date',
		accessor: song => new Date((song.scores.timestamp || 0) * 1000).toLocaleDateString(),
		key: song => song.scores.timestamp,
		needsPlayed: true,
	}
]
