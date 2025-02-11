export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+[^.]$/;
    return emailRegex.test(email);
}

// Phone Validation
export function isMobilePhone(phone: string): boolean {
    const sanitizedPhone = phone.replace(/[^0-9]/g, '');
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(sanitizedPhone);
}

export function isCreditCard(ccNumber: string): boolean {
    const sanitizedNumber = ccNumber.replace(/[\s-]/g, '');
    const ccRegex = /^\d{14,16}$/;
    return ccRegex.test(sanitizedNumber);
}
