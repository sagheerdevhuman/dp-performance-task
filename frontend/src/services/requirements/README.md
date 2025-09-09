# Requirements Update Service

This document describes the requirements update functionality for events, programs, and resources in the BXDP application.

## Overview

The requirements update system allows administrators to set detailed eligibility criteria for events, programs, and resources. The system supports comprehensive demographic and qualification requirements.

## Requirements Data Structure

The requirements object contains the following data points:

### Experience Requirements
- **`past_experience`** (boolean): Whether past experience is required
- **`experience_level`** (string): Required experience level (beginner, intermediate, advanced, expert)

### Education Requirements
- **`education_level`** (string): Required education level (high_school, associates, bachelors, masters, doctorate, other)

### Income Requirements
- **`max_income_level`** (integer): Maximum income level in dollars
- **`min_income`** (integer): Minimum income in dollars

### Age Requirements
- **`max_age`** (integer): Maximum age
- **`min_age`** (integer): Minimum age

### Demographics
- **`gender`** (string): Required gender (male, female, non_binary, other, or empty for any)

### Location Requirements
- **`city`** (string): Required city
- **`zipcode`** (integer): Required zipcode
- **`radius`** (string): Search radius in miles (5, 10, 25, 50, 100)

## Files Created

### Services
- `src/services/requirements/updateRequirements.jsx` - Main service for updating requirements

### Redux Integration
- `src/redux/requirements/updateRequirementsSlice.jsx` - Redux slice for requirements updates

### Components
- `src/components/sharedComponents/EditRequirementsModal.jsx` - Modal for editing requirements
- `src/components/sharedComponents/RequirementsManagementExample.jsx` - Example usage component

## API Endpoints

### Generic Requirements Update
- **PUT** `/{entity_type}/{entity_id}/requirements`
- **Body**: 
  ```json
  {
    "requirements": {
      "past_experience": false,
      "education_level": "bachelors",
      "max_income_level": 75000,
      "min_income": 25000,
      "max_age": 65,
      "min_age": 18,
      "gender": "male",
      "experience_level": "intermediate",
      "city": "New York",
      "zipcode": 10001,
      "radius": "25"
    },
    "user_id": "user123"
  }
  ```

### Specific Entity Endpoints
- **Programs**: `PUT /programs/{program_id}/requirements`
- **Events**: `PUT /events/{event_id}/requirements`
- **Resources**: `PUT /resources/{resource_id}/requirements`

## Usage

### 1. Import the Service

```javascript
import { 
  updateProgramRequirements, 
  updateEventRequirements, 
  updateResourceRequirements, 
  updateRequirements 
} from "../../services/requirements/updateRequirements";
```

### 2. Update Program Requirements

```javascript
const requirements = {
  past_experience: true,
  education_level: "bachelors",
  max_income_level: 75000,
  min_income: 25000,
  max_age: 65,
  min_age: 18,
  gender: "male",
  experience_level: "intermediate",
  city: "New York",
  zipcode: 10001,
  radius: "25"
};

await updateProgramRequirements({
  program_id: "123",
  requirements: requirements,
  user_id: "user123"
});
```

### 3. Update Event Requirements

```javascript
await updateEventRequirements({
  event_id: "456",
  requirements: requirements,
  user_id: "user123"
});
```

### 4. Update Resource Requirements

```javascript
await updateResourceRequirements({
  resource_id: "789",
  requirements: requirements,
  user_id: "user123"
});
```

### 5. Generic Update

```javascript
await updateRequirements({
  entity_type: "programs", // or "events", "resources"
  entity_id: "123",
  requirements: requirements,
  user_id: "user123"
});
```

## Redux Integration

### State Structure

```javascript
{
  updateRequirements: {
    status: null, // "loading", "success", "failed"
    error: null,
    programRequirementsStatus: null,
    eventRequirementsStatus: null,
    resourceRequirementsStatus: null
  }
}
```

### Actions

```javascript
import { 
  changeProgramRequirements, 
  changeEventRequirements, 
  changeResourceRequirements, 
  changeRequirements,
  clearRequirementsStatus 
} from "../../redux/requirements/updateRequirementsSlice";

// Dispatch actions
dispatch(changeProgramRequirements({
  program_id: "123",
  requirements: requirements,
  user_id: "user123"
}));

// Clear status
dispatch(clearRequirementsStatus());
```

## Component Usage

### EditRequirementsModal

```javascript
import EditRequirementsModal from "../../components/sharedComponents/EditRequirementsModal";

<EditRequirementsModal
  isOpen={modalOpen}
  onClose={() => setModalOpen(false)}
  entityType="programs" // "programs", "events", "resources"
  entityId="123"
  currentRequirements={currentRequirements}
  entityName="Coding Bootcamp"
  userId="user123"
/>
```

## Validation

The service includes client-side validation for:

- **Numeric Fields**: Ensures income, age, and zipcode are valid numbers
- **Age Range**: Minimum age cannot be greater than maximum age
- **Income Range**: Minimum income cannot be greater than maximum income level
- **Required Fields**: All fields are optional but validated when provided

## Error Handling

The service handles various error scenarios:

- **Network Errors**: Displayed in error message area
- **Validation Errors**: Shown inline with form fields
- **API Errors**: Displayed in error message area
- **Invalid Data**: Prevented with client-side validation

## Success Flow

1. User opens requirements modal
2. Form is pre-populated with current requirements
3. User modifies requirements as needed
4. Validation runs (client-side)
5. API call is made
6. Success message is shown
7. Page reloads to show updated requirements
8. Modal closes automatically

## Security

- **User ID Required**: All API calls require a valid user ID
- **Admin Only**: Modals are only shown to admin users
- **Input Validation**: Client-side validation prevents invalid submissions
- **API Validation**: Server-side validation should also be implemented

## Example Requirements Object

```javascript
const exampleRequirements = {
  past_experience: true,
  education_level: "bachelors",
  max_income_level: 75000,
  min_income: 25000,
  max_age: 65,
  min_age: 18,
  gender: "male",
  experience_level: "intermediate",
  city: "New York",
  zipcode: 10001,
  radius: "25"
};
```

## Future Enhancements

Potential improvements for the requirements system:

- **Rich Text Descriptions**: Allow detailed requirement descriptions
- **Conditional Requirements**: Show/hide requirements based on other selections
- **Requirement Templates**: Pre-defined requirement sets
- **Bulk Updates**: Update requirements for multiple entities
- **Requirement Analytics**: Track requirement effectiveness
- **Integration with User Profiles**: Auto-match users based on requirements 