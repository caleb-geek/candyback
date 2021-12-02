exports.checkifUsernameorEmail = (value) => {
    if (value.username) {
        return value.username
    } else if (value.email) {
        return value.email
    }
}