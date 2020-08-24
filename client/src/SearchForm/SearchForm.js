import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import tag from "../image/tag.svg";

import SearchInput from "../searchInput/searchInput";
import Loader from "../Loader/Loader";
const PHOTOS = gql`
  query($query: String) {
    photos(query: $query) {
      tags
      views
      downloads
      likes
      comments
      webformatURL
      largeImageURL
    }
  }
`;

export default function SearchBar() {
  const [textValue, setTextValue] = useState("");
  const [submit, setSubmit] = useState("");
  const { loading, error, data } = useQuery(PHOTOS, {
    variables: { query: submit },
    skip: submit === "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(textValue);
    setTextValue("");
  };

  if (loading)
    return (
      <>
        <SearchInput
          handleSubmit={handleSubmit}
          textValue={textValue}
          setTextValue={setTextValue}
        ></SearchInput>
        <Loader></Loader>
      </>
    );
  if (error)
    return (
      <>
        <SearchInput
          handleSubmit={handleSubmit}
          textValue={textValue}
          setTextValue={setTextValue}
        ></SearchInput>
        <p>Something went wrong :(</p>
      </>
    );
  return (
    <>
      <SearchInput
        handleSubmit={handleSubmit}
        textValue={textValue}
        setTextValue={setTextValue}
      ></SearchInput>
      <div>
        {data && (
          <ul className='ImageGallery'>
            {data.photos.map((item) => (
              <li className='liGalleryItem' key={item.webformatURL}>
                <div className='ImageGalleryItem'>
                  <img
                    src={item.webformatURL}
                    alt={item.webformatURL}
                    className='ImageGalleryItem-image'
                  />
                </div>
                <div className='container'>
                  <div className='imagecontainer'>
                    <img className='tagimg' alt={item.tags} src={tag} />
                    <p className='info'>{item.tags}</p>
                  </div>
                  <div className='imagecontainer'>
                    <span className='likeimg'></span>
                    <p className='info'>{item.likes}</p>
                  </div>
                  <div className='imagecontainer'>
                    <span className='downloadimg'></span>
                    <p className='info'>{item.downloads}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
