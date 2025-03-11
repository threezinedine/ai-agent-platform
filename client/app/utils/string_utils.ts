export function formatString(
	template: string,
	params: Record<string, string>
): string {
	return template.replace(
		/\${(\w+)}/g,
		(_, key) => params[key]?.toString() || ''
	);
}
