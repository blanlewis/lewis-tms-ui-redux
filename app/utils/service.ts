import { getLoginUserMutationQuery } from "./graphqlQueries";

const getLoginUserMutationApi = async (loginId: string, password: string) => {
    const usersRequest = {
        query: getLoginUserMutationQuery(loginId, password),
    };
    try {
        const result = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(usersRequest),
        });
        if (!result.ok) {
            throw new Error(`HTTP Error: ${result.status}`);
        }
        const jsonResult = await result.json();
        return jsonResult.data.isLogin;
    } catch (error) {
        console.error("Failed to fetch users:", error);
        throw error;
    }
};

export { getLoginUserMutationApi };