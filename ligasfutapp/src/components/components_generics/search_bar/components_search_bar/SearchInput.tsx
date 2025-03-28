import React, { useState } from 'react';

interface SearchInputProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filteredPages: string[];
    filteredFiles: string[];
    filteredMembers: string[];
}

const SearchInput: React.FC<SearchInputProps> = ({ searchTerm, setSearchTerm, filteredPages, filteredFiles, filteredMembers }) => {
    return (
        <>
            <input
                type="text"
                className="w-full px-4 py-2 text-gray-700 bg-white rounded-md focus:outline-none"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
            />
            {searchTerm && (
                <div className="transition-all duration-300 absolute top-20 right-[2.4%] bg-white shadow-lg rounded-xl p-4 w-[95%] lg:w-[90.3%] z-1">
                    <div className="mb-2">
                        <h4 className="text-gray-600">Pages</h4>
                        {filteredPages.length > 0 ? (
                            filteredPages.map((page, index) => (
                                <p key={index} className="text-gray-700">{page}</p>
                            ))
                        ) : (
                            <p className="text-gray-500">No Results Found</p>
                        )}
                    </div>
                    <div className="mb-2">
                        <h4 className="text-gray-600">Files</h4>
                        {filteredFiles.length > 0 ? (
                            filteredFiles.map((file, index) => (
                                <p key={index} className="text-gray-700">{file}</p>
                            ))
                        ) : (
                            <p className="text-gray-500">No Results Found</p>
                        )}
                    </div>
                    <div className="mb-2">
                        <h4 className="text-gray-600">Members</h4>
                        {filteredMembers.length > 0 ? (
                            filteredMembers.map((member, index) => (
                                <p key={index} className="text-gray-700">{member}</p>
                            ))
                        ) : (
                            <p className="text-gray-500">No Results Found</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default SearchInput;