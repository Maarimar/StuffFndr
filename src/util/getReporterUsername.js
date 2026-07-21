export function getReporterUsername(item) {
  if (!item?.reportedBy) {
    return "";
  }

  if (typeof item.reportedBy === "object" && item.reportedBy.username) {
    return item.reportedBy.username;
  }

  return item.reportedByUsername || "";
}
