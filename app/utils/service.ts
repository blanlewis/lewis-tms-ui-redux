import { getLoginUserMutationQuery,getCurrentUserQuery, getLogoutMutationQuery, getBookingsQuery } from "./graphqlQueries";
import { BookingTypes, LoginResponse } from "@/app/utils/redux2/types";

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

const getBookingsApi = async (
    first: number,
    after: string | null
): Promise<{
    bookingsList: BookingTypes[];
    pageInfo: {
        hasNextPage: boolean;
        startCursor: string | null;
        endCursor: string | null;
    };
}> => {
    const bookingsRequest = {
        query: getBookingsQuery(first, after),
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
                body: JSON.stringify(bookingsRequest),
            }
        );
        if (!result.ok) {
            throw new Error(`HTTP Error: ${result.status}`);
        }
        const jsonResult = await result.json();
        console.log("BOOKINGS RESPONSE:", jsonResult);
        const bookingsData = jsonResult.data.bookings;
        return {
            bookingsList: bookingsData.edges.map(
                (edge: {
                    node: BookingTypes;
                    cursor: string;
                }) => edge.node
            ),
            pageInfo: bookingsData.pageInfo,
        };
    } catch (error) {
        console.error("Failed to fetch bookings:", error);
        throw error;
    }
};

export { getLoginUserMutationApi, getCurrentUserApi, getLogoutMutationApi, getBookingsApi };