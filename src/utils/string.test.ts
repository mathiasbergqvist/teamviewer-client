import { pascalCaseToWords } from './string.helpers';

describe('string.helpers', () => {
	describe('pascalCaseToWords()', () => {
		it('should convert pascal case to words', () => {
			const input = 'FooBar';
			const expected = 'Foo Bar';
			const actual = pascalCaseToWords(input);
			expect(actual).toBe(expected);
		});
	});
});
