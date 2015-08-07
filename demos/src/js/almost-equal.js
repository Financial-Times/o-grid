// https://github.com/scijs/almost-equal

const abs = Math.abs;
const min = Math.min;

export default function almostEqual(a, b, absoluteError, relativeError) {
	const d = abs(a - b);

	if (d <= absoluteError) {
		return true;
	}
	if (d <= relativeError * min(abs(a), abs(b))) {
		return true;
	}
	return a === b;
}
