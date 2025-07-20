import React, { useState } from "react";
import Header from "@/components/layout/Header";
import UserCard from "@/components/common/UserCard";
import UserModal from "@/components/common/UserModal";
import { UserData, UserProps } from "@/interfaces";

interface UsersPageProps {
  users: UserProps[];
}

const Users: React.FC<UsersPageProps> = ({ users: initialUsers }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState<UserProps[]>(initialUsers);

  const handleAddUser = (newUser: UserData) => {
    const newUserWithId: UserProps = {
      ...newUser,
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      address: newUser.address || { street: "", suite: "", city: "", zipcode: "", geo: { lat: "", lng: "" } },
      company: newUser.company || { name: "", catchPhrase: "", bs: "" },
    };
    setUsers((prevUsers) => [newUserWithId, ...prevUsers]);
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="p-4 flex-grow">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">User Directory</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-700 px-4 py-2 rounded-full text-white hover:bg-blue-800 transition"
          >
            Add User
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            users?.map((user: UserProps) => (
              <UserCard key={user.id} {...user} />
            ))
          }
        </div>
      </main>

      {isModalOpen && (
        <UserModal onClose={() => setModalOpen(false)} onSubmit={handleAddUser} />
      )}
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: UserProps[] = await response.json();

  return {
    props: {
      users,
    },
  };
}

export default Users;