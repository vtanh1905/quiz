export function convertToVietnamesePhone(phoneNumber) {
    // Remove all non-digit characters from the phone number
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');

    // Check if the phone number starts with the country code
    if (cleanedPhoneNumber.startsWith('84')) {
        // Replace the country code with '+84'
        return '+' + cleanedPhoneNumber;
    }

    // Check if the phone number starts with '0'
    if (cleanedPhoneNumber.startsWith('0')) {
        // Replace the leading '0' with '+84'
        return '+84' + cleanedPhoneNumber.substr(1);
    }

    // Return the original phone number if it doesn't match any patterns
    return cleanedPhoneNumber;
}