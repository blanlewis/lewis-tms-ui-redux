const getLoginUserMutationQuery = (loginId: string, password: string) => {
    return `
        mutation {
            isLogin(
              loginId: "${loginId}"
              password: "${password}"
            )
        }
    `;
};

export { getLoginUserMutationQuery };
