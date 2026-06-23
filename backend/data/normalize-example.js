function normalizeDuplicatiBackup(backup, serverId = 1) {
  const metadata = backup.Metadata || {};

  let status = "OK";

  if ((metadata.Errors || 0) > 0) {
    status = "ERROR";
  } else if ((metadata.Warnings || 0) > 0) {
    status = "WARNING";
  }

  return {
    id: backup.ID,
    serverId,
    name: backup.Name,
    schedule: backup.Schedule?.Repeat || "Non schedulato",
    lastRunDate: metadata.LastBackupDate,
    lastFinishDate: metadata.LastBackupFinished,
    status,
    warnings: metadata.Warnings || 0,
    errors: metadata.Errors || 0,
    lastMessage: metadata.LastErrorMessage || "Backup completato correttamente"
  };
}

module.exports = { normalizeDuplicatiBackup };
