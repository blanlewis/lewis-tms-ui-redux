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

export {
    getLoginUserMutationQuery,
    getCurrentUserQuery,
    getLogoutMutationQuery,
};
