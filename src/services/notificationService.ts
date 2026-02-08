export function scheduleMonthlyReminder(lastPeriodStartISO: string) {
  // Mocked notification scheduling.
  // In a real app, integrate a local notifications library here.
  // Example: Notifications.scheduleNotificationAsync({ trigger: { date }, content: { ... } })
  console.log(`[HeyLucy] Scheduled reminder based on last period date: ${lastPeriodStartISO}`);
}
