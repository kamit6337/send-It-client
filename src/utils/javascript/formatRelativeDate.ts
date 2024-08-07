function formatRelativeDate(dateString: string) {
  const postDate = new Date(dateString).getTime();
  const currentDate = new Date().getTime();

  // Calculate the difference in milliseconds
  const differenceMs = currentDate - postDate;

  // Convert difference to minutes, hours, and days
  const minutes = Math.floor(differenceMs / (1000 * 60));
  const hours = Math.floor(differenceMs / (1000 * 60 * 60));

  // Determine the appropriate format based on the difference
  if (minutes < 2) {
    return "Just now";
  } else if (minutes < 60) {
    return `${minutes} min`;
  } else if (hours < 12) {
    return `${hours}h`;
  } else if (hours < 24 * 2) {
    return "Yesterday";
  } else if (hours < 24 * 7) {
    return `${Math.floor(hours / 24)}d`;
  } else {
    // Format the date in a specific way (e.g., "3 Aug")
    return new Date(postDate).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
  }
}

export default formatRelativeDate;
