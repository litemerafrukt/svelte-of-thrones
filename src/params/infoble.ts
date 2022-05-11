import type { ParamMatcher } from '@sveltejs/kit'

export type Infoble = 'kingdom' | 'location'

export const match: ParamMatcher = (param) => /^kingdom|location$/.test(param)
