import type { ParamMatcher } from '@sveltejs/kit'

export const match: ParamMatcher = (param) => /^location$/.test(param)
