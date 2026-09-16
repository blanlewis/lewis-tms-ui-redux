import { getLoginUserMutationQuery,getCurrentUserQuery, getLogoutMutationQuery } from "./graphqlQueries";
import { LoginResponse } from "./types";

const getLoginUserMutationApi = async (
    loginId: string,
    password: string
): Promise<LoginResponse> => {

    const usersRequest = {
        query: getLoginUserMutationQuery(loginId, password),
    };

    console.log(
    "GRAPHQL URL:",
    process.env.NEXT_PUBLIC_GRAPHQL_URL
);
    try {
        const result = await fetch(
            process.env.NEXT_PUBLIC_GRAPHQL_URL!,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(usersRequest),
            }
        );

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

const getCurrentUserApi = async (): Promise<string | null> => {

    const usersRequest = {
        query: getCurrentUserQuery(),
    };

    try {
        const result = await fetch(
            process.env.NEXT_PUBLIC_GRAPHQL_URL!,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(usersRequest),
            }
        );

        if (!result.ok) {
            throw new Error(`HTTP Error: ${result.status}`);
        }

        const jsonResult = await result.json();

        return jsonResult.data.currentUser;

    } catch (error) {
        console.error("Failed to fetch current user:", error);
        throw error;
    }
};

const getLogoutMutationApi = async (): Promise<boolean> => {
    const usersRequest = {
        query: getLogoutMutationQuery(),
    };
    try {
        const result = await fetch(
            process.env.NEXT_PUBLIC_GRAPHQL_URL!,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(usersRequest),
            }
        );
        if (!result.ok) {
            throw new Error(`HTTP Error: ${result.status}`);
        }
        const jsonResult = await result.json();
        return jsonResult.data.logout;
    } catch (error) {
        console.error("Failed to logout:", error);
        throw error;
    }
};

export { getLoginUserMutationApi, getCurrentUserApi, getLogoutMutationApi };