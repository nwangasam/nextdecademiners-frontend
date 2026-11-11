import { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';

const useFetchAdminData = (route, token, search = '') => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const observer = useRef(null);

  // A new search term starts again from the first page
  useEffect(() => {
    setPageNumber(1);
  }, [search]);

  useEffect(() => {
    // Ignore responses from requests that a newer search/page has replaced
    let cancelled = false;
    (async () => {
      try {
        setError(null);
        setLoading(true);

        if (route) {
          const query = search
            ? `&search=${encodeURIComponent(search)}`
            : '';
          const request = await axios(
            `${process.env.REACT_APP_API_URL}/api/admin${route}?page=${pageNumber}&limit=10${query}`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );
          if (cancelled) return;
          setData((prevData) => {
            const type = route.slice(1);

            // Page 1 replaces the list (first load or a new search)
            if (pageNumber === 1 || !prevData[type]) {
              return request.data;
            } else {
              return {
                ...request.data,
                [type]: prevData[type].concat(request.data[type]),
              };
            }
          });
        }
        if (!cancelled) setLoading(false);
      } catch (error) {
        if (cancelled) return;
        setLoading(false);
        setError(error);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [route, token, pageNumber, search]);

  const deleteUser = useCallback(
    (user) => {
      if (!user || user.isAdmin) return;
      setLoading(true);
      fetch(`${process.env.REACT_APP_API_URL}/api/admin/user/${user._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then(() => {
          setLoading(false);
          setData((data) => {
            return {
              ...data,
              users: data.users.filter((u) => u._id !== user._id),
            };
          });
          // toast({
          //   title: "User deleted and gone for ever!",
          //   description: "All user's transaction was deleted too! Refresh!",
          //   status: "success",
          //   duration: 9000,
          //   isClosable: true,
          // })
        })
        .catch((err) => {
          setLoading(false);
          setError(err);
          // toast({
          //   title: "Failed to delete user",
          //   description: "Refresh and try again. Check your internet connection",
          //   status: "error",
          //   duration: 9000,
          //   isClosable: true,
          // })
        });
    },
    [token]
  );

  const observedElement = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && data.next) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, data.next]
  );

  return {
    data,
    loading,
    error,
    deleteUser,
    observedElement,
  };
};

export default useFetchAdminData;
