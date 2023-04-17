import { useState, useEffect } from "react";
import { ethers } from "ethers";
import useGetLensHandle from "./useGetLensHandle";

const provider = new ethers.InfuraProvider(
  "mainnet",
  process.env.REACT_APP_INFURA_KEY
);

const useGetEnsData = (address) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!address) return;
    async function fetch() {
      try {
        setLoading(true); 

        let domain, lens;
        if (localStorage.getItem(address)) {
          domain = JSON.parse(localStorage.getItem(address)).domain;
          lens = JSON.parse(localStorage.getItem(address)).lens;
        } else { 
          // Query ENS for the domain associated with the address
          domain = await provider.lookupAddress(address);
          lens = useGetLensHandle(address);

          localStorage.setItem(address, JSON.stringify({domain:domain, avatar:null, lens}));
        }
        
        if (domain) {
          let avatar = JSON.parse(localStorage.getItem(address)).avatar;

          if (!avatar) {
            // Query ENS for the avatar associated with the domain
            avatar = await provider.getAvatar(domain);
          }
          
          setData({ domain, avatar, lens });
        }
      } catch (error) {
        console.error(error);
        setError(error);
      }
      setLoading(false);
    }
    fetch();
  }, [address]);

  return { data, loading, error };
};

export default useGetEnsData;
