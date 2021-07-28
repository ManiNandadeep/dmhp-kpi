// Contains a list of excluded routes that do not require a bearer token for access.


module.exports = {
    // This is passed if the .env file has a yes flag for RUN_AUTH
    auth_yes : [
        "/api/auth",
        "/"
    ],
    // This is passed if the .env file has a no flag for RUN_AUTH
    auth_no : [
        "/api/auth",
        "/",
        "/training",
        "/districtexpense",
        "/hr",
        "/manasadhara",
        "/mnsallocation",
    ]
}