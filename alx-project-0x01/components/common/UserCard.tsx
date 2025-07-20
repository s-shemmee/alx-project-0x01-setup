import React from 'react';
import { UserProps } from "@/interfaces";

const UserCard: React.FC<UserProps> = ({ name, username, email, phone, website, company, address }) => {
  return (
    <div className="max-w-xl mx-auto my-6 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{name}</h2>
      <p className="text-gray-600 mb-1">@{username}</p>
      <p className="text-blue-500 hover:underline mb-1">
        <a href={`mailto:${email}`}>{email}</a>
      </p>
      <p className="text-gray-700 mb-4">{phone}</p>

      <div className="text-sm text-gray-500 border-t pt-3">
        <p><strong>Website:</strong> <a href={`http://${website}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{website}</a></p>
        <p><strong>Company:</strong> {company.name} - &quot;{company.catchPhrase}&quot;</p>
        <p><strong>Address:</strong> {address.street}, {address.suite}, {address.city}, {address.zipcode}</p>
      </div>
    </div>
  );
};

export default UserCard;