# Testing Doctor Availability and Announcements

This directory contains test files and documentation for testing the doctor availability and announcements system.

## Files
- `testData.ts`: Mock data for testing
- `testScenarios.ts`: Defined test scenarios
- `testSteps.md`: Step-by-step testing instructions

## Running Tests
1. Start the development server
2. Follow test steps in `testSteps.md`
3. Verify each scenario against expected outcomes
4. Document any issues found

## Key Features to Test
- Doctor availability management
- Exception handling
- Announcement display
- Real-time updates
- Booking restrictions
- Calendar integration

## Expected Behavior
- Announcements should appear immediately after saving exceptions
- Only current/future announcements should be displayed
- Multiple announcements should rotate
- Booking should be prevented during unavailable times
- Custom hours should be respected in booking form

## Common Issues
- Database connection errors
- Real-time subscription issues
- Date/time zone mismatches
- Race conditions in updates
- UI state synchronization

## Troubleshooting
If issues occur:
1. Check browser console for errors
2. Verify database connection
3. Confirm data format in Supabase
4. Check timezone handling
5. Verify real-time subscription status