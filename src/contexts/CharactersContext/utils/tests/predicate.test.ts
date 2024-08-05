import { describe, expect, it } from 'vitest'
import { isNotEmptyArray, isNotEmptyObject, isNotEmptySet } from '../predicates'

describe('predicates', () => {
	describe('isNotEmptyArray', () => {
		it('isNotEmptyArray', () => {
			expect(isNotEmptyArray([])).toBe(false)
		})
		it('isNotEmptyArray', () => {
			expect(isNotEmptyArray([1, 2, 3])).toBe(true)
		})
	})

	describe('isNotEmptyObject', () => {
		it('isNotEmptyObject', () => {
			expect(isNotEmptyObject({})).toBe(false)
		})
		it('isNotEmptyObject', () => {
			expect(isNotEmptyObject({ a: 1, b: 2 })).toBe(true)
		})
	})

	describe('isNotEmptySet', () => {
		it('isNotEmptySet', () => {
			expect(isNotEmptySet(new Set())).toBe(false)
		})
		it('isNotEmptySet', () => {
			expect(isNotEmptySet(new Set([1, 2, 3]))).toBe(true)
		})
	})
})
