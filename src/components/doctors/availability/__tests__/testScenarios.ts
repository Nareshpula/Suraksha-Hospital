// Test scenarios for doctor availability and announcements
export const testScenarios = [
  {
    name: "Set doctor as unavailable today",
    exception: {
      date: new Date().toISOString().split('T')[0],
      reason: "Out for medical conference",
      type: "unavailable" as const
    },
    expectedAnnouncement: "Dr. N.SWAPNA is Out for medical conference"
  },
  {
    name: "Set custom hours for tomorrow",
    exception: {
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      reason: "Limited availability",
      type: "custom" as const,
      slots: [{ startTime: '14:00', endTime: '17:00' }]
    },
    expectedAnnouncement: "Dr. N.SWAPNA is Limited availability"
  },
  {
    name: "Set doctor as unavailable next week",
    exception: {
      date: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      reason: "Annual leave",
      type: "unavailable" as const
    },
    expectedAnnouncement: "Dr. N.SWAPNA is Annual leave"
  }
];