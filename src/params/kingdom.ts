import type { ParamMatcher } from '@sveltejs/kit'

export const match: ParamMatcher = (param) => /^kingdom$/.test(param)
