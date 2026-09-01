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

export { getLoginUserMutationQuery };
