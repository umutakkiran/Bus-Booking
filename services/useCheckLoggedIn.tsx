import { useState, useEffect } from 'react';

export function useCheckLoggedIn() {
  const [loggedIn, setLoggedIn] = useState(false)

  const checkIfLoggedIn = async () => {

    let result = localStorage.getItem("userToken")
    result === "lojiper" ? setLoggedIn(true) : setLoggedIn(false);
  }

 
  useEffect(() => {

    let unsubscribed = false;

  if (!unsubscribed) {
    checkIfLoggedIn();
  }

  return () => {
    unsubscribed = true;
  };
  }, [loggedIn]);


  return {loggedIn};
}
