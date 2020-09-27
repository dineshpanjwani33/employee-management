import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    /* Making array of active http requests, to keep track of current request. 
        This may saves to performance when the move out before completing its request */
    const activeHttpRequests = useRef([]);

    //Making api calls using fetch function
    const sendRequest = useCallback(async (url, method = 'GET', headers = {}, body = null) => {
        setIsLoading(true);

        /*Creating instance of current request and push to activeHttpRequests array 
        before making api request to server */
        const httpAbortCtrl = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrl);
        try {
            const response = await fetch(url, {
                method,
                headers,
                body,
                signal: httpAbortCtrl.signal
            });

            const responseData = await response.json();

            //After completion of request remove current activeHttpRequest
            activeHttpRequests.current = activeHttpRequests.current.filter(httpReq => httpReq !== httpAbortCtrl);

            if (!response.ok) {
                throw new Error(responseData.message)
            }
            setIsLoading(false);
            return responseData;
        }
        catch (err) {
            console.log(err);
            setError(err.message);
            setIsLoading(false);
            throw err;
        }
    }, []);

    const clearError = () => {
        setError(null);
    }

    useEffect(() => {
        return () => {
            //Doing clean up for abort controller
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
        }
    }, [])

    return { isLoading: isLoading, error: error, sendRequest, clearError }
}