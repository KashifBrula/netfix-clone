import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const useCurrentUser = () => {
    // useSWR only one time api call and don't call api if data already exists
    const {data, error, isLoading, mutate} = useSWR('/api/current', fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    }
};

export default useCurrentUser;
