export const normalizeCart = (data) => {
	if (!data) return { id: null, items: [] };

	return {
		id: data.id || null,
		items: data.items || [],
	};
};
