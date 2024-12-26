# Test Steps for Doctor Availability and Announcements

## Test Scenario 1: Set Doctor as Unavailable Today
1. Navigate to the Doctors page
2. Click "Manage" on Dr. N.SWAPNA's card
3. In the Exceptions section:
   - Select today's date
   - Select "Unavailable" type
   - Enter reason: "Out for medical conference"
   - Click "Add Exception"
4. Click "Save Changes"
5. Verify:
   - Announcement banner shows "Dr. N.SWAPNA is Out for medical conference"
   - No appointment slots available for today
   - Cannot book appointments for today

## Test Scenario 2: Set Custom Hours for Tomorrow
1. Navigate to the Doctors page
2. Click "Manage" on Dr. N.SWAPNA's card
3. In the Exceptions section:
   - Select tomorrow's date
   - Select "Custom Hours" type
   - Enter reason: "Limited availability"
   - Set time: 14:00 to 17:00
   - Click "Add Exception"
4. Click "Save Changes"
5. Verify:
   - Announcement banner shows "Dr. N.SWAPNA is Limited availability"
   - Only slots between 14:00-17:00 are available tomorrow
   - Can book appointments during custom hours

## Test Scenario 3: Set Doctor as Unavailable Next Week
1. Navigate to the Doctors page
2. Click "Manage" on Dr. N.SWAPNA's card
3. In the Exceptions section:
   - Select a date next week
   - Select "Unavailable" type
   - Enter reason: "Annual leave"
   - Click "Add Exception"
4. Click "Save Changes"
5. Verify:
   - No announcement shown (not current date)
   - Cannot book appointments for that date
   - Exception appears in doctor's schedule

## Additional Verification Points
- Announcements update in real-time
- Multiple announcements rotate every 5 seconds
- Expired announcements are removed automatically
- Cannot book appointments during unavailable times
- Weekly schedule remains unchanged
- Exception dates are clearly marked in booking calendar