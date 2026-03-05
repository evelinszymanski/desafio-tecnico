export const preparePatch = (data, form) => {
    let body = {};
    Object.keys(form).forEach((key) => {
        const currentValue = form[key];
        const originalValue = data?.[key];

        if (currentValue !== originalValue) {
            body[key] = currentValue;
        };
    });
    return body;
};
