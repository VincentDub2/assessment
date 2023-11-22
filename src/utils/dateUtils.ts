
// Function to format the date string into a readable format
function formatDate(isoString : string | undefined) {
    if (!isoString) return "No date";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

export { formatDate };