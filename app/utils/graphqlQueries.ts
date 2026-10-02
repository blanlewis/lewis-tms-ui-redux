const getLoginUserMutationQuery = (loginId: string, password: string) => {
    return `
        mutation {
            isLogin(
              loginId: "${loginId}"
              password: "${password}"
            ) {
              success
              loginId
            }
        }
    `;
};

const getCurrentUserQuery = () => {
    return `
        query {
            currentUser
        }
    `;
};

const getLogoutMutationQuery = () => {
    return `
        mutation {
            logout
        }
    `;
};

const getBookingsQuery = (
    first: number,
    after: string | null
) => {
    return `
        query {
            bookings(
                first: ${first}
                after: ${after ? `"${after}"` : "null"}
            ) {
                edges {
                    cursor
                    node {
                        id
                        source
                        destination
                        sourceLatitude
                        sourceLongitude
                        destinationLatitude
                        destinationLongitude
                    }
                }
                pageInfo {
                    hasNextPage
                    startCursor
                    endCursor
                }
            }
        }
    `;
};

export {
    getLoginUserMutationQuery,
    getCurrentUserQuery,
    getLogoutMutationQuery,
    getBookingsQuery,
};
