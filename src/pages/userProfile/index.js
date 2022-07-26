import { api } from "../../api/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavBar } from "../../components/navbar/navBar/index";

import { SearchedUserAbout } from "../../components/profile/aboutUser";
import { SearchedUserActivities } from "../../components/profile/userActivity";
import { SearchedUserFavorites } from "../../components/profile/favorites";

export function SearchUser() {
  const { profileId } = useParams();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get(`/user/profile/${profileId}`);
        setUser(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, [profileId]);
  console.log(user);

  return (
    <>
      <NavBar />
      {!isLoading && (
        <div className="ml-[19%]">
          <SearchedUserAbout user={user} />
          <SearchedUserFavorites user={user} />
          <SearchedUserActivities user={user} />
        </div>
      )}
    </>
  );
}
