import { useEffect } from 'react';

const useDocTitle = (title) => {
    useEffect(() => {
        if (title) {
            document.title = `${title} - BookBuddy`;
        } else {
            document.title = 'BookBuddy | The Perf';
        }
    }, [title]);

    return null;
};

export default useDocTitle;
