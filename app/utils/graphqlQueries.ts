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

export {
    getLoginUserMutationQuery,
    getCurrentUserQuery,
};
