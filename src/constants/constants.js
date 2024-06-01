export const BASE_URL = 'http://localhost:5000/'
export const CONTACT_SLICE_NAME = 'contacts'

export function createEmptyContact () {
  return {
      fName: '',
      lName: '',
      phone: '',
      email: '',
  }
};

export const reg = /^\+?[1-9]{1,3}[\s-]?[0-9]{3,7}[\s-]?[0-9]{3,7}$/;

export const rightPhoneNumbers = [
    '+1 800 555 5555',
    '+44 20 7946 0958',
    '+91 (22) 1234-5678',
    '+86 10 1234 5678',
    '+49-89-636-48018',
    '800 555 5555',
    '1234-567-890',
    '555-1234',
    '123 456 7890',
    '+1-800-555-5555',
    '+44.20.7946.0958',
    '+91 (22) 1234 5678',
    '+86-10-1234-5678',
    '+49 89 636 48018',
]

export const getRandomPhoneExample = () => {
    return rightPhoneNumbers[Math.floor(Math.random() * rightPhoneNumbers.length)];
  };