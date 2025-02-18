import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
})

const customRules = {
	'react/no-unescaped-entities': 'off',
	'@typescript-eslint/no-unused-vars': 'off',
	'@typescript-eslint/no-explicit-any': 'off',
	'@typescript-eslint/no-empty-object-type': 'off',
	'react-hooks/exhaustive-deps': 'off',
}

const eslintConfig = [
	...compat.extends('next/core-web-vitals', 'next/typescript'),
	{
		rules: customRules,
	},
]

export default eslintConfig
